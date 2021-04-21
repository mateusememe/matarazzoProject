import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Inicio from './pages/Inicio/'
import Login from './pages/Login/'
import Cadastro from './pages/Cadastro'
import PainelAdm from './pages/PainelAdm'
/* import Checkout from './pages/Compra/checkout'
import SelecAssento from './pages/Compra/selecionar-assento.js'
import Concluido from './pages/Compra/concluido'
import RecuperarSenha from './pages/Login/recuperar-senha.js'
 */
export default function Rotas() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Inicio} />
                <Route path="/login" component={Login} />
                <Route path="/cadastro" component={Cadastro} />
                <Route path="/painel-administrador" component={PainelAdm} />
                {/*                 <Route path="/checkout" component={Checkout} />
                <Route path="/selecionar-assento" component={SelecAssento} />
                <Route path="/concluido" component={Concluido} />
                <Route path="/recuperar-senha" component={RecuperarSenha} /> */}
                <Redirect to="/" />
            </Switch>
        </BrowserRouter>
    );
}