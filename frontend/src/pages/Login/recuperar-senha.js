import React, { useState } from 'react';
import { Row, Container } from 'react-bootstrap';
import api from '../../services/api';

export default function RecuperarSenha() {
    const [usu_email, setEmail] = useState('');
    const [erroMsg, setErroMsg] = useState(false);

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

    async function enviarEmail(e) {
        e.preventDefault();
        if (validarEmail()) {
            const response = await api.get('/usuarios/busca/' + usu_email);
            if (response.data[0].length === 1) {
                console.log("achou usuário");
            }
        }
    }

    return (
        <React.Fragment>
            <Container>
                <Row style={{ minHeight: "80vh" }} className="align-items-center justify-content-center">
                    <div style={{ minWidth: "50vh" }}>
                        <h1 className="title">Recuperar Senha</h1>
                        <form method="post" onSubmit={enviarEmail}>
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-ctrl"
                                    name="usu_email" id="usu_email"
                                    value={usu_email}
                                    onChange={e => { setEmail(e.target.value); setErroMsg(false) }}
                                    placeholder="Digite seu email..."
                                >
                                </input>
                            </div>
                            {erroMsg ? <span className="erro">{erroMsg}</span> : null}
                        </form>
                        <button className="btn bg-brown w-100" type="submit">ENTRAR</button>
                    </div>
                </Row>
            </Container>
        </React.Fragment>
    );
}