import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate
} from 'react-router-dom'
import NotFoundPage from './NotFoundPage.jsx'
import LoginPage from './LoginPage.jsx'
import { Navbar, Container } from 'react-bootstrap'
import AuthContext from '../contexts/index.jsx'
import useAuth from '../hooks/index.jsx'

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const logIn = () => setIsLoggedIn(true)
  const logOut = () => {
    setIsLoggedIn(false)
    window.localStorage.removeItem('userId')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, logIn, logOut }}>
      {children}
    </AuthContext.Provider>
  )
}

const PrivateRoute = ({ children }) => {
  const auth = useAuth()
  const location = useLocation()

  return (
    auth.isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  )
}

const App = () => (
  <AuthProvider>
    <div className="d-flex flex-column h-100">
      <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <PrivateRoute>
                <div>Chat you see if logged in</div>
              </PrivateRoute>
            }
          />
          <Route
            path='/login'
            element={<LoginPage />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
    <div></div>
  </AuthProvider>
)

export default App
