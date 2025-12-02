import ReactDOM from 'react-dom/client';
import init from './init.jsx';
import './i18next.js';

const runApp = () => {
  const root = ReactDOM.createRoot(document.querySelector('#chat'));
  root.render(init());
};

runApp();
