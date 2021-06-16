import React from 'react';
import Rotas from './routes';
import './global.css'
import DadosProvider from './context/DadosContext.js';
import InfoProvider from './context/InfoContext.js';
import UsuProvider from './context/UsuContext.js';

function App() {
  return (
    <UsuProvider>
      <InfoProvider>
        <DadosProvider>
          <Rotas />
        </DadosProvider>
      </InfoProvider>
    </UsuProvider>
  );
}

export default App;