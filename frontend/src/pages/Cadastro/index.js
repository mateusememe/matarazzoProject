import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api.js'

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [nivel, setNivel] = useState('');

    async function registrar(e) {
        e.preventDefault();

        await api.post('usuarios/cadastro', 
            {
                nome, sobrenome, 
                email, senha, nivel
            }
        );

        setNome('');
        setSobrenome('');
        setEmail('');
        setSenha('');
        setNivel('');
    }
    return (
        <React.Fragment>
            <main className="container">
                <div className="form">
                    <h1 className="title">CADASTRO</h1>
                    <form onSubmit={registrar}>
                        <div className="flexName">
                            <input
                                style={{ width: "45%" }}
                                type="text" name="nome" id="nome"
                                value={nome} onChange={e => setNome(e.target.value)}
                                placeholder="Digite seu primeiro nome..."
                            ></input>
                            <input
                                style={{ width: "45%" }}
                                type="text" name="sobrenome" id="sobrenome"
                                value={sobrenome} onChange={e => setSobrenome(e.target.value)}
                                placeholder="Digite seu sobrenome..."
                            ></input>
                        </div>
                        <input
                            type="email" name="email" id="email"
                            value={email} onChange={e => setEmail(e.target.value)}
                            placeholder="Digite seu email..."
                        ></input>
                        <input
                            type="password" name="senha" id="senha"
                            value={senha} onChange={e => setSenha(e.target.value)}
                            placeholder="Digite sua senha..."
                        ></input>
                        <Link to="/login" className="form-links">Ja possuo uma conta</Link>
                        <button type="submit">CRIAR CONTA</button>
                    </form>
                </div>
            </main>
        </React.Fragment>
    );
}