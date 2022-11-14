import React from 'react';
import ReactDOM from 'react-dom/client';
// import { Provider } from 'react-redux';
import './index.css';
import './scss/bootstrap-custom.scss';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
// import store from './redux/store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
