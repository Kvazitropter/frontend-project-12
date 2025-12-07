import { Provider } from 'react-redux'
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react'
import App from './components/App.jsx'
import store from './services/index.js'
import AuthProvider from './providers/AuthProvider.jsx'
import FilterProvider from './providers/FilterProvider.jsx'

const rollbarConfig = {
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: 'production',
  captureUncaught: true,
  captureUnhandledRejections: true,
}

const init = () => (
  <RollbarProvider config={rollbarConfig}>
    <ErrorBoundary>
      <Provider store={store}>
        <AuthProvider>
          <FilterProvider>
            <App />
          </FilterProvider>
        </AuthProvider>
      </Provider>
    </ErrorBoundary>
  </RollbarProvider>
)

export default init
