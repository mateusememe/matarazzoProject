import React from 'react';

export default function Cadastro() {
    return(
        <React.Fragment>
        <main className="container">
            <div className="form">
                <h1 className="title">CADASTRO</h1>
                <form>
                    <div className="flexName">
                        <input style={{width: "45%"}}type="text" placeholder="Digite seu primeiro nome..."></input>
                        <input style={{width: "45%"}} type="text" placeholder="Digite seu sobrenome..."></input>
                    </div>
                    <input type="email" placeholder="Digite seu email..."></input>
                    <input type="password" placeholder="Digite sua senha..."></input>
                    <div className="flexName">
                        <input style={{width: "55%"}} type="text" placeholder="Digite seu cpf..."></input>
                        <input style={{width: "35%"}} type="date" ></input>
                    </div>
                    <input type="text" placeholder="Digite seu endereço (com o nº)..."></input>
                    <div className="flexName">
                        <input style={{width: "55%"}} type="text" placeholder="Digite o nome da sua Cidade..."></input>   
                        <input style={{width: "35%"}} type="text" placeholder="Digite seu CEP..."></input>
                    </div>

                </form>
                <a href="/login"><span>Ja possuo uma conta</span></a>
                <button>CRIAR CONTA</button>
            </div>
        </main>
        </React.Fragment>
    );
}