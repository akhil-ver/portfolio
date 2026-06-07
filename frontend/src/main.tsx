import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { AdminProvider } from './lib/admin';
import { initializeRemoteStorage } from './lib/remoteStorage';

initializeRemoteStorage().finally(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <AdminProvider>
        <App />
      </AdminProvider>
    </StrictMode>,
  );
});
