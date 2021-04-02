import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Container, Col, Row } from 'react-bootstrap';

import api from '../../services/api.js'
import Navbar from '../../components/Navbar'

export default function Login() {
    const [usu_email, setEmail] = useState('');
    const [usu_senha, setSenha] = useState('');
    const history = useHistory();

    async function validadarLogin(e) {
        e.preventDefault();
        const response = await api.post('/usuarios/login', { usu_email, usu_senha });
        //const emailRetornado = response.data[0].usu_email
        //const senhaRetornada = response.data[0].usu_senha

        if (response.data !== 0) {
            localStorage.setItem('usu_email', usu_email);
            localStorage.setItem('usu_senha', usu_senha);
            history.push('./');
        }

    }

    return (
        <React.Fragment>
            <Navbar />
            <Container>
                <Row>
                    <Col>
                        <h1>LOGIN</h1>
                        <div>
                            <form onSubmit={validadarLogin}>
                                <input
                                    type="email"
                                    name="usu_email" id="usu_email"
                                    value={usu_email}
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder="Digite seu email..."
                                ></input>
                                <input
                                    type="password"
                                    name="usu_senha" id="usu_senha"
                                    value={usu_senha}
                                    onChange={e => setSenha(e.target.value)}
                                    placeholder="Digite sua senha..."
                                ></input>
                                <Link to="/alterar-senha" className="form-links">Esqueci minha senha</Link>
                                <button className="button" type="submit">ENTRAR</button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </React.Fragment >
    );
}