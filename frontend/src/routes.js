import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Inicio from './pages/Inicio/'
import Login from './pages/Login/'
import Cadastro from './pages/Cadastro'

export default function Rotas() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Inicio} />
                <Route path="/login"  component={Login} />
                <Route path="/cadastro"  component={Cadastro} />
            </Switch>
        </BrowserRouter>
    );
}