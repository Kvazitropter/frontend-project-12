import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './services/index.js';
import AuthProvider from './providers/AuthProvider.jsx';

const init = async () => (
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>
);

export default init;
