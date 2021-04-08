import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Row } from 'react-bootstrap';

import api from '../../services/api.js'

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css'

export default function Login() {
    const [usu_email, setEmail] = useState('');
    const [usu_senha, setSenha] = useState('');
    const history = useHistory();

    async function validadarLogin(e) {
        e.preventDefault();
        const response = await api.post('/usuarios/login', { usu_email, usu_senha });
        //const emailRetornado = response.data[0].usu_email
        //const senhaRetornada = response.data[0].usu_senha
        if (response.data.length !== 0) {
            localStorage.setItem('usu_email', usu_email);
            localStorage.setItem('usu_senha', usu_senha);
            localStorage.setItem('usu_id', response.data[0].usu_id);
            history.push('./');
        }
    }

    return (
        <React.Fragment>
            <Container>
                <Row style={{ minHeight: "100vh" }} className="align-items-center justify-content-center">
                    <div style={{ minWidth: "50vh" }}>
                        <h1 className="title">LOGIN</h1>
                        <form method="post" onSubmit={validadarLogin}>
                            <div className="form-group">
                                <input
                                    className="form-ctrl"
                                    type="email"
                                    name="usu_email" id="usu_email"
                                    value={usu_email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Digite seu email..."
                                ></input>
                            </div>
                            <div className="form-group mb-1">
                                <input
                                    className="form-ctrl"
                                    type="password"
                                    name="usu_senha" id="usu_senha"
                                    value={usu_senha}
                                    onChange={e => setSenha(e.target.value)}
                                    placeholder="Digite sua senha..."
                                ></input>
                            </div>

                            <div className="form-group d-flex flex-row-reverse">
                                <Link to="/alterar-senha" className="form-links">Recuperar Senha</Link>
                            </div>
                            <button className="btn bg-brown w-100" type="submit">ENTRAR</button>
                        </form>
                    </div>
                </Row>
            </Container>
        </React.Fragment >
    );
}