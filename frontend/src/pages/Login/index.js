import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';
import api from '../../services/api.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

export default function Login() {
    const email = localStorage.getItem("usu_email");
    const [usu_email, setEmail] = useState('');
    const [usu_senha, setSenha] = useState('');
    const [erroMsg, setErroMsg] = useState('');
    const history = useHistory();

    async function validadarLogin(e) {
        e.preventDefault();
        if (usu_email && usu_senha) {
            const response = await api.post('/usuarios/login', { usu_email, usu_senha });
            if (response.data.length !== 0) {
                localStorage.setItem('usu_email', usu_email);
                localStorage.setItem('usu_senha', usu_senha);
                localStorage.setItem('usu_id', response.data[0].usu_id);
                localStorage.setItem('usu_nivel', response.data[0].usu_nivel);
                history.push('./');
            } else
                setErroMsg("Login ou senha inválidos!");
        } else
            setErroMsg("Preencha todos os campos!");
    }

    if (!email)
        return (
            <React.Fragment>
                <Container>
                    <Row style={{ minHeight: "100vh" }} className="align-items-center justify-content-center">
                        <div style={{ minWidth: "50vh" }}>
                            <h1 className="title">LOGIN</h1>
                            <form method="post" onSubmit={validadarLogin}>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className="form-ctrl"
                                        name="usu_email" id="usu_email"
                                        value={usu_email}
                                        onChange={e => {setEmail(e.target.value); setErroMsg(false)}}
                                        placeholder="Digite seu email..."
                                    >
                                    </input>
                                </div>
                                <div className="form-group mb-1">
                                    <input
                                        className="form-ctrl"
                                        type="password"
                                        name="usu_senha" id="usu_senha"
                                        value={usu_senha}
                                        onChange={e => {setSenha(e.target.value); setErroMsg(false)}}
                                        placeholder="Digite sua senha..."
                                    >
                                    </input>
                                </div>
                                {erroMsg ? <span className="erro">{erroMsg}</span> : null}
                                <span className="form-group d-flex flex-row-reverse">
                                    <Link to="/alterar-senha" className="form-links">Recuperar Senha</Link>
                                </span>
                                <button className="btn bg-brown w-100" type="submit">ENTRAR</button>
                            </form>
                        </div>

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