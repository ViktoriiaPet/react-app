import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { PokemonProvider } from './components/PokemonContext.tsx';

import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.tsx';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(container);
root.render(
  <StrictMode>
    <PokemonProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </PokemonProvider>
  </StrictMode>
);
