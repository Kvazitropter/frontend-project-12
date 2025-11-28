import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './services/index.js';

const init = async () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default init;
