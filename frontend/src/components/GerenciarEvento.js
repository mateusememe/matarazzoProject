import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
	Container, Row, Col, Table, Button
} from 'react-bootstrap';
import { FiTrash, FiEdit } from 'react-icons/fi';
import api from '../services/api.js';
import Modal from '../components/Modal'

export default function GerenciarEvento(props) {
	const history = useHistory();

	const [checado, setChecado] = useState(false);
	const [checado2, setChecado2] = useState(false);
	const [erroMsg, setErroMsg] = useState('');
	const [sucessoMsg, setSucessoMsg] = useState('');
	const [evento, setEve] = useState('');
	const [modal, setModal] = useState(false);

	const [categorias, setCategoria] = useState([]);
	const [eventos, setEvento] = useState([]);

	const [eve_id, setIdEve] = useState('');
	const [eve_nome, setNomeEve] = useState('');
	const [eve_data, setDataEve] = useState('');
	const [eve_horario, setHorarioEve] = useState('');
	const [eve_dataFim, setDataFimEve] = useState('');
	const [eve_horarioFim, setHorarioFimEve] = useState('');
	const [eve_status, setStatusEve] = useState('');
	const [eve_valor, setValorEve] = useState('');
	const [eve_adm, setAdmEve] = useState(props.usuario);
	const [eve_categoria, setCategoriaEve] = useState('DEFAULT');
	const [eve_img, setImgEve] = useState('');

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}

	async function removerEvento(id) {
		await api.delete(`/eventos/${id}`);
		carregarEventos();
	}

	function limparFormEvento() {
		setChecado(false);
		setChecado2(false);
		setNomeEve('');
		setStatusEve('');
		setDataEve('');
		setHorarioEve('');
		setCategoriaEve('DEFAULT');
		setAdmEve(props.usuario);
		setValorEve('');
		setImgEve('');
	}

	async function adicionarEvento(e) {
		e.preventDefault();
		if (eve_nome && eve_status && eve_data && eve_horario && eve_categoria && eve_img && eve_adm && eve_valor) {
			if (props.flag) {
				await api.post('/eventos', {
					eve_nome, eve_status, eve_data, eve_horario,
					eve_categoria, eve_img, eve_adm, eve_valor
				});
				setSucessoMsg('Evento adicionado com sucesso!');
			} else {
				await api.put('/eventos', {
					eve_nome, eve_status, eve_data, eve_horario,
					eve_categoria, eve_img, eve_adm, eve_valor, eve_id
				});
				setSucessoMsg('Evento atualizado com sucesso!');
			}

			limparFormEvento();
			await sleep(3000);
			setSucessoMsg(false);
			carregarEventos();
		} else {
			setErroMsg('Preencha todos os campos!');
			await sleep(3000);
			setErroMsg(false);
		}
	}

	useEffect(() => {
		if (props.nivel !== 'A') history.push('/');
		else {
			carregarCategorias("E");
			carregarEventos();
			return () => {
				setCategoria({});
				setEvento({});
			};
		}
	}, [props.nivel, history]);

	async function carregarCategorias(tipoCat) {
		const response = await api.get('/categorias/tipo/' + tipoCat);
		setCategoria(response.data);
	}

	async function carregarEventos() {
		const response = await api.get('/eventos');
		setEvento(response.data);
	}

	async function uploadImgEvento() {
		const imgData = new FormData();
		imgData.append('eve_img', eve_img);

		const resUpload = await api.post('/upload/eventos', imgData, {
			config: { headers: { 'Content-Type': 'multipart/form-data' } }
		});

		setImgEve(resUpload.data);
		setSucessoMsg('Imagem adicionada com sucesso!');
		await sleep(3000);
		setSucessoMsg(false);
	}

	async function editarEvento(id) {
		const response = await api.get('/eventos/' + id);
		setIdEve(id);
		setNomeEve(response.data[0].eve_nome);
		setDataEve(formatarData(response.data[0].eve_data));
		console.log(formatarData(response.data[0].eve_data));
		setHorarioEve(formatarHora(response.data[0].eve_horario));
		console.log(formatarHora(response.data[0].eve_horario));
		setStatusEve(response.data[0].eve_status);
		setChecado(false);
		setChecado2(true);
		if (response.data[0].eve_status === 'A') {
			setChecado(true);
			setChecado2(false);
		}
		setCategoriaEve(response.data[0].cat_id);
		setValorEve(response.data[0].eve_valor);
		setImgEve(response.data[0].eve_img);
		setAdmEve(response.data[0].usu_id);
	}

	function formatarData(temp) {
		if (temp) {
			temp = temp.split('T')[0];
			const dia = temp.split('-')[2];
			const mes = temp.split('-')[1];
			const ano = temp.split('-')[0];

			return ano + '-' + mes + '-' + dia;
		}
	}

	function formatarHora(temp) {
		if (temp) {
			temp = temp.split(':');
			if (temp[0] < 10) temp[0] = '0' + temp[0];
			return temp[0] + ':' + temp[1];
		}
	}

	if (props.flag === 'add')
		return (
			<Container>
				<Row className='align-items-center justify-content-center'>
					<div style={{ minWidth: '50vh' }}>
						<h3 className='title'>Adicionar Novo Evento</h3>
						<form
							method='post'
							encType='multipart/form-data'
							onSubmit={adicionarEvento}>
							<div className='form-col form-group'>
								<div className='col'>
									<input
										className='form-ctrl'
										type='text'
										name='eve_nome'
										id='eve_nome'
										value={eve_nome}
										onChange={e => {
											setNomeEve(e.target.value);
											setErroMsg(false); setSucessoMsg(false);
										}}
										placeholder='Nome do evento...'></input>
									<div className='form-row form-group pt-1 mb-0 align-items-center'>
										<Col className='mt-2'>
											<label className='mb-0'>
												Data inicial
                      </label>
											<input
												className='form-ctrl'
												type='date'
												name='eve_data'
												id='eve_data'
												value={eve_data}
												onChange={e => {
													setDataEve(e.target.value);
													setErroMsg(false);
													setSucessoMsg(false);
												}}></input>
										</Col>
										<Col className='mt-2'>
											<label className='mb-0'>
												Hora Inicial do evento
                      </label>
											<input
												className='form-ctrl'
												type='time'
												name='eve_horario'
												id='eve_horario'
												value={eve_horario}
												onChange={e => {
													setHorarioEve(e.target.value);
													setErroMsg(false);
													setSucessoMsg(false);
												}}></input>
										</Col>
									</div>
									<div className='form-row form-group pt-1 mb-0 align-items-center'>
										<Col className='mt-2'>
											<label className='mb-0'>  Data Final </label>
											<input
												className='form-ctrl'
												type='date'
												name='eve_dataFim'
												id='eve_dataFim'
												value={eve_dataFim}
												onChange={e => {
													setDataFimEve(e.target.value);
													setErroMsg(false);
													setSucessoMsg(false);
												}}></input>
										</Col>
										<Col className='mt-2'>
											<label className='mb-0'>
												Hora final do evento
                      </label>
											<input
												className='form-ctrl'
												type='time'
												name='eve_horarioFim'
												id='eve_horarioFim'
												value={eve_horarioFim}
												onChange={e => {
													setHorarioFimEve(e.target.value);
													setErroMsg(false);
													setSucessoMsg(false);
												}}></input>
										</Col>
									</div>
									<div className='mt-2 custom-control custom-radio custom-control-inline'>
										<input
											checked={checado}
											onChange={e => {
												setStatusEve('A');
												setChecado(true);
												setChecado2(false);
												setErroMsg(false);
												setSucessoMsg(false);
											}}
											type='radio'
											id='evt_status_ativo'
											name='eve_status'
											className='custom-control-input'
										/>
										<label
											className='custom-control-label'
											htmlFor='evt_status_ativo'>
											Ativo
                    </label>
									</div>
									<div className='custom-control custom-radio custom-control-inline'>
										<input
											checked={checado2}
											onChange={e => {
												setStatusEve('I'); setChecado2(true);
												setChecado(false);
												setErroMsg(false); setSucessoMsg(false);
											}}
											type='radio'
											id='evt_status_inativo'
											name='eve_status'
											className='custom-control-input'
										/>
										<label
											className='custom-control-label'
											htmlFor='evt_status_inativo'>
											Inativo
                    </label>
									</div>
									<div className='form-row form-group pt-1 mb-0 align-items-center'>
										<div className='col'>
											<select
												className='custom-select'
												value={eve_categoria}
												onChange={e => {
													setCategoriaEve(e.target.value);
													setErroMsg(false); setSucessoMsg(false);
												}}>
												<option
													value='DEFAULT'
													disabled>
													Escolher categoria...
                        </option>
												{Object.keys(categorias).map((key, index) => (
													<option
														key={categorias[key].cat_id}
														value={categorias[key].cat_id}>
														{categorias[key].cat_nome}
													</option>
												))}
											</select>
										</div>
										<Col>
											<input
												className='form-ctrl'
												type='text'
												name='eve_valor'
												id='eve_valor'
												value={eve_valor}
												onChange={e => {
													setValorEve(e.target.value);
													setErroMsg(false); setSucessoMsg(false);
												}}
												placeholder='Valor do evento...'></input>
										</Col>
									</div>
									<div className='form-row form-group pt-1 mb-0 align-items-center justify-content-between'>
										<Col xs={9}>
											<div className='custom-file mt-2'>
												<input
													type='file'
													name='eve_img'
													className='custom-file-input'
													onChange={e => {
														setImgEve(e.target.files[0]);
														setErroMsg(false); setSucessoMsg(false);
													}}
													id='eve_img'
												/>
												<label
													className='custom-file-label form-ctrl'
													htmlFor='eve_img'>
													Escolher imagem
                       	</label>
											</div>
										</Col>
										<Col>
											<input
												type='button'
												className='btn bg-brown mt-2'
												onClick={uploadImgEvento}
												value='Enviar'
											/>
										</Col>
									</div>
								</div>
							</div>
							<Col>
								{erroMsg ? (<span className='erro'>{erroMsg}</span>) : null}
								{sucessoMsg ? (<span className='sucesso'>{sucessoMsg}</span>) : null}
							</Col>
							<div className='form-group d-flex flex-row-reverse p-3 mb-0'>
								<button
									className='btn bg-brown w-30'
									type='submit'>
									ADICIONAR
                </button>
							</div>
						</form>
					</div>
				</Row>
			</Container>
		);
	else
		return (
			<Table responsive hover>
				<thead>
					<tr>
						<th>#</th><th>Nome</th><th>Status</th><th>Valor</th><th>Data</th>
						<th>Horario</th><th>Ação</th>
					</tr>
				</thead>
				<tbody>
					{eventos.length !== 0
						? Object.keys(eventos).map((key, index) => (
							<tr key={`${eventos[key].eve_id}`}>
								<td>{eventos[key].eve_id}</td>
								<td>{eventos[key].eve_nome}</td>
								<td>{eventos[key].eve_status}</td>
								<td>{eventos[key].eve_valor}</td>
								<td>{eventos[key].eve_data}</td>
								<td>{eventos[key].eve_horario}</td>
								<td>
									<Button
										onClick={() => editarEvento(eventos[key].eve_id)}
										className='m-0 p-0 border-0 bg-transparent'>
										<FiEdit style={{ color: '#231f20' }} />
									</Button>
									<Button
										onClick={() => removerEvento(eventos[key].eve_id)}
										className='ml-2 p-0 border-0 bg-transparent'>
										<FiTrash style={{ color: '#231f20' }} />
									</Button>
								</td>
							</tr>
						))
						: <tr>
							<td colSpan='7'>Não há eventos cadastrados</td>
						</tr>
					}
				</tbody>
			</Table>
		);
}