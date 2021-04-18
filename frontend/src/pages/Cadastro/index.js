import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api.js';
import { Container, Row, Col } from 'react-bootstrap';

import './cadastro.css'
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Cadastro() {
    const email = localStorage.getItem("usu_email");
    const nivel = localStorage.getItem("usu_nivel");
    const [usu_nome, setNome] = useState('');
    const [usu_sobrenome, setSobrenome] = useState('');
    const [usu_email, setEmail] = useState('');
    const [usu_senha, setSenha] = useState('');
    const [usu_nivel, setUsuNivel] = useState('U');
    const [concluido, setConcluido] = useState(false);
    const [erroMsg, setErroMsg] = useState('');
    const history = useHistory();

    function validarEmail() {
        if (usu_email === "") {
            setErroMsg("Preencha o campo Email!");
            return false;
        }
        else if (!(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(usu_email)) {
            setErroMsg("Email inválido!");
            return false;
        }
        setErroMsg("");
        return true;
    }
    function validarSenha() {
        if (usu_senha === "") {
            setErroMsg("Preencha o campo Senha!");
            return false;
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i).test(usu_senha)) {
            //Mínimo de 6 caracteres, pelo menos uma letra e um número:
            setErroMsg("Senha inválida!");
            return false;
        }
        setErroMsg("");
        return true;
    }
    async function registrar(e) {
        e.preventDefault();
        if (usu_nome.length < 3)
            setErroMsg("Nome precisa ter pelo menos 3 caracteres");
        else if (usu_sobrenome.length < 3)
            setErroMsg("Sobrenome precisa ter pelo menos 3 caracteres");
        else if (validarEmail()) {
            if (validarSenha()) {
                const resp = await api.get('/usuarios/busca/' + usu_email);
                if (resp.data.length === 0) {
                    await api.post('/usuarios/cadastro',
                        {
                            usu_nome, usu_sobrenome,
                            usu_email, usu_senha, usu_nivel
                        }
                    );
                    setNome('');
                    setSobrenome('');
                    setEmail('');
                    setSenha('');
                    setConcluido(true);
                } else
                    setErroMsg("Email já cadastrado no sistema!");
            }
        }
    }

    if (!concluido && !email)
        return (
            <React.Fragment>
                <Container>
                    <button className="btn bg-brown mt-3 w-30">
                        <Link to="./" style={{ color: "#fce373", textDecoration: "none" }}>INÍCIO</Link>
                    </button>
                    <Row style={{ minHeight: "80vh" }} className="align-items-center justify-content-center">
                        <div style={{ minWidth: "50vh" }}>
                            <h1 className="title">CADASTRO</h1>
                            <form method="post" onSubmit={registrar}>
                                <div className="form-row form-group justify-content-between">
                                    <Col xs={5}>
                                        <div className="row">
                                            <input
                                                className="form-ctrl"
                                                type="text" name="usu_nome" id="usu_nome"
                                                value={usu_nome} onChange={e => { setNome(e.target.value); setErroMsg(false) }}
                                                placeholder="Digite seu primeiro nome..."
                                            ></input>
                                        </div>
                                    </Col>
                                    <Col xs={6}>
                                        <div className="row">
                                            <input
                                                className="form-ctrl"
                                                type="text" name="usu_sobrenome" id="usu_sobrenome"
                                                value={usu_sobrenome} onChange={e => { setSobrenome(e.target.value); setErroMsg(false) }}
                                                placeholder="Digite seu sobrenome..."
                                            ></input>
                                        </div>
                                    </Col>
                                </div>
                                <div className="form-group">
                                    <div className="row">
                                        <input
                                            className="form-ctrl"
                                            type="text" name="usu_email" id="usu_email"
                                            value={usu_email} onChange={e => { setEmail(e.target.value); setErroMsg(false) }}
                                            placeholder="Digite seu email..."
                                        ></input>
                                    </div>
                                </div>
                                <div className="form-group mb-1">
                                    <div className="row">
                                        <input
                                            className="form-ctrl"
                                            type="password" name="usu_senha" id="usu_senha"
                                            value={usu_senha} onChange={e => { setSenha(e.target.value); setErroMsg(false) }}
                                            placeholder="Digite sua senha..."
                                        ></input>
                                    </div>
                                </div>
                                {erroMsg ? <span className="erro">{erroMsg}</span> : null}
                                <div className="form-group d-flex flex-row-reverse">
                                    <Link to="/login" className="form-links">Ja possuo uma conta</Link>
                                </div>
                                <button className="btn bg-brown w-100" type="submit">CRIAR CONTA</button>
                            </form>
                        </div>
                    </Row>
                </Container>
            </React.Fragment>
        );
    else
        if (!email)
            return (
                <React.Fragment>
                    <Container>
                        <Row style={{ minHeight: "100vh" }} className="align-items-center">
                            <Col>
                                <div className="d-flex justify-content-center">
                                    <h1>Cadastrado com sucesso!</h1>
                                </div>
                                <div className="d-flex justify-content-center">
                                    <button className="btn bg-brown w-30" onClick={() => history.push('./')}>VOLTAR PARA INICIO</button>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment>
            );
        else
            return (
                <React.Fragment>
                    {history.push('./')}
                </React.Fragment>
            );
}