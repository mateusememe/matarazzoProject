import React, { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import {
	Container, NavDropdown, Row, Col, Tab, Nav
} from 'react-bootstrap';
import './paineladm.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import GerenciarCurso from '../../components/Gerenciar/GerenciarCurso'
import GerenciarEvento from '../../components/Gerenciar/GerenciarEvento'
import GerenciarNoticia from '../../components/Gerenciar/GerenciarNoticia'
import GerenciarCategoria from '../../components/Gerenciar/GerenciarCategoria.js';
import GerenciarUsuario from '../../components/Gerenciar/GerenciarUsuario';
import GerenciarSala from '../../components/Gerenciar/GerenciarSala'
import GerenciarSessao from '../../components/Gerenciar/GerenciarSessoes'

import { DadosContext } from '../../context/DadosContext.js';

export default function PainelAdm() {
	const history = useHistory();

	const usuario = localStorage.getItem('usu_id');
	const nivel = localStorage.getItem('usu_nivel');

	const {
		carregarCategorias, carregarCursos,
		carregarEventos, carregarNoticias, carregarUsuarios,
		carregarSalas, carregarSessoes
	} = useContext(DadosContext);

	useEffect(() => {
		if (nivel !== 'A') history.push('/');
	}, [nivel, history]);

	return (
		<React.Fragment>
			<Container>
				<button className='btn bg-brown mt-3 w-30'>
					<Link
						to='/'
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
									<NavDropdown.Item
										onClick={() => carregarCursos()}
										eventKey='edit-curso'>
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
									<NavDropdown.Item
										onClick={() => carregarEventos()}
										eventKey='edit-evento'>
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
									<NavDropdown.Item
										onClick={() => carregarNoticias()}
										eventKey='edit-noticia'>
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
									<NavDropdown.Item
										onClick={() => carregarCategorias(null)}
										eventKey='edit-cat'>
										Alterar ou Remover
									</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title='Gerenciar Usuário'
									className='a'
									id='nav-dropdown'>
									<NavDropdown.Item eventKey='add-adm'>
										Adicionar Novo
									</NavDropdown.Item>
									<NavDropdown.Item
										eventKey='edit-adm'
										onClick={() => carregarUsuarios()}>
										Alterar ou Remover
									</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title='Registrar Frequencia'
									className='a'
									id='nav-dropdown'>
									<NavDropdown.Item
										eventKey='freq-adm'
										onClick={() => history.push('./leitor-qrcode')}>
										Leitor QrCode
									</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title='Gerenciar Sessao'
									className='a'
									id='nav-dropdown'>
									<NavDropdown.Item
										eventKey='add-sessao'
										onClick={() => { carregarEventos(); carregarSalas() }}>
										Adicionar Novo
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item
										onClick={() => { carregarSessoes(); carregarEventos() }}
										eventKey='edit-sessao'>
										Alterar ou Remover
									</NavDropdown.Item>
								</NavDropdown>
								<NavDropdown title='Gerenciar Salas'
									className='a'
									id='nav-dropdown'>
									<NavDropdown.Item
										eventKey='add-sala'>
										Adicionar Novo
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item
										onClick={() => carregarSalas()}
										eventKey='edit-sala'>
										Remover
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
										tipo='C'
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
										nivel={nivel} flag='edit'
									/>
								</Tab.Pane>
								<Tab.Pane eventKey='add-noticia'>
									<GerenciarNoticia
										usuario={usuario}
										nivel={nivel} flag='add'
									/>
								</Tab.Pane>
								<Tab.Pane eventKey='edit-noticia'>
									<GerenciarNoticia
										usuario={usuario}
										nivel={nivel} flag='edit'
									/>
								</Tab.Pane>
								<Tab.Pane eventKey='add-adm'>
									<GerenciarUsuario
										usuario={usuario}
										nivel={nivel} flag='add'
									/>
								</Tab.Pane>
								<Tab.Pane eventKey='edit-adm'>
									<GerenciarUsuario
										usuario={usuario}
										nivel={nivel} flag='edit'
									/>
								</Tab.Pane>
								<Tab.Pane eventKey='add-cat'>
									<GerenciarCategoria
										usuario={usuario}
										nivel={nivel} flag='add'
									/>
								</Tab.Pane>
								<Tab.Pane eventKey='edit-cat'>
									<GerenciarCategoria
										usuario={usuario} nivel={nivel}
										flag='edit'
									/>
								</Tab.Pane>
								<Tab.Pane eventKey='add-sessao'>
									<GerenciarSessao
										flag='add'
									/>
								</Tab.Pane>
								<Tab.Pane eventKey='edit-sessao'>
									<GerenciarSessao />
								</Tab.Pane>
								<Tab.Pane eventKey='add-sala'>
									<GerenciarSala flag='add' />
								</Tab.Pane>
								<Tab.Pane eventKey='edit-sala'>
									<GerenciarSala />
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</Container>
		</React.Fragment>
	);
}
