import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './services/index.js';
import AuthProvider from './providers/AuthProvider.jsx';

createRoot(document.getElementById('chat')).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </Provider>,
);
