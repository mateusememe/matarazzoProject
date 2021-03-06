import React from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'

import Inicio from './pages/Inicio/'
import Login from './pages/Login/'
import Cadastro from './pages/Cadastro'
import PainelAdm from './pages/PainelAdm'
import SelecionarSessao from './pages/Compra/selecionar-sessao.js'
import Concluido from './pages/Compra/concluido'
import Checkout from './pages/Compra/checkout-pagamento'
import SelecionarAssento from './pages/Compra/selecionar-assento'
import MinhaConta from './pages/Login/minha-conta'
import LeitorQrCode from './pages/QrCode/index'
import VisualizarNoticia from './pages/Noticia'
/* 
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
        <Route path="/selecionar-sessao" component={SelecionarSessao} />
        <Route path="/concluido" component={Concluido} />
        <Route path="/checkout-pagamento" component={Checkout} />
        <Route path="/selecionar-assentos" component={SelecionarAssento} />
        <Route path="/minha-conta" component={MinhaConta} />
        <Route path="/leitor-qrcode" component={LeitorQrCode} />
        <Route path="/noticia" component={VisualizarNoticia} />
        {/*
        <Route path="/recuperar-senha" component={RecuperarSenha} /> */}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}