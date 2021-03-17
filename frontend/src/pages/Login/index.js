import React from 'react';

export default function Login() {
    return(
        <React.Fragment>
        <main className="container">
            <div className="form">
                <h1 className="title">LOGIN</h1>
                <form>
                    <input type="email" placeholder="Digite seu email..."></input>
                    <input type="password" placeholder="Digite sua senha..."></input>
                </form>
                <a href="#"><span>Esqueci minha senha</span></a>
                <button>ENTRAR</button>
            </div>
        </main>
        </React.Fragment>
        
    );
}