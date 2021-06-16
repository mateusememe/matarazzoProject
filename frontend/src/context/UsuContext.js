import React, { createContext, useState } from 'react'
import api from '../services/api'

export const UsuContext = createContext();

export default function UsuProvider({ children }) {
  const [categorias, setCategoria] = useState([]);
  const [idCtx, setIdCtx] = useState('');
  const [emailCtx, setEmailCtx] = useState('');
  const [senhaCtx, setSenhaCtx] = useState('');
  const [nivelCtx, setNivelCtx] = useState('');

  return (
    <UsuContext.Provider
      value={{
        idCtx, setIdCtx,
        emailCtx, setEmailCtx,
        senhaCtx, setSenhaCtx,
        nivelCtx, setNivelCtx
      }}>
      {children}
    </UsuContext.Provider>
  );
}