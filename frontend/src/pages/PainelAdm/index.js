import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api.js';
import {
	Container, NavDropdown, Table,
	Button, Row, Col, Tab, Nav
} from 'react-bootstrap';
import { FiTrash, FiEdit } from 'react-icons/fi';
import Modal from '../../components/Modal';
import './paineladm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PainelAdm() {
	const usuario = localStorage.getItem('usu_id');
	const nivel = localStorage.getItem('usu_nivel');
	const [checado, setChecado] = useState(false);
	const [checado2, setChecado2] = useState(false);
	const [erroMsg, setErroMsg] = useState('');
	const [sucessoMsg, setSucessoMsg] = useState('');

	const [modalCurVisivel, setModalCurVisivel] = useState(false);
	const [modalEveVisivel, setModalEveVisivel] = useState(false);
	const [modalNotVisivel, setModalNotVisivel] = useState(false);

	const [modalRemove, setModalRemove] = useState(false);

	const [adicionar, setAdicionar] = useState(true);

	const [eventos, setEvento] = useState([]);
	const [cursos, setCurso] = useState([]);
	const [noticias, setNoticia] = useState([]);
	const [categorias, setCategoria] = useState([]);
	const [usuarios, setUsuario] = useState([]);

	const [cur_id, setIdCur] = useState('');
	const [cur_nome, setNomeCur] = useState('');
	const [cur_status, setStatusCur] = useState('');
	const [cur_adm, setAdmCur] = useState(usuario);
	const [cur_categoria, setCategoriaCur] = useState('DEFAULT');
	const [cur_valor, setValorCur] = useState('');
	const [cur_img, setImgCur] = useState('');

	const [eve_id, setIdEve] = useState('');
	const [eve_nome, setNomeEve] = useState('');
	const [eve_data, setDataEve] = useState('');
	const [eve_horario, setHorarioEve] = useState('');
	const [eve_status, setStatusEve] = useState('');
	const [eve_valor, setValorEve] = useState('');
	const [eve_adm, setAdmEve] = useState(usuario);
	const [eve_categoria, setCategoriaEve] = useState('DEFAULT');
	const [eve_img, setImgEve] = useState('');

	const [not_id, setIdNot] = useState('');
	const [not_titulo, setTituloNot] = useState('');
	const [not_data, setDataNot] = useState('');
	const [not_adm, setAdmNot] = useState(usuario);
	const [not_categoria, setCategoriaNot] = useState('DEFAULT');

	const [usu_id, setIdUsu] = useState('');
	const [usu_nome, setNome] = useState('');
	const [usu_sobrenome, setSobrenome] = useState('');
	const [usu_email, setEmail] = useState('');
	const [usu_senha, setSenha] = useState('');
	const [usu_nivel, setNivel] = useState('');

	const [cat_id, setCatId] = useState('');
	const [cat_nome, setCatNome] = useState('');
	const [cat_tipo, setTipo] = useState('');

	const history = useHistory();

	async function removerCurso(id) {
		await api.delete(`/cursos/${id}`);
		carregarCursos();
	}

	async function removerUsuario(id) {
		await api.delete(`/usuarios/${id}`);
		carregarUsuarios();
	}

	async function removerEvento(id) {
		await api.delete(`/eventos/${id}`);
		carregarEventos();
	}

	async function removerCategoria(id) {
		const resp = await api.delete(`/categorias/${id}`);
		if (resp.data.status === false) {
			alert('Categoria em uso. Operação Falhou!');
		}
		carregarCategorias(null);
	}

	async function adicionarCurso(e) {
		e.preventDefault();

		if (cur_nome && cur_status && cur_img && cur_categoria && cur_adm && cur_valor) {
			if (adicionar) {
				await api.post('/cursos', {
					cur_nome, cur_status, cur_adm, cur_valor,
					cur_img, cur_categoria, cur_id
				});
				setSucessoMsg('Curso adicionado com sucesso!');
			} else {
				await api.put('/cursos/', {
					cur_nome, cur_status, cur_adm,
					cur_valor, cur_img,
					cur_categoria, cur_id
				});
				setSucessoMsg('Curso atualizado com sucesso!');
			}

			setChecado(false);
			setChecado2(false);
			setNomeCur('');
			setStatusCur('');
			setCategoriaCur('DEFAULT');
			setAdmCur(usuario);
			setValorCur('');
			setImgCur('');
			await sleep(3000);
			setSucessoMsg(false);
			carregarCursos();
		} else {
			setErroMsg('Preencha todos os campos!');
			await sleep(3000);
			setErroMsg(false);
		}
		setAdicionar(true);
	}

	async function adicionarEvento(e) {
		e.preventDefault();
		if (eve_nome && eve_status && eve_data && eve_horario && eve_categoria && eve_img && eve_adm && eve_valor) {
			if (adicionar) {
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
				setSucessoMsg('Curso atualizado com sucesso!');
			}

			setChecado(false);
			setChecado2(false);
			setNomeEve('');
			setStatusEve('');
			setDataEve('');
			setCategoriaEve('DEFAULT');
			setAdmEve(usuario);
			setValorEve('');
			setImgEve('');
			await sleep(3000);
			setSucessoMsg(false);
			carregarEventos();
		} else {
			setErroMsg('Preencha todos os campos!');
			await sleep(3000);
			setErroMsg(false);
		}
		setAdicionar(true);
	}

	async function adicionarNoticia(e) {
		e.preventDefault();

		if (not_titulo && not_data && not_adm && not_categoria) {
			await api.post('/noticias', {
				not_titulo, not_data, not_adm, not_categoria
			});

			setTituloNot('');
			setDataNot('');
			setAdmNot(usuario);
			setSucessoMsg('Noticia adicionada com sucesso!');
			await sleep(3000);
			setSucessoMsg(false);
			setCategoriaNot('');
			carregarCategorias();
		} else {
			setErroMsg('Preencha todos os campos!');
			await sleep(3000);
			setErroMsg(false);
		}
	}

	function validarEmail() {
		if (usu_email === '') {
			setErroMsg('Preencha o campo Email!');
			return false;
		} else if (!/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(usu_email)) {
			setErroMsg('Email inválido!');
			return false;
		}
		setErroMsg('');
		return true;
	}

	function validarSenha() {
		if (usu_senha === '') {
			setErroMsg('Preencha o campo Senha!');
			return false;
		} else if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i.test(usu_senha)) {
			setErroMsg('Senha deve possuir pelo menos 6 caracteres, uma letra e um número');
			return false;
		}
		setErroMsg('');
		return true;
	}

	async function registrar(e) {
		e.preventDefault();
		if (usu_nome.length < 3)
			setErroMsg('Nome precisa ter pelo menos 3 caracteres');
		else if (usu_sobrenome.length < 3)
			setErroMsg('Sobrenome precisa ter pelo menos 3 caracteres');
		else if (validarEmail()) {
			if (validarSenha()) {
				const resp = await api.get('/usuarios/busca/' + usu_email);
				if (resp.data.length === 0) {
					await api.post('/usuarios/cadastro', {
						usu_nome, usu_sobrenome, usu_email,
						usu_senha, usu_nivel
					});
					setNome('');
					setSobrenome('');
					setEmail('');
					setSenha('');
					setNivel('null');
					setSucessoMsg('Usuario adicionado com sucesso!');
					await sleep(3000);
					setSucessoMsg(false);
				} else setErroMsg('Email já cadastrado no sistema!');
			}
		}
	}

	async function adicionarCategoria(e) {
		e.preventDefault();
		if (cat_nome && cat_tipo) {
			const resp = await api.get(
				'/categorias/' + cat_nome + '/' + cat_tipo
			);
			if (resp.data.length === 0) {
				await api.post('/categorias', {
					cat_nome, cat_tipo
				});
				setCatNome('');
				setTipo('null');
				setSucessoMsg('Categoria adicionada com sucesso!');
				await sleep(3000);
				setSucessoMsg(false);
			} else {
				setErroMsg('Categoria já existente!');
			}
		} else {
			setErroMsg('Preencha todos os campos!');
			await sleep(3000);
			setErroMsg(false);
		}
	}

	async function carregarEventos() {
		const response = await api.get('/eventos');
		setEvento(response.data);
	}

	async function carregarUsuarios() {
		const response = await api.get('/usuarios');
		setUsuario(response.data);
	}

	async function carregarCursos() {
		const response = await api.get('/cursos');
		setCurso(response.data);
	}

	async function carregarNoticias() {
		const response = await api.get('/noticias');
		setNoticia(response.data);
	}

	async function carregarCategorias(tipoCat) {
		const response = await api.get('/categorias/' + tipoCat);
		setCategoria(response.data);
	}

	useEffect(() => {
		if (nivel !== 'A') history.push('/');
		else {
			carregarEventos();
			carregarCursos();
			carregarNoticias();
			carregarCategorias(null);
			carregarUsuarios();
			return () => {
				setEvento({});
				setCurso({});
				setNoticia({});
				setCategoria({});
				setUsuario({});
			};
		}
	}, [nivel, history]);

	async function uploadImgCurso() {
		const imgData = new FormData();
		imgData.append('cur_img', cur_img);

		const resUpload = await api.post('/upload/cursos', imgData, {
			config: { headers: { 'Content-Type': 'multipart/form-data' } }
		});

		setImgCur(resUpload.data);
		setSucessoMsg('Imagem adicionada com sucesso!');
		await sleep(3000);
		setSucessoMsg(false);
	}

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
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

	async function editarCurso(id) {
		setIdCur(id);
		const response = await api.get('/cursos/' + id);
		console.log(response);
		setNomeCur(response.data[0].cur_nome);
		setValorCur(response.data[0].cur_valor);
		setStatusCur(response.data[0].cur_status);
		setChecado(false);
		setChecado2(true);
		if (response.data[0].cur_status === 'A') {
			setChecado(true);
			setChecado2(false);
		}
		setAdmCur(response.data[0].usu_id);
		setImgCur(response.data[0].cur_img);
		setCategoriaCur(response.data[0].cat_id);
		setAdicionar(false);
		setModalCurVisivel(true);
	}

	async function editarEvento(id) {
		const response = await api.get('/eventos/' + id);
		setIdEve(response.data[0].eve_id);
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
		setIdUsu(response.data[0].usu_id);
		setAdicionar(false);
		setModalEveVisivel(true);
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

	return (
		<React.Fragment>
			<Container>
				<button className='btn bg-brown mt-3 w-30'>
					<Link
						to='./'
						style={{ color: '#fce373', textDecoration: 'none' }}>
						INÍCIO
					</Link>
				</button>
				<h1 className='title'>Painel Administrativo</h1>
				<Tab.Container defaultActiveKey='first'>
					<Row className='mt-5 mb-5'>
						<Col sm={3}>
							<Nav variant='pills' className='flex-column'>
								<NavDropdown title='Gerenciar Curso'
									className='a'
									id='nav-dropdown'>
									<NavDropdown.Item
										eventKey='add-curso'
										onClick={() => carregarCategorias('C')}>
										Adicionar Novo
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item eventKey='edit-curso'>
										Alterar ou Remover
									</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title='Gerenciar Evento'
									className='a'
									id='nav-dropdown'>
									<NavDropdown.Item
										eventKey='add-evento'
										onClick={() => carregarCategorias('E')}>
										Adicionar Novo
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item eventKey='edit-evento'>
										Alterar ou Remover
									</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title='Gerenciar Noticia'
									className='a'
									id='nav-dropdown'>
									<NavDropdown.Item
										eventKey='add-noticia'
										onClick={() => carregarCategorias('N')}>
										Adicionar Novo
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item eventKey='edit-noticia'>
										Alterar ou Remover
									</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title='Gerenciar Categorias'
									className='a'
									id='nav-dropdown'>
									<NavDropdown.Item eventKey='add-cat'>
										Adicionar Categoria
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item eventKey='edit-cat'>
										Alterar ou Remover
									</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title='Gerenciar Usuário'
									className='a'
									id='nav-dropdown'>
									<NavDropdown.Item eventKey='add-adm'>
										Adicionar Novo
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item
										eventKey='edit-adm'
										onClick={() =>
											carregarCategorias(null)
										}>
										Alterar ou Remover
									</NavDropdown.Item>
								</NavDropdown>
							</Nav>
						</Col>
						<Col sm={9}>
							<Tab.Content>
								<Tab.Pane eventKey='add-curso'>
									<Container>
										<Row className='align-items-center justify-content-center'>
											<div style={{ minWidth: '50vh' }}>
												<h3 className='title'>Adicionar Novo Curso</h3>
												<form
													method='post'
													encType='multipart/form-data'
													onSubmit={adicionarCurso}>
													<div className='form-col form-group'>
														<div className='col'>
															<input
																className='form-ctrl'
																type='text'
																name='cur_nome'
																id='cur_nome'
																value={cur_nome}
																onChange={e => {
																	setNomeCur(e.target.value);
																	setErroMsg(false);
																	setSucessoMsg(false);
																}}
																placeholder='Nome do curso...'></input>
															<div className='mt-2 custom-control custom-radio custom-control-inline'>
																<input
																	checked={checado}
																	onChange={e => {
																		setStatusCur('A'); setChecado(true);
																		setChecado2(false); setErroMsg(false);
																		setSucessoMsg(false);
																	}}
																	type='radio'
																	id='cur_status_ativo'
																	name='cur_status'
																	className='custom-control-input'
																/>
																<label
																	className='custom-control-label'
																	htmlFor='cur_status_ativo'>
																	Ativo
																</label>
															</div>

															<div className='custom-control custom-radio custom-control-inline'>
																<input
																	checked={checado2}
																	onChange={e => {
																		setStatusCur('I'); setChecado2(true);
																		setChecado(false); setErroMsg(false);
																		setSucessoMsg(false);
																	}}
																	type='radio'
																	id='cur_status_inativo'
																	name='cur_status'
																	className='custom-control-input'
																/>
																<label
																	className='custom-control-label'
																	htmlFor='cur_status_inativo'>
																	Inativo
																</label>
															</div>
															<div className='form-row form-group pt-1 mb-0 align-items-center'>
																<Col>
																	<select
																		name='cur_cat'
																		className='custom-select'
																		value={cur_categoria}
																		onChange={e => {
																			setCategoriaCur(e.target.value);
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
																		)
																		)}
																	</select>
																</Col>
																<Col>
																	<input
																		className='form-ctrl'
																		type='text'
																		name='cur_valor'
																		id='cur_valor'
																		value={cur_valor}
																		onChange={e => {
																			setValorCur(e.target.value);
																			setErroMsg(false);
																			setSucessoMsg(false);
																		}}
																		placeholder='Valor do curso...'></input>
																</Col>
															</div>
															<div className='form-row form-group pt-1 mb-0 align-items-center'>
																<Col xs={9}>
																	<div className='custom-file mt-2'>
																		<input
																			type='file'
																			name='cur_img'
																			className='custom-file-input'
																			onChange={e => {
																				setImgCur(e.target.files[0]);
																				setErroMsg(false);
																				setSucessoMsg(false);
																			}}
																			id='cur_img'
																		/>
																		<label
																			className='custom-file-label form-ctrl'
																			htmlFor='cur_img'>
																			Escolher Imagem
																		</label>
																	</div>
																</Col>
																<Col xs={1}>
																	<input
																		type='button'
																		className='btn bg-brown mt-2'
																		onClick={uploadImgCurso}
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
								</Tab.Pane>
								<Tab.Pane eventKey='edit-curso'>
									<Table responsive hover>
										<thead>
											<tr>
												<th>#</th><th>Nome</th><th>Status</th><th>Valor</th><th>Ação</th>
											</tr>
										</thead>
										<tbody>
											{cursos.length !== 0
												? Object.keys(cursos).map((key, index) => (
													<tr key={`${cursos[key].cur_id}`}>
														<td>{cursos[key].cur_id}</td>
														<td>{cursos[key].cur_nome}</td>
														<td>{cursos[key].cur_status}</td>
														<td>{cursos[key].cur_valor}</td>
														<td>
															<Button
																onClick={() => editarCurso(cursos[key].cur_id)}
																className='m-0 p-0 border-0 bg-transparent'>
																<FiEdit style={{ color: '#231f20' }} />
															</Button>

															<Button
																onClick={() => removerCurso(cursos[key].cur_id)}
																className='ml-2 p-0 border-0 bg-transparent'>
																<FiTrash style={{ color: '#231f20' }} />
															</Button>
														</td>
													</tr>
												))
												: <tr>
													<td colSpan='5'> Não há cursos cadastrados</td>
												</tr>
											}
										</tbody>
									</Table>
								</Tab.Pane>
								<Tab.Pane eventKey='add-evento'>
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
																		Data do evento
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
																		Hora do evento
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
															<div className='mt-2 custom-control custom-radio custom-control-inline'>
																<input
																	checked={checado}
																	onChange={e => {
																		setStatusEve('A');
																		setChecado(true);
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
								</Tab.Pane>
								<Tab.Pane eventKey='edit-evento'>
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
								</Tab.Pane>
								<Tab.Pane eventKey='add-noticia'>
									<Container>
										<Row className='align-items-center justify-content-center'>
											<div style={{ minWidth: '50vh' }}>
												<h3 className='title'>Adicionar Nova Notícia</h3>
												<form
													method='post'
													onSubmit={adicionarNoticia}>
													<div className='form-col form-group'>
														<div className='col'>
															<input
																className='form-ctrl'
																type='text'
																name='not_titulo'
																id='not_titulo'
																value={not_titulo}
																onChange={e => {
																	setTituloNot(e.target.value);
																	setErroMsg(false); setSucessoMsg(false);
																}}
																placeholder='Titulo da notícia...'></input>
															<div className='form-row form-group pt-1 mb-0 align-items-center'>
																<div className='col mt-4'>
																	<select
																		className='custom-select'
																		value={not_categoria}
																		onChange={e => {
																			setCategoriaNot(e.target.value);
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
																	<label className='mb-0'>
																		Data da noticia
																	</label>
																	<input
																		className='form-ctrl'
																		type='date'
																		name='not_data'
																		id='not_data'
																		value={not_data}
																		onChange={e => {
																			setDataNot(e.target.value);
																			setErroMsg(false);
																			setSucessoMsg(false);
																		}}></input>
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
								</Tab.Pane>
								<Tab.Pane eventKey='edit-noticia'>
									<Table responsive hover>
										<thead>
											<tr>
												<th>#</th><th>Nome</th><th>Status</th><th>Ação</th>
											</tr>
										</thead>
										<tbody>
											{noticias.length !== 0
												? Object.keys(noticias).map((key, index) => (
													<tr key={`${noticias[key].not_id}`}>
														<td>{noticias[key].not_id}</td>
														<td>{noticias[key].not_titulo}</td>
														<td>{noticias[key].not_status}</td>
														<td>
															<Button
																/*  onClick={() => editarNoticia(noticias[key].not_id)} */
																className='m-0 p-0 border-0 bg-transparent'>
																<FiEdit style={{ color: '#231f20' }} />
															</Button>
															<Button
																onClick={() => removerCurso(noticias[key].not_id)}
																className='ml-2 p-0 border-0 bg-transparent'>
																<FiTrash style={{ color: '#231f20' }} />
															</Button>
														</td>
													</tr>
												))
												: <tr>
													<td colSpan='4'> Não há notícias cadastradas</td>
												</tr>
											}
										</tbody>
									</Table>
								</Tab.Pane>
								<Tab.Pane eventKey='add-adm'>
									<Container>
										<Row className='align-items-center justify-content-center'>
											<div style={{ minWidth: '50vh' }}>
												<h3 className='title'>Adicionar Novo Usuário</h3>
												<form
													method='post'
													onSubmit={registrar}>
													<div className='form-row form-group justify-content-between'>
														<Col xs={5}>
															<div className='row'>
																<input
																	className='form-ctrl'
																	type='text'
																	name='usu_nome'
																	id='usu_nome'
																	value={usu_nome}
																	onChange={e => {
																		setNome(e.target.value);
																		setErroMsg(false);
																		setSucessoMsg(false);
																	}}
																	placeholder='Digite o primeiro nome...'></input>
															</div>
														</Col>
														<Col xs={6}>
															<div className='row'>
																<input
																	className='form-ctrl'
																	type='text'
																	name='usu_sobrenome'
																	id='usu_sobrenome'
																	value={usu_sobrenome}
																	onChange={e => {
																		setSobrenome(e.target.value);
																		setErroMsg(false);
																		setSucessoMsg(false);
																	}}
																	placeholder='Digite o sobrenome...'></input>
															</div>
														</Col>
													</div>
													<div className='row mb-3'>
														<select
															className='custom-select'
															defaultValue='null'
															onChange={e => {
																setErroMsg(false);
																setSucessoMsg(false);
																setNivel(e.target.value);
															}}>
															<option
																value='null'
																disabled>
																Escolher nível...
															</option>
															<option value='U'>Usuário</option>
															<option value='A'>Administrador</option>
														</select>
													</div>
													<div className='form-group'>
														<div className='row'>
															<input
																className='form-ctrl'
																type='text'
																name='usu_email'
																id='usu_email'
																value={usu_email}
																onChange={e => {
																	setEmail(e.target.value);
																	setErroMsg(false); setSucessoMsg(false);
																}}
																placeholder='Digite o email...'></input>
														</div>
													</div>
													<div className='form-group mb-1'>
														<div className='row'>
															<input
																className='form-ctrl'
																type='password'
																name='usu_senha'
																id='usu_senha'
																value={usu_senha}
																onChange={e => {
																	setSenha(e.target.value);
																	setErroMsg(false);
																	setSucessoMsg(false);
																}}
																placeholder='Digite a senha...'></input>
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
								</Tab.Pane>
								<Tab.Pane eventKey='edit-adm'>
									<div style={{ height: '50vh', overflow: 'auto' }}>
										<Table responsive hover size='sm'>
											<thead>
												<tr>
													<th>#</th><th>Nível</th><th>Nome</th><th>Cidade</th><th>Sexo</th><th>Ação</th>
												</tr>
											</thead>
											<tbody>
												{usuarios.length !== 0 ?
													Object.keys(usuarios).map((key, index) => (
														<tr key={`${usuarios[key].usu_id}`}>
															<td>{usuarios[key].usu_id}</td>
															<td>{usuarios[key].usu_nivel}</td>
															<td>{usuarios[key].usu_nome}</td>
															<td>{usuarios[key].usu_cidade}</td>
															<td>{usuarios[key].usu_sexo}</td>
															<td>
																<Button className='m-0 p-0 border-0 bg-transparent'>
																	<FiEdit style={{ color: '#231f20' }} />
																</Button>
																<Button
																	onClick={() => removerUsuario(usuarios[key].usu_id)}
																	className='ml-2 p-0 border-0 bg-transparent'>
																	<FiTrash style={{ color: '#231f20' }} />
																</Button>
															</td>
														</tr>
													))
													: <tr>
														<td colSpan='6'>Não há usuários cadastrados</td>
													</tr>
												}
											</tbody>
										</Table>
									</div>
								</Tab.Pane>
								<Tab.Pane eventKey='add-cat'>
									<Container>
										<Row className='align-items-center justify-content-center'>
											<div style={{ minWidth: '50vh' }}>
												<h3 className='title'>Adicionar Nova Categoria</h3>
												<form
													method='post'
													onSubmit={adicionarCategoria}>
													<div className='form-col form-group'>
														<div className='col'>
															<input
																className='form-ctrl'
																type='text'
																name='cat_nome'
																id='cat_nome'
																value={cat_nome}
																onChange={e => {
																	setCatNome(e.target.value);
																	setErroMsg(false);
																	setSucessoMsg(false);
																}}
																placeholder='Nome da categoria...'></input>
															<div className='form-row form-group pt-1 mb-0 align-items-center'>
																<div className='col mt-2'>
																	<select
																		className='custom-select'
																		defaultValue='null'
																		onChange={e => {
																			setErroMsg(false);
																			setSucessoMsg(false);
																			setTipo(e.target.value);
																		}}>
																		<option
																			value='null'
																			disabled
																			selected>
																			Escolher tipo...
																		</option>
																		<option value='E'>Evento</option>
																		<option value='C'>Curso</option>
																		<option value='N'>Notícia</option>
																	</select>
																</div>
															</div>
														</div>
													</div>
													<Col>
														{erroMsg ? (<span className='erro'>	{erroMsg}</span>) : null}
														{sucessoMsg ? (<span className='sucesso'> {sucessoMsg}</span>) : null}
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
								</Tab.Pane>
								<Tab.Pane eventKey='edit-cat'>
									<div
										style={{ height: '50vh', overflow: 'auto' }}>
										<Table responsive hover size='sm'>
											<thead>
												<tr>
													<th>#</th><th>Nome</th><th>Tipo</th><th>Ação</th>
												</tr>
											</thead>
											<tbody>
												{categorias.length !== 0
													? Object.keys(categorias).map((key, index) => (
														<tr key={`${categorias[key].cat_id}`}>
															<td>{categorias[key].cat_id}</td>
															<td>{categorias[key].cat_nome}</td>
															<td>{categorias[key].cat_tipo}</td>
															<td>
																<Button
																	/*  onClick={() => editarCategoria(categorias[key].cat_id)} */
																	className='m-0 p-0 border-0 bg-transparent'>
																	<FiEdit style={{ color: '#231f20' }} />
																</Button>
																<Button
																	onClick={() => removerCategoria(categorias[key].cat_id)}
																	className='ml-2 p-0 border-0 bg-transparent'>
																	<FiTrash
																		style={{ color: '#231f20' }} />
																</Button>
															</td>
														</tr>

													))
													: <tr>
														<td colSpan='3'>Não há categorias cadastrados</td>
													</tr>
												}
											</tbody>
										</Table>
									</div>
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
			{modalCurVisivel ? (
				<Modal onClose={() => setModalCurVisivel(false)}>
					<h3 className='title'>Editar Curso</h3>
					<form
						method='post'
						encType='multipart/form-data'
						onSubmit={adicionarCurso}>
						<div className='form-col form-group'>
							<div className='col'>
								<input
									className='form-ctrl'
									type='text'
									name='cur_nome'
									id='cur_nome'
									value={cur_nome}
									onChange={e => {
										setNomeCur(e.target.value);
										setErroMsg(false);
										setSucessoMsg(false);
									}}
									placeholder='Nome do curso...'></input>

								<div className='mt-2 custom-control custom-radio custom-control-inline'>
									<input
										checked={checado}
										onChange={e => {
											setStatusCur('A');
											setChecado(true);
											setErroMsg(false);
											setSucessoMsg(false);
										}}
										type='radio'
										id='cur_status_ativo'
										name='cur_status'
										className='custom-control-input'
									/>
									<label
										className='custom-control-label'
										htmlFor='cur_status_ativo'>
										Ativo
									</label>
								</div>

								<div className='custom-control custom-radio custom-control-inline'>
									<input
										checked={checado2}
										onChange={e => {
											setStatusCur('I');
											setChecado2(true);
											setErroMsg(false);
											setSucessoMsg(false);
										}}
										type='radio'
										id='cur_status_inativo'
										name='cur_status'
										className='custom-control-input'
									/>
									<label
										className='custom-control-label'
										htmlFor='cur_status_inativo'>
										Inativo
									</label>
								</div>
								<div className='form-row form-group pt-1 mb-0 align-items-center'>
									<Col>
										<select
											name='cur_cat'
											className='custom-select'
											value={cur_categoria}
											onChange={e => {
												setCategoriaCur(e.target.value);
												setErroMsg(false);
												setSucessoMsg(false);
											}}>
											<option value='DEFAULT' disabled>
												Escolher categoria...
											</option>
											{Object.keys(categorias).map(
												(key, index) => (
													<option
														key={
															categorias[key]
																.cat_id
														}
														value={
															categorias[key]
																.cat_id
														}>
														{
															categorias[key]
																.cat_nome
														}
													</option>
												)
											)}
										</select>
									</Col>
									<Col>
										<input
											className='form-ctrl'
											type='text'
											name='cur_valor'
											id='cur_valor'
											value={cur_valor}
											onChange={e => {
												setValorCur(e.target.value);
												setErroMsg(false);
												setSucessoMsg(false);
											}}
											placeholder='Valor do curso...'></input>
									</Col>
								</div>
								<div className='form-row form-group pt-1 mb-0 align-items-center'>
									<Col xs={9}>
										<div className='custom-file mt-2'>
											<input
												type='file'
												name='cur_img'
												className='custom-file-input'
												onChange={e => {
													setImgCur(
														e.target.files[0]
													);
													setErroMsg(false);
													setSucessoMsg(false);
												}}
												id='cur_img'
											/>
											<label
												className='custom-file-label form-ctrl'
												htmlFor='cur_img'>
												Escolher Imagem
											</label>
										</div>
									</Col>
									<Col xs={1}>
										<input
											type='button'
											className='btn bg-brown mt-2'
											onClick={uploadImgCurso}
											value='Enviar'
										/>
									</Col>
								</div>
							</div>
						</div>
						<Col>
							{erroMsg ? (
								<span className='erro'>{erroMsg}</span>
							) : null}
							{sucessoMsg ? (
								<span className='sucesso'>{sucessoMsg}</span>
							) : null}
						</Col>
						<div className='form-group d-flex flex-row-reverse p-3 mb-0'>
							<button className='btn bg-brown w-30' type='submit'>
								ADICIONAR
							</button>
						</div>
					</form>
				</Modal>
			) : null}
			{modalEveVisivel ? (
				<Modal onClose={() => setModalEveVisivel(false)}>
					<h3 className='title'>Editar Evento</h3>
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
										setErroMsg(false);
										setSucessoMsg(false);
									}}
									placeholder='Nome do evento...'></input>
								<div className='form-row form-group pt-1 mb-0 align-items-center'>
									<Col className='mt-2'>
										<label className='mb-0'>
											Data do evento
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
											Hora do evento
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
								<div className='mt-2 custom-control custom-radio custom-control-inline'>
									<input
										checked={checado}
										onChange={e => {
											setStatusEve('A');
											setChecado(true);
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
											setStatusEve('I');
											setChecado2(true);
											setErroMsg(false);
											setSucessoMsg(false);
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
												setErroMsg(false);
												setSucessoMsg(false);
											}}>
											<option value='DEFAULT' disabled>
												Escolher categoria...
											</option>
											{Object.keys(categorias).map(
												(key, index) => (
													<option
														key={
															categorias[key]
																.cat_id
														}
														value={
															categorias[key]
																.cat_id
														}>
														{
															categorias[key]
																.cat_nome
														}
													</option>
												)
											)}
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
												setErroMsg(false);
												setSucessoMsg(false);
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
													setImgEve(
														e.target.files[0]
													);
													setErroMsg(false);
													setSucessoMsg(false);
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
							{erroMsg ? (
								<span className='erro'>{erroMsg}</span>
							) : null}
							{sucessoMsg ? (
								<span className='sucesso'>{sucessoMsg}</span>
							) : null}
						</Col>
						<div className='form-group d-flex flex-row-reverse p-3 mb-0'>
							<button className='btn bg-brown w-30' type='submit'>
								ADICIONAR
							</button>
						</div>
					</form>
				</Modal>
			) : null}
		</React.Fragment>
	);
}
