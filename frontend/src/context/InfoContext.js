import React, { createContext, useState } from 'react'
//import api from '../services/api'

export const InfoContext = createContext();

export default function InfoProvider({ children }) {
  //const [emailCtx, setEmailCtx] = useState([]);
  const [selecionado, setSelecionado] = useState([false]);
  const [qtdeSelecionado, setQtde] = useState(0);

  return (
    <InfoContext.Provider
      value={{
        selecionado, setSelecionado, qtdeSelecionado, setQtde
      }}>
      {children}
    </InfoContext.Provider>
  );
}