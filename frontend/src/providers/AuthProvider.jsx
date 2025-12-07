import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import AuthContext from '../contexts/AuthContext.jsx'
import { clearUserData } from '../services/slices/authSlice.js'

const AuthProvider = ({ children }) => {
  const dispatch = useDispatch()
  const isLoggedIn = useSelector(state => state.auth.token !== null)

  const logOut = useCallback(() => {
    dispatch(clearUserData())
  }, [dispatch])

  const value = useMemo(() => ({ isLoggedIn, logOut }), [isLoggedIn, logOut])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider
