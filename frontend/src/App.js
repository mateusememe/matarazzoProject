import React from 'react';
import Rotas from './routes';
import './global.css'
import DadosProvider from './context/DadosContext.js';
import InfoProvider from './context/InfoContext.js';

function App() {
  return (
    <InfoProvider>
      <DadosProvider>
        <Rotas />
      </DadosProvider>
    </InfoProvider>
  );
}

export default App;