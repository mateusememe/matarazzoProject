import React, { createContext, useState } from 'react'
import api from '../services/api'

export const DadosContext = createContext();

export default function DadosProvider({ children }) {
  const [categorias, setCategoria] = useState([]);
  const [cursos, setCurso] = useState([]);
  const [eventos, setEvento] = useState([]);
  const [noticias, setNoticia] = useState([]);
  const [usuarios, setUsuario] = useState([]);

  const carregarCategorias = async tipoCat => {
    const response = await api.get('/categorias/tipo/' + tipoCat);
    setCategoria(response.data);
  }

  async function carregarCursos() {
    const response = await api.get('/cursosAtivos');
    setCurso(response.data);
  }

  async function carregarEventos() {
    const response = await api.get('/eventosAtivos');
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
        categorias, cursos, eventos, noticias, usuarios,
        carregarCategorias, carregarCursos, carregarEventos, carregarNoticias, carregarUsuarios
      }}>
      {children}
    </DadosContext.Provider>
  );
}