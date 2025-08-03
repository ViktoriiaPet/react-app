import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { PokemonProvider } from './components/PokemonContext.tsx';
import { BrowserRouter } from 'react-router-dom';

import './index.css';
import App from './App.tsx';

import { store } from './app/store.ts';
import { Provider } from 'react-redux';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root element not found');
}

const root = ReactDOM.createRoot(container);
root.render(
  <StrictMode>
    <Provider store={store}>
      <PokemonProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PokemonProvider>
    </Provider>
  </StrictMode>
);
