import { default as React } from 'react';
import { default as ReactDOM } from 'react-dom/client';

import './index.css';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
