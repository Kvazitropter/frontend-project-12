import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App.jsx';
import store from './services/index.js';
import FilterProvider from './providers/FilterProvider.jsx';

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
};

const init = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <FilterProvider>
          <App />
        </FilterProvider>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
);

export default init;
