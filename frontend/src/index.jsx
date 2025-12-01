import ReactDOM from 'react-dom/client';
import app from './init.jsx';
import './i18next.js';

const runApp = async () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(await app());
};

runApp();
