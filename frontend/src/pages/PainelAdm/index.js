import React, { useState, useEffect } from 'react';
//import { useHistory } from 'react-router-dom';
import api from '../../services/api.js';
import { Container, Row, Col, Tab, Nav, NavDropdown } from 'react-bootstrap';
//import { Link, useHistory } from 'react-router-dom';

import CapaEvento from '../../components/CapaEventoAdm'
import CapaCurso from '../../components/CapaCursoAdm'
import CapaNoticia from '../../components/CapaNoticiaAdm'

import './paineladm.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PainelAdm() {
    const usu_id = localStorage.getItem("usu_id");
    const [checado, setChecado] = useState(false);
    const [checado2, setChecado2] = useState(false);

    const [eventos, setEvento] = useState([]);
    const [cursos, setCurso] = useState([]);
    const [noticias, setNoticia] = useState([]);
    const [categorias, setCategoria] = useState([]);

    const [cur_nome, setNomeCur] = useState('');
    const [cur_status, setStatusCur] = useState('');
    const [cur_adm, setAdmCur] = useState(usu_id);
    const [cur_categoria, setCategoriaCur] = useState('');
    const [cur_valor, setValorCur] = useState(5.00);

    /* const [not_titulo, setTituloNot] = useState('');
    const [not_data, setDataNot] = useState('');
    const [not_adm, setAdmNot] = useState('');
    const [not_categoria, setCategoriaNot] = useState('');

    const [eve_nome, setNomeEve] = useState('');
    const [eve_data, setDataEve] = useState('');
    const [eve_status, setStatusEve] = useState('');
    const [eve_valor, setValorEve] = useState('');
    const [eve_adm, setAdmEve] = useState('');
    const [eve_categoria, setCategoriaEve] = useState(''); */

    //funcao para verificar data e atribuir o status caso a data esteja valida

    async function adicionarCurso(e) {
        e.preventDefault();
        
        await api.post('/cursos',
            {
                cur_nome, cur_status,
                cur_categoria, cur_adm, cur_valor
            }
        );

        setChecado(false);
        setChecado2(false);
        setNomeCur('');
        setStatusCur('');
        setCategoriaCur("DEFAULT");
        setAdmCur('');
        setValorCur('');
        carregarCursos();
    }

    async function carregarEventos() {
        const response = await api.get('/eventos');
        setEvento(response.data);
    }

    async function carregarCursos() {
        const response = await api.get('/cursos');
        setCurso(response.data);
    }

    async function carregarNoticias() {
        const response = await api.get('/noticias');
        setNoticia(response.data);
    }

    async function carregarCategorias() {
        const response = await api.get('/categorias');
        setCategoria(response.data);
    }

    useEffect(() => {
        carregarEventos();
        carregarCursos();
        carregarNoticias();
        carregarCategorias();
        return () => {
            setEvento({});
            setCurso({});
            setNoticia({});
            setCategoria({});
        };
    }, []);

    return (
        <React.Fragment>
            <Container>
                <h1 className="title">Painel Administrativo</h1>
                <Tab.Container defaultActiveKey="first">
                    <Row className="mt-5 mb-5">
                        <Col sm={3}>
                            <Nav variant="pills" className="flex-column">
                                <NavDropdown className="a" title="Gerenciar Curso" id="nav-dropdown">
                                    <NavDropdown.Item eventKey="add-curso">Adicionar Novo</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item eventKey="edit-curso">Alterar ou Remover</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown className="a" title="Gerenciar Evento" id="nav-dropdown">
                                    <NavDropdown.Item eventKey="add-evento">Adicionar Novo</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item eventKey="edit-evento">Alterar ou Remover</NavDropdown.Item>
                                </NavDropdown>
                                <NavDropdown className="a" title="Gerenciar Noticia" id="nav-dropdown">
                                    <NavDropdown.Item eventKey="add-noticia">Adicionar Novo</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item eventKey="edit-noticia">Alterar ou Remover</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Col>
                        <Col sm={9}>
                            <Tab.Content>
                                <Tab.Pane eventKey="add-curso">
                                    <Container>
                                        <Row className="align-items-center justify-content-center">
                                            <div style={{ minWidth: "50vh" }}>
                                                <h3 className="title">Adicionar Novo Curso</h3>
                                                <form method="post" onSubmit={adicionarCurso}>
                                                    <div className="form-col form-group">
                                                        <div className="col">
                                                            <input
                                                                className="form-ctrl"
                                                                type="text" name="cur_nome" id="cur_nome"
                                                                value={cur_nome} onChange={e => setNomeCur(e.target.value)}
                                                                placeholder="Nome do curso..."
                                                            ></input>
                                                            <div className="mt-2 custom-control custom-radio custom-control-inline">
                                                                <input checked={checado} onChange={e => {setStatusCur('A'); setChecado(true)}} type="radio" id="cur_status_ativo" name="cur_status" className="custom-control-input" />
                                                                <label className="custom-control-label" htmlFor="cur_status_ativo">Ativo</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input checked={checado2}  onChange={e => {setStatusCur('I'); setChecado2(true)}} type="radio" id="cur_status_inativo" name="cur_status" className="custom-control-input" />
                                                                <label className="custom-control-label" htmlFor="cur_status_inativo">Inativo</label>
                                                            </div>
                                                            {cur_categoria !== 'DEFAULT'}
                                                            <select className="custom-select mt-2" defaultValue={'DEFAULT'} onChange={e => setCategoriaCur(e.target.value)}>
                                                                    <option value={'DEFAULT'} disabled>Escolher categoria...</option>
                                                                    {Object.keys(categorias).map((key, index) => (
                                                                        <option key={categorias[key].cat_id}
                                                                            value={categorias[key].cat_id}>{categorias[key].cat_nome}</option>
                                                                    ))}   
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="form-group d-flex flex-row-reverse">
                                                        <button className="mt-3 btn bg-brown w-30" type="submit">ADICIONAR</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="edit-curso">
                                    <Row>
                                        {cursos.length !== 0
                                            ? Object.keys(cursos).map((key,index) => (
                                                <Col xs={3} className="mb-0" key={`${cursos[key].cur_id}`}>
                                                    <CapaCurso data={cursos[key]} />
                                                </Col>
                                            ))
                                            : <span>Não há cursos cadastrados</span>
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="add-evento">
                                    Adicionar
                                </Tab.Pane>
                                <Tab.Pane eventKey="edit-evento">
                                    <Row>
                                        {eventos.length !== 0
                                            ? Object.keys(eventos).map((key,index) => (
                                                <Col xs={3} className="mb-0" key={`${eventos[key].eve_id}`}>
                                                    <CapaEvento data={eventos[key]} />
                                                </Col>
                                            ))
                                            : <span>Não há eventos cadastrados</span>
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="add-noticia">
                                    Adicionar
                                </Tab.Pane>
                                <Tab.Pane eventKey="edit-noticia">
                                    <Row>
                                        {noticias.length !== 0
                                            ? Object.keys(noticias).map((key,index) => (
                                                <Col xs={3} className="mb-0" key={`${noticias.not_id}`}>
                                                    <CapaNoticia data={noticias[key]} />
                                                </Col>
                                            ))
                                            : <span>Não há noticias cadastradas</span>
                                        }
                                    </Row>
                                </Tab.Pane>
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>
            </Container>
        </React.Fragment>
    )
}