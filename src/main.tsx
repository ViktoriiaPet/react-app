import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { PokemonProvider } from './components/PokemonContext.tsx';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <StrictMode>
    <PokemonProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PokemonProvider>
  </StrictMode>
);
