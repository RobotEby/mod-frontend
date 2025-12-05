import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { store } from './app/store';
import './index.css';
import { setupApiClient } from './lib/api-client.ts';

// Configurar o api-client com o Redux store
setupApiClient(store);

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
