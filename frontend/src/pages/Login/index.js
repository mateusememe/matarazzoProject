import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api.js'

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    //const history = useHistory();

    async function validadarLogin(e) {
        e.preventDefault();
        const response = await api.post('/usuarios/login', { email, senha });
        //const emailRetornado = response.data[0].usu_email
        //const senhaRetornada = response.data[0].usu_senha

        if (response.data !== 0) {
            alert("LOGADO COM SUCESSO!");

            /* 
            localStorage.setItem('usu_email');
            localStorage.setItem('usu_senha');
            history.push('./'); */
        }

    }

    return (
        <React.Fragment>
            <main className="container">
                <div className="form">
                    <h1 className="title">LOGIN</h1>
                    <form onSubmit={validadarLogin}>
                        <input
                            type="email"
                            name="email" id="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            placeholder="Digite seu email..."
                        ></input>
                        <input
                            type="password"
                            name="senha" id="senha"
                            value={senha}
                            onChange={e => setSenha(e.target.value)}
                            placeholder="Digite sua senha..."
                        ></input>
                        <Link to="/alterar-senha" className="form-links">Esqueci minha senha</Link>
                        <button type="submit">ENTRAR</button>
                    </form>
                </div>
            </main>
        </React.Fragment>

    );
}