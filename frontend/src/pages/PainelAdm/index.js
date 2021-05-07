import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api.js';
import {
	Container, NavDropdown, Table,
	Button, Row, Col, Tab, Nav
} from 'react-bootstrap';
import { FiTrash, FiEdit } from 'react-icons/fi';
import './paineladm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GerenciarCurso from '../../components/GerenciarCurso'
import GerenciarEvento from '../../components/GerenciarEvento'

export default function PainelAdm() {
	const usuario = localStorage.getItem('usu_id');
	const nivel = localStorage.getItem('usu_nivel');
	const [checado, setChecado] = useState(false);
	const [checado2, setChecado2] = useState(false);
	const [erroMsg, setErroMsg] = useState('');
	const [sucessoMsg, setSucessoMsg] = useState('');

	const [modalEveVisivel, setModalEveVisivel] = useState(false);
	const [modalNotVisivel, setModalNotVisivel] = useState(false);
	const [modalUsuVisivel, setModalUsuVisivel] = useState(false);
	const [modalCatVisivel, setModalCatVisivel] = useState(false);

	const [adicionar, setAdicionar] = useState(true);

	const [noticias, setNoticia] = useState([]);
	const [categorias, setCategoria] = useState([]);
	const [usuarios, setUsuario] = useState([]);

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
	const [usu_dtNasc, setDtNasc] = useState('');
	const [usu_fone, setFone] = useState('');
	const [usu_cpf, setCPF] = useState('');
	const [usu_endereco, setEndereco] = useState('');
	const [usu_cep, setCEP] = useState('');
	const [usu_cidade, setCidade] = useState('');
	const [usu_sexo, setSexo] = useState('');

	const [cat_id, setCatId] = useState('');
	const [cat_nome, setCatNome] = useState('');
	const [cat_tipo, setTipo] = useState('');

	const history = useHistory();

	async function removerUsuario(id) {
		await api.delete(`/usuarios/${id}`);
		carregarUsuarios();
	}

	async function removerNoticia(id) {
		await api.delete(`/noticias/${id}`);
		carregarNoticias();
	}


	async function removerCategoria(id) {
		const resp = await api.delete(`/categorias/${id}`);
		if (resp.data.status === false) {
			alert('Categoria em uso. Operação Falhou!');
		}
		carregarCategorias(null);
	}



	function limparFormNoticia() {
		if (modalNotVisivel)
			setAdicionar(true);
		setTituloNot('');
		setDataNot('');
		setAdmNot(usuario);
		setCategoriaNot('');
	}

	function limparFormUsuario() {
		if (modalUsuVisivel)
			setAdicionar(true);
		setNome('');
		setSobrenome('');
		setEmail('');
		setSenha('');
		setNivel('null');
	}

	function limparFormCategoria() {
		if (modalCatVisivel)
			setAdicionar(true);
		setCatNome('');
		setTipo('null');
	}

	async function adicionarNoticia(e) {
		e.preventDefault();

		if (not_titulo && not_data && not_adm && not_categoria) {
			if (adicionar) {
				await api.post('/noticias', {
					not_titulo, not_data, not_adm, not_categoria
				});
				setSucessoMsg('Noticia adicionada com sucesso!');
			}
			else {
				await api.put('/noticias', {
					not_titulo, not_data, not_adm, not_categoria, not_id
				});
				setSucessoMsg('Noticia atualizada com sucesso!');
			}

			limparFormNoticia();
			await sleep(3000);
			setSucessoMsg(false);
			carregarNoticias();
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
				if (adicionar) {
					const resp = await api.get('/usuarios/busca/' + usu_email);
					if (resp.data.length === 0) {
						await api.post('/usuarios/cadastro', {
							usu_nome, usu_sobrenome, usu_email,
							usu_senha, usu_nivel
						});
						setSucessoMsg('Usuario adicionado com sucesso!');
					}
					else setErroMsg('Email já cadastrado no sistema!');
				}
				else {
					await api.put('/usuarios/alterar', {
						usu_nome, usu_sobrenome, usu_email,
						usu_senha, usu_cpf, usu_dtNasc, usu_endereco,
						usu_cidade, usu_cep, usu_fone, usu_sexo, usu_id
					});
					setSucessoMsg('Usuario alterado com sucesso!');
					carregarUsuarios();
				}
				limparFormUsuario();
				await sleep(3000);
				setSucessoMsg(false);
			}
		}
	}

	async function adicionarCategoria(e) {
		e.preventDefault();
		if (cat_nome && cat_tipo) {
			if (adicionar) {
				const resp = await api.get(
					'/categorias/' + cat_nome + '/' + cat_tipo
				);
				if (resp.data.length === 0) {
					await api.post('/categorias', {
						cat_nome, cat_tipo
					});
					setSucessoMsg('Categoria adicionada com sucesso!');
					await sleep(3000);
					setSucessoMsg(false);
				} else {
					setErroMsg('Categoria já existente!');
				}
			}
			else {
				await api.put('/categorias', {
					cat_id, cat_nome, cat_tipo
				});
				setSucessoMsg('Categoria alterada com sucesso!');
				await sleep(3000);
				setSucessoMsg(false);
			}
			limparFormCategoria();
		} else {
			setErroMsg('Preencha todos os campos!');
			await sleep(3000);
			setErroMsg(false);
		}
	}



	async function carregarUsuarios() {
		const response = await api.get('/usuarios');
		setUsuario(response.data);
	}

	async function carregarNoticias() {
		const response = await api.get('/noticias');
		setNoticia(response.data);
	}

	async function carregarCategorias(tipoCat) {
		const response = await api.get('/categorias/tipo/' + tipoCat);
		setCategoria(response.data);
	}

	useEffect(() => {
		if (nivel !== 'A') history.push('/');
		else {
			carregarNoticias();
			carregarCategorias(null);
			carregarUsuarios();
			return () => {
				setNoticia({});
				setCategoria({});
				setUsuario({});
			};
		}
	}, [nivel, history]);

	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}





	async function editarNoticia(id) {
		const response = await api.get('/noticias/' + id);
		setIdNot(id);
		setTituloNot(response.data[0].not_titulo);
		setDataNot(formatarData(response.data[0].not_data));
		setAdmNot(response.data[0].usu_id);
		setCategoriaNot(response.data[0].cat_id);
		setAdicionar(false);
		setModalNotVisivel(true);
	}

	async function editarCategoria(id) {
		const response = await api.get('/categorias/id/' + id);
		setCatId(id);
		setCatNome(response.data[0].cat_nome);
		setTipo(response.data[0].cat_tipo);
		setAdicionar(false);
		setModalCatVisivel(true);
	}

	async function editarUsuario(id) {
		const response = await api.get('/usuarios/' + id);
		setIdUsu(id);
		setEmail(response.data[0].usu_email);
		setSenha(response.data[0].usu_senha)
		setNome(response.data[0].usu_nome);
		setDtNasc(response.data[0].usu_dtNasc);
		setFone(response.data[0].usu_fone);
		setSobrenome(response.data[0].usu_sobrenome);
		setCPF(response.data[0].usu_cpf);
		setEndereco(response.data[0].usu_endereco);
		setCEP(response.data[0].usu_cep);
		setCidade(response.data[0].usu_cidade);
		setSexo(response.data[0].usu_sexo);
		setNivel(response.data[0].usu_nivel);

		setAdicionar(false);
		setModalUsuVisivel(true);
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
										onClick={() => { limparFormNoticia(); carregarCategorias('N') }}>
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
									<GerenciarCurso
										usuario={usuario}
										nivel={nivel} flag='add'
									/>
								</Tab.Pane>
								<Tab.Pane eventKey='edit-curso'>
									<GerenciarCurso
										usuario={usuario}
										nivel={nivel}
										flag='edit'
									/>
								</Tab.Pane>
								<Tab.Pane eventKey='add-evento'>
									<GerenciarEvento
										usuario={usuario}
										nivel={nivel} flag='add'
									/>
								</Tab.Pane>
								<Tab.Pane eventKey='edit-evento'>
									<GerenciarEvento
										usuario={usuario}
										nivel={nivel} flag='add'
									/>
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
																onClick={() => editarNoticia(noticias[key].not_id)}
																className='m-0 p-0 border-0 bg-transparent'>
																<FiEdit style={{ color: '#231f20' }} />
															</Button>
															<Button
																onClick={() => removerNoticia(noticias[key].not_id)}
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
																<Button
																	onClick={() => editarUsuario(usuarios[key].usu_id)}
																	className='m-0 p-0 border-0 bg-transparent'>
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
																		>
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
																	onClick={() => editarCategoria(categorias[key].cat_id)}
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
		</React.Fragment>
	);
}
