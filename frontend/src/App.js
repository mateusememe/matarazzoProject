import React from 'react';
import Rotas from './routes';
import './global.css'
import DadosProvider from './context/DadosContext.js';

function App() {
  return (
    <DadosProvider>
      <Rotas />
    </DadosProvider>
  );
}

export default App;