import { Provider } from 'react-redux';
import App from './components/App.jsx';
import store from './services/index.js';
import FilterProvider from './providers/FilterProvider.jsx';

const app = () => (
  <Provider store={store}>
    <FilterProvider>
      <App />
    </FilterProvider>
  </Provider>
);
export default app;
