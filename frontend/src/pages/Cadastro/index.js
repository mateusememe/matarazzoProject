import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api.js'
import Navbar from '../../components/Navbar'
import './cadastro.css'

export default function Cadastro() {
    const [usu_nome, setNome] = useState('');
    const [usu_sobrenome, setSobrenome] = useState('');
    const [usu_email, setEmail] = useState('');
    const [usu_senha, setSenha] = useState('');
    const history = useHistory();

    async function registrar(e) {
        e.preventDefault();

        await api.post('/usuarios/cadastro', 
            {
                usu_nome, usu_sobrenome, 
                usu_email, usu_senha
            }
        );

        setNome('');
        setSobrenome('');
        setEmail('');
        setSenha('');
        
        alert('CADASTRADO COM SUCESSO!');
        history.push('./');
    }
    return (
        <React.Fragment>
            <Navbar />
            <h1 className="title">CADASTRO</h1>
            <main className="container">
                <div className="form">
                    <form method="post" onSubmit={registrar}>
                        <div className="flexName">
                            <input
                                style={{ width: "45%" }}
                                type="text" name="usu_nome" id="usu_nome"
                                value={usu_nome} onChange={e => setNome(e.target.value)}
                                placeholder="Digite seu primeiro nome..."
                            ></input>
                            <input
                                style={{ width: "45%" }}
                                type="text" name="usu_sobrenome" id="usu_sobrenome"
                                value={usu_sobrenome} onChange={e => setSobrenome(e.target.value)}
                                placeholder="Digite seu sobrenome..."
                            ></input>
                        </div>
                        <input
                            type="email" name="usu_email" id="usu_email"
                            value={usu_email} onChange={e => setEmail(e.target.value)}
                            placeholder="Digite seu email..."
                        ></input>
                        <input
                            type="password" name="usu_senha" id="usu_senha"
                            value={usu_senha} onChange={e => setSenha(e.target.value)}
                            placeholder="Digite sua usu_senha..."
                        ></input>
                        <Link to="/login" className="form-links">Ja possuo uma conta</Link>
                        <button type="submit">CRIAR CONTA</button>
                    </form>
                </div>
            </main>
        </React.Fragment>
    );
}