import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import App from './components/App.jsx';
import store from './services/index.js';
import FilterProvider from './providers/FilterProvider.jsx';

const rollbarConfig = {
  accessToken: 'POST_CLIENT_ITEM_ACCESS_TOKEN',
  environment: 'production',
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
