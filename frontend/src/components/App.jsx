import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import SignupPage from './SignupPage.jsx';
import MainPage from './MainPage.jsx';
import { clearUserData } from '../services/slices/authSlice.js';

const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector((state) => state.auth.token !== null);
  const location = useLocation();

  return (
    isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} />
  );
};

const App = () => {
  const dispatch = useDispatch();
  const handleLogout = () => dispatch(clearUserData());

  return (
    <div className="d-flex flex-column h-100">
      <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
        <Container>
          <Navbar.Brand href="/">Hexlet Chat</Navbar.Brand>
          <Button onClick={handleLogout}>Выйти</Button>
        </Container>
      </Navbar>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={(
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
          )}
          />
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route
            path="/signup"
            element={<SignupPage />}
          />
          <Route
            path="*"
            element={<NotFoundPage />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
