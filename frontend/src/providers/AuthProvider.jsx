import { useMemo, useState } from 'react';
import AuthContext from '../contexts/AuthContext.jsx';

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!window.localStorage.getItem('user'),
  );

  const logIn = () => setIsLoggedIn(true);
  const logOut = () => {
    setIsLoggedIn(false);
    window.localStorage.removeItem('user');
  };

  const value = useMemo(() => ({
    isLoggedIn,
    logIn,
    logOut,
  }), [isLoggedIn]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
