import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './services/index.js';

const app = () => (
  <Provider store={store}>
    <App />
  </Provider>
);
export default app;
