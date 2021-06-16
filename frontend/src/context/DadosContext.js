import React, { createContext, useState } from 'react'
import api from '../services/api'

export const DadosContext = createContext();

export default function DadosProvider({ children }) {
  const [categorias, setCategoria] = useState([]);
  const [cursos, setCurso] = useState([]);
  const [eventos, setEvento] = useState([]);
  const [noticias, setNoticia] = useState([]);
  const [usuarios, setUsuario] = useState([]);
  const [salas, setSala] = useState([]);
  const [sessoes, setSessao] = useState([]);
  const [cursosAtivos, setCurAtivo] = useState([]);
  const [eventosAtivos, setEveAtivo] = useState([]);
  const [cat, setCat] = useState('');

  const [eveIdCtx, setEveIdCtx] = useState('');
  const [eveNomeCtx, setEveNomeCtx] = useState('');
  const [notIdCtx, setNotIdCtx] = useState('');
  const [venIdCtx, setVenIdCtx] = useState('');
  const [sesIdCtx, setSesIdCtx] = useState('');
  const [salaIdCtx, setSalaIdCtx] = useState('');
  {/*
    variavel\qtde
    eve_id - 1x
    eve_nome - 1x
    not_id - 1x
    ven_id -1x
    ses_id - 1x
    sala_id - 1x
  */}
  const getCategoria = async id => {
    let resposta = await api.get('/categorias/id/' + id);
    let dataCat = JSON.parse(JSON.stringify(resposta.data[0]));
    setCat(dataCat.cat_nome);
  }

  const carregarCategorias = async tipoCat => {
    const response = await api.get('/categorias/tipo/' + tipoCat);
    setCategoria(response.data);
  }

  async function carregarSessoes() {
    const response = await api.get('/sessoes');
    console.log(response);
    setSessao(response.data);
  }

  async function carregarSalas() {
    const response = await api.get('/salas');
    setSala(response.data);
  }

  async function carregarCursosAtivos() {
    const response = await api.get('/cursosAtivos');
    console.log(response);
    setCurAtivo(response.data);
  }

  async function carregarEventosAtivos() {
    const response = await api.get('/eventosAtivos');
    console.log(response);

    setEveAtivo(response.data);
  }

  async function carregarCursos() {
    const response = await api.get('/cursos');
    setCurso(response.data);
  }

  async function carregarEventos() {
    const response = await api.get('/eventos');
    setEvento(response.data);
  }

  async function carregarNoticias() {
    const response = await api.get('/noticias');
    setNoticia(response.data);
  }

  async function carregarUsuarios() {
    const response = await api.get('/usuarios');
    setUsuario(response.data);
  }

  return (
    <DadosContext.Provider
      value={{
        categorias, cursos, cursosAtivos, eventos, eventosAtivos,
        noticias, usuarios, salas, sessoes,
        carregarCategorias, carregarCursos, carregarEventos,
        carregarNoticias, carregarUsuarios,
        carregarCursosAtivos, carregarEventosAtivos,
        carregarSalas, carregarSessoes,
        getCategoria, cat, setCat
      }}>
      {children}
    </DadosContext.Provider>
  );
}