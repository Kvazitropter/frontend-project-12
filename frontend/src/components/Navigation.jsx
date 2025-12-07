import { Navbar, Container, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'

const Navigation = () => {
  const { t } = useTranslation()
  const { isLoggedIn, logOut } = useAuth()
  const logoutBtn = <Button onClick={logOut}>{t('navigation.logout')}</Button>

  return (
    <Navbar expand="lg" variant="light" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand as={Link} to="/">{t('navigation.brand')}</Navbar.Brand>
        {isLoggedIn && logoutBtn}
      </Container>
    </Navbar>
  )
}

export default Navigation
