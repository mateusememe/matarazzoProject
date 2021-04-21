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
    const [erroMsgE, setErroMsgE] = useState('');
    const [erroMsgS, setErroMsgS] = useState('');
    const history = useHistory();

    function validarEmail() {
        if (usu_email === "") {
            setErroMsgE("Preencha o campo Email!");
            return false;
        }
        else if (!(/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i).test(usu_email)) {
            setErroMsgE("Email inválido!");
            return false;
        }
        setErroMsgE("");
        return true;
    }

    function validarSenha() {
        if (usu_senha === "") {
            setErroMsgS("Preencha o campo Senha!");
            return false;
        }
        else if (!(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/i).test(usu_senha)) {
            //Mínimo de 6 caracteres, pelo menos uma letra e um número:
            setErroMsgS("Senha inválida!");
            return false;
        }
        setErroMsgS("");
        return true;
    }
    
    async function validadarLogin(e) {
        setErroMsgE(""); setErroMsgS("");
        e.preventDefault();
        validarEmail(); validarSenha();
        if (validarEmail() && validarSenha()) {
            const response = await api.post('/usuarios/login', { usu_email, usu_senha });
            if (response.data.length !== 0) {
                localStorage.setItem('usu_email', usu_email);
                localStorage.setItem('usu_senha', usu_senha);
                localStorage.setItem('usu_id', response.data[0].usu_id);
                localStorage.setItem('usu_nivel', response.data[0].usu_nivel);
                history.push('./');
            }
            else
                setErroMsgS("Usuario não encontrado!");
        }
    }

    if (!email)
        return (
            <React.Fragment>
                <Container>
                    <button className="btn bg-brown mt-3 w-30">
                        <Link to="./" style={{ color: "#fce373", textDecoration: "none" }}>INÍCIO</Link>
                    </button>
                    <Row style={{ minHeight: "80vh" }} className="align-items-center justify-content-center">
                        <div style={{ minWidth: "50vh" }}>
                            <h1 className="title">LOGIN</h1>
                            <form method="post" onSubmit={validadarLogin}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className="form-ctrl"
                                        name="usu_email" id="usu_email"
                                        value={usu_email}
                                        onChange={e => { setEmail(e.target.value); setErroMsgE(false) }}
                                        placeholder="Digite seu email..."
                                    >
                                    </input>
                                </div>
                                {erroMsgE ? <span className="erro">{erroMsgE}</span> : null}
                                <div className="form-group mb-1">
                                    <input
                                        className="form-ctrl"
                                        type="password"
                                        name="usu_senha" id="usu_senha"
                                        value={usu_senha}
                                        onChange={e => { setSenha(e.target.value); setErroMsgS(false) }}
                                        placeholder="Digite sua senha..."
                                    >
                                    </input>
                                </div>
                                {erroMsgS ? <span className="erro">{erroMsgS}</span> : null}
                                <span className="form-group d-flex flex-row-reverse">
                                    <Link to="/recuperar-senha" className="form-links">Recuperar Senha</Link>                                    
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