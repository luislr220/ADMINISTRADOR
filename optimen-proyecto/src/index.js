import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';

import global_en from './components/translations/en/global.json';
import global_es from './components/translations/es/global.json';

i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources:{
    es:{
      global: global_es
    },
    en:{
      global: global_en
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <I18nextProvider i18n ={i18next}>
        <App />
      </I18nextProvider>

    </BrowserRouter>
  </React.StrictMode>
);
