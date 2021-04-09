import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../services/api.js';
import { Container, Row, Col, Tab, Nav, NavDropdown } from 'react-bootstrap';

import CapaEvento from '../../components/CapaEventoAdm'
import CapaCurso from '../../components/CapaCursoAdm'
import CapaNoticia from '../../components/CapaNoticiaAdm'

import './paineladm.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PainelAdm() {
    const usu_id = localStorage.getItem("usu_id");
    const usu_nivel = localStorage.getItem("usu_nivel");
    const [checado, setChecado] = useState(false);
    const [checado2, setChecado2] = useState(false);
    const [erroMsg, setErroMsg] = useState('');
    const [sucessoMsg, setSucessoMsg] = useState('');

    const [eventos, setEvento] = useState([]);
    const [cursos, setCurso] = useState([]);
    const [noticias, setNoticia] = useState([]);
    const [categorias, setCategoria] = useState([]);

    const [cur_nome, setNomeCur] = useState('');
    const [cur_status, setStatusCur] = useState('');
    const [cur_adm, setAdmCur] = useState(usu_id);
    const [cur_categoria, setCategoriaCur] = useState('DEFAULT');
    const [cur_valor, setValorCur] = useState('');
    const [cur_img, setImgCur] = useState('');

    const [not_titulo, setTituloNot] = useState('');
    const [not_data, setDataNot] = useState('');
    const [not_adm, setAdmNot] = useState(usu_id);
    const [not_categoria, setCategoriaNot] = useState('DEFAULT');

    const [eve_nome, setNomeEve] = useState('');
    const [eve_data, setDataEve] = useState('');
    const [eve_horario, setHorarioEve] = useState('');
    const [eve_status, setStatusEve] = useState('');
    const [eve_valor, setValorEve] = useState('');
    const [eve_adm, setAdmEve] = useState(usu_id);
    const [eve_categoria, setCategoriaEve] = useState('DEFAULT');
    const [eve_img, setImgEve] = useState('');

    const history = useHistory();

    async function adicionarCurso(e) {
        e.preventDefault();

        if (cur_nome && cur_status && cur_img && cur_categoria && cur_adm && cur_valor) {
            await api.post('/cursos',
                {
                    cur_nome, cur_status, cur_img,
                    cur_categoria, cur_adm, cur_valor
                }
            );

            setChecado(false);
            setChecado2(false);
            setNomeCur('');
            setStatusCur('');
            setCategoriaCur('DEFAULT');
            setAdmCur(usu_id);
            setValorCur('');
            setImgCur('');
            setSucessoMsg("Curso adicionado com sucesso!");
            await sleep(3000);
            setSucessoMsg(false);
            carregarCursos();
        } else {
            setErroMsg("Preencha todos os campos!")
            await sleep(3000);
            setErroMsg(false);
        }
    }

    async function adicionarEvento(e) {
        e.preventDefault();
        if (eve_nome && eve_status && eve_data && eve_horario && eve_categoria
            && eve_img && eve_adm && eve_valor) {
            await api.post('/eventos', {
                eve_nome, eve_status, eve_data,
                eve_horario, eve_categoria, eve_img,
                eve_adm, eve_valor
            });

            setChecado(false);
            setChecado2(false);
            setNomeEve('');
            setStatusEve('');
            setDataEve('');
            setCategoriaEve("DEFAULT");
            setAdmEve(usu_id);
            setValorEve('');
            setImgEve('');
            setSucessoMsg("Evento adicionado com sucesso!");
            await sleep(3000);
            setSucessoMsg(false);
            carregarEventos();
        } else {
            setErroMsg("Preencha todos os campos!")
            await sleep(3000);
            setErroMsg(false);
        }
    }

    async function adicionarNoticia(e) {
        e.preventDefault();

        if (not_titulo && not_data && not_adm && not_categoria) {
            await api.post('/noticias', {
                not_titulo, not_data,
                not_adm, not_categoria
            });

            setTituloNot('');
            setDataNot('');
            setAdmNot(usu_id);
            setSucessoMsg("Noticia adicionada com sucesso!");
            await sleep(3000);
            setSucessoMsg(false);
            setCategoriaNot('');
            carregarCategorias();
        } else {
            setErroMsg("Preencha todos os campos!")
            await sleep(3000);
            setErroMsg(false);        
        }
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
        if (usu_nivel !== 'A')
            history.push('/');
        else {
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
        }
    }, [usu_nivel, history]);

    async function uploadImgCurso() {
        const imgData = new FormData();
        imgData.append('cur_img', cur_img);

        const resUpload = await api.post('/upload/cursos', imgData, {
            config: { headers: { 'Content-Type': 'multipart/form-data' } }
        });

        setImgCur(resUpload.data);
        setSucessoMsg("Imagem adicionada com sucesso!");
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
        setSucessoMsg("Imagem adicionada com sucesso!");
        await sleep(3000);
        setSucessoMsg(false);
    }

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
                                                <form method="post" encType="multipart/form-data" onSubmit={adicionarCurso}>
                                                    <div className="form-col form-group">
                                                        <div className="col">
                                                            <input
                                                                className="form-ctrl"
                                                                type="text" name="cur_nome" id="cur_nome"
                                                                value={cur_nome} onChange={e => { setNomeCur(e.target.value); setErroMsg(false); setSucessoMsg(false) }}
                                                                placeholder="Nome do curso..."
                                                            ></input>

                                                            <div className="mt-2 custom-control custom-radio custom-control-inline">
                                                                <input
                                                                    checked={checado} onChange={e => { setStatusCur('A'); setChecado(true); setErroMsg(false); setSucessoMsg(false) }} type="radio" id="cur_status_ativo" name="cur_status" className="custom-control-input" />
                                                                <label className="custom-control-label" htmlFor="cur_status_ativo">Ativo</label>
                                                            </div>

                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input checked={checado2} onChange={e => { setStatusCur('I'); setChecado2(true); setErroMsg(false); setSucessoMsg(false) }} type="radio" id="cur_status_inativo" name="cur_status" className="custom-control-input" />
                                                                <label className="custom-control-label" htmlFor="cur_status_inativo">Inativo</label>
                                                            </div>
                                                            <div className="form-row form-group pt-1 mb-0 align-items-center">
                                                                <Col>
                                                                    <select name="cur_cat" className="custom-select" value={cur_categoria} onChange={e => { setCategoriaCur(e.target.value); setErroMsg(false); setSucessoMsg(false) }}>
                                                                        <option value='DEFAULT' disabled>Escolher categoria...</option>
                                                                        {Object.keys(categorias).map((key, index) => (
                                                                            <option key={categorias[key].cat_id}
                                                                                value={categorias[key].cat_id}>{categorias[key].cat_nome}</option>
                                                                        ))}
                                                                    </select>
                                                                </Col>
                                                                <Col>
                                                                    <input
                                                                        className="form-ctrl"
                                                                        type="text" name="cur_valor" id="cur_valor"
                                                                        value={cur_valor} onChange={e => { setValorCur(e.target.value); setErroMsg(false); setSucessoMsg(false) }}
                                                                        placeholder="Valor do curso..."
                                                                    ></input>
                                                                </Col>
                                                            </div>
                                                            <div className="form-row form-group pt-1 mb-0 align-items-center">
                                                                <Col xs={9}>
                                                                    <div className="custom-file mt-2">
                                                                        <input type="file" name="cur_img" className="custom-file-input" onChange={e => { setImgCur(e.target.files[0]); setErroMsg(false); setSucessoMsg(false) }} id="cur_img" />
                                                                        <label className="custom-file-label form-ctrl" htmlFor="cur_img">Escolher Imagem</label>
                                                                    </div>
                                                                </Col>
                                                                <Col xs={1}>
                                                                    <input type="button" className="btn bg-brown mt-2" onClick={uploadImgCurso} value="Enviar" />
                                                                </Col>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Col>
                                                        {erroMsg ? <span className="erro">{erroMsg}</span> : null}
                                                        {sucessoMsg ? <span className="sucesso">{sucessoMsg}</span> : null}
                                                    </Col>
                                                    <div className="form-group d-flex flex-row-reverse p-3">
                                                        <button className="btn bg-brown w-30" type="submit">ADICIONAR</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="edit-curso">
                                    <Row>
                                        {cursos.length !== 0
                                            ? Object.keys(cursos).map((key, index) => (
                                                <Col xs={3} className="mb-0" key={`${cursos[key].cur_id}`}>
                                                    <CapaCurso data={cursos[key]} />
                                                </Col>
                                            ))
                                            : <span>Não há cursos cadastrados</span>
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="add-evento">
                                    <Container>
                                        <Row className="align-items-center justify-content-center">
                                            <div style={{ minWidth: "50vh" }}>
                                                <h3 className="title">Adicionar Novo Evento</h3>
                                                <form method="post" encType="multipart/form-data" onSubmit={adicionarEvento}>
                                                    <div className="form-col form-group">
                                                        <div className="col">
                                                            <input
                                                                className="form-ctrl"
                                                                type="text" name="eve_nome" id="eve_nome"
                                                                value={eve_nome} onChange={e => { setNomeEve(e.target.value); setErroMsg(false); setSucessoMsg(false) }}
                                                                placeholder="Nome do evento..."
                                                            ></input>
                                                            <div className="form-row form-group pt-1 mb-0 align-items-center">
                                                                <Col className="mt-2">
                                                                    <label className="mb-0">Data do evento</label>
                                                                    <input
                                                                        className="form-ctrl"
                                                                        type="date" name="eve_data" id="eve_data"
                                                                        value={eve_data} onChange={e => { setDataEve(e.target.value); setErroMsg(false); setSucessoMsg(false) }}
                                                                    ></input>
                                                                </Col>
                                                                <Col className="mt-2">
                                                                    <label className="mb-0">Hora do evento</label>
                                                                    <input
                                                                        className="form-ctrl"
                                                                        type="time" name="eve_horario" id="eve_horario"
                                                                        value={eve_horario} onChange={e => { setHorarioEve(e.target.value); setErroMsg(false); setSucessoMsg(false) }}
                                                                    ></input>
                                                                </Col>
                                                            </div>
                                                            <div className="mt-2 custom-control custom-radio custom-control-inline">
                                                                <input checked={checado} onChange={e => { setStatusEve('A'); setChecado(true); setErroMsg(false); setSucessoMsg(false) }} type="radio" id="evt_status_ativo" name="eve_status" className="custom-control-input" />
                                                                <label className="custom-control-label" htmlFor="evt_status_ativo">Ativo</label>
                                                            </div>
                                                            <div className="custom-control custom-radio custom-control-inline">
                                                                <input checked={checado2} onChange={e => { setStatusEve('I'); setChecado2(true); setErroMsg(false); setSucessoMsg(false) }} type="radio" id="evt_status_inativo" name="eve_status" className="custom-control-input" />
                                                                <label className="custom-control-label" htmlFor="evt_status_inativo">Inativo</label>
                                                            </div>
                                                            <div className="form-row form-group pt-1 mb-0 align-items-center">
                                                                <div className="col">
                                                                    <select className="custom-select" value={eve_categoria} onChange={e => { setCategoriaEve(e.target.value); setErroMsg(false); setSucessoMsg(false) }}>
                                                                        <option value='DEFAULT' disabled>Escolher categoria...</option>
                                                                        {Object.keys(categorias).map((key, index) => (
                                                                            <option key={categorias[key].cat_id}
                                                                                value={categorias[key].cat_id}>{categorias[key].cat_nome}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <Col>
                                                                    <input
                                                                        className="form-ctrl"
                                                                        type="text" name="eve_valor" id="eve_valor"
                                                                        value={eve_valor} onChange={e => { setValorEve(e.target.value); setErroMsg(false); setSucessoMsg(false) }}
                                                                        placeholder="Valor do evento..."
                                                                    ></input>
                                                                </Col>
                                                            </div>
                                                            <div className="form-row form-group pt-1 mb-0 align-items-center justify-content-between">
                                                                <Col xs={9}>
                                                                    <div className="custom-file mt-2">
                                                                        <input type="file" name="eve_img" className="custom-file-input" onChange={e => { setImgEve(e.target.files[0]); setErroMsg(false); setSucessoMsg(false) }} id="eve_img" />
                                                                        <label className="custom-file-label form-ctrl" htmlFor="eve_img">Escolher imagem</label>
                                                                    </div>
                                                                </Col>
                                                                <Col>
                                                                    <input type="button" className="btn bg-brown mt-2" onClick={uploadImgEvento} value="Enviar" />
                                                                </Col>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Col>
                                                        {erroMsg ? <span className="erro">{erroMsg}</span> : null}
                                                        {sucessoMsg ? <span className="sucesso">{sucessoMsg}</span> : null}
                                                    </Col>
                                                    <div className="form-group d-flex flex-row-reverse p-3">
                                                        <button className="btn bg-brown w-30" type="submit">ADICIONAR</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="edit-evento">
                                    <Row>
                                        {eventos.length !== 0
                                            ? Object.keys(eventos).map((key, index) => (
                                                <Col xs={3} className="mb-0" key={`${eventos[key].eve_id}`}>
                                                    <CapaEvento data={eventos[key]} />
                                                </Col>
                                            ))
                                            : <span>Não há eventos cadastrados</span>
                                        }
                                    </Row>
                                </Tab.Pane>
                                <Tab.Pane eventKey="add-noticia">
                                    <Container>
                                        <Row className="align-items-center justify-content-center">
                                            <div style={{ minWidth: "50vh" }}>
                                                <h3 className="title">Adicionar Nova Notícia</h3>
                                                <form method="post" onSubmit={adicionarNoticia}>
                                                    <div className="form-col form-group">
                                                        <div className="col">
                                                            <input
                                                                className="form-ctrl"
                                                                type="text" name="not_titulo" id="not_titulo"
                                                                value={not_titulo} onChange={e => {setTituloNot(e.target.value); setErroMsg(false); setSucessoMsg(false)}}
                                                                placeholder="Titulo da notícia..."
                                                            ></input>
                                                            <div className="form-row form-group pt-1 mb-0 align-items-center">
                                                                <div className="col mt-4">
                                                                    <select className="custom-select" value={not_categoria} onChange={e => {setCategoriaNot(e.target.value); setErroMsg(false); setSucessoMsg(false)}}>
                                                                        <option value='DEFAULT' disabled>Escolher categoria...</option>
                                                                        {Object.keys(categorias).map((key, index) => (
                                                                            <option key={categorias[key].cat_id}
                                                                                value={categorias[key].cat_id}>{categorias[key].cat_nome}</option>
                                                                        ))}
                                                                    </select>
                                                                </div>
                                                                <Col>
                                                                    <label className="mb-0">Data da noticia</label>
                                                                    <input
                                                                        className="form-ctrl"
                                                                        type="date" name="not_data" id="not_data"
                                                                        value={not_data} onChange={e => {setDataNot(e.target.value); setErroMsg(false); setSucessoMsg(false)}}
                                                                    ></input>
                                                                </Col>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Col>
                                                        {erroMsg ? <span className="erro">{erroMsg}</span> : null}
                                                        {sucessoMsg ? <span className="sucesso">{sucessoMsg}</span> : null}
                                                    </Col>
                                                    <div className="form-group d-flex flex-row-reverse p-3">
                                                        <button className="btn bg-brown w-30" type="submit">ADICIONAR</button>
                                                    </div>
                                                </form>
                                            </div>
                                        </Row>
                                    </Container>
                                </Tab.Pane>
                                <Tab.Pane eventKey="edit-noticia">
                                    <Row>
                                        {noticias.length !== 0
                                            ? Object.keys(noticias).map((key, index) => (
                                                <Col xs={3} className="mb-0" key={`${noticias[key].not_id}`}>
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