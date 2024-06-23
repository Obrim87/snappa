import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { APIProvider } from '@vis.gl/react-google-maps';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <APIProvider
    apiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    onLoad={() => console.log('Maps API has loaded')}
    region='AU'>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </APIProvider>
);
