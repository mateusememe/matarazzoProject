import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api.js'

export default function Cadastro() {
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [cpf, setCpf] = useState('');
    const [dataNasc, setDataNasc] = useState('');
    const [endereco, setEndereco] = useState('');
    const [cidade, setCidade] = useState('');
    const [cep, setCep] = useState('');

    async function registrar(e) {
        e.preventDefault();

        await api.post('usuarios/cadastro', 
            {
                nome, sobrenome, email,
                senha, cpf,
                endereco, cidade, cep
            }
        );

        setNome('');
        setSobrenome('');
        setEmail('');
        setSenha('');
        setCpf('');
        setEndereco('');
        setCidade('');
        setCep('');
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
                        <div className="flexName">
                            <input
                                style={{ width: "55%" }}
                                type="text" name="cpf" id="cpf"
                                value={cpf} onChange={e => setCpf(e.target.value)}
                                placeholder="Digite seu cpf..."
                            ></input>
                            <input
                                style={{ width: "35%" }}
                                type="date"
                            ></input>
                        </div>
                        <input
                            type="text" name="endereco" id="endereco"
                            value={endereco} onChange={e => setEndereco(e.target.value)}
                            placeholder="Digite seu endereço (com o nº)..."
                        ></input>
                        <div className="flexName">
                            <input
                                style={{ width: "55%" }}
                                type="text" name="cidade" id="cidade"
                                value={cidade} onChange={e => setCidade(e.target.value)}
                                placeholder="Digite o nome da sua Cidade..."
                            ></input>
                            <input
                                style={{ width: "35%" }}
                                type="text" name="cep" id="cep"
                                value={cep} onChange={e => setCep(e.target.value)}
                                placeholder="Digite seu CEP..."
                            ></input>
                        </div>
                        <Link to="/login" className="form-links">Ja possuo uma conta</Link>
                        <button type="submit">CRIAR CONTA</button>
                    </form>
                </div>
            </main>
        </React.Fragment>
    );
}