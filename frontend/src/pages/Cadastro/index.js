import React from 'react';

export default function Cadastro() {
    return(
        <React.Fragment>
        <main className="container">
            <div className="form">
                <h1 className="title">CADASTRO</h1>
                <form>
                    <input type="text" placeholder="Digite seu primeiro nome..."></input>
                    <input type="text" placeholder="Digite seu sobrenome..."></input>
                    <input type="email" placeholder="Digite seu email..."></input>
                    <input type="text" placeholder="Digite seu cpf..."></input>

                </form>
                <a href="/login"><span>Ja possuo uma conta</span></a>
                <button>CRIAR CONTA</button>
            </div>
        </main>
        </React.Fragment>
    );
}