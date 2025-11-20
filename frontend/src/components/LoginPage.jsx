import { useFormik } from 'formik'
import { useEffect, useState, useRef } from 'react'
import { Form, Card, Container, Image, Button, Col, Row } from 'react-bootstrap'
import axios from 'axios'
import loginAvatar from '../assets/loginAvatar.jpg'
import routes from '../routes'
import useAuth from '../hooks'
import { useNavigate } from 'react-router-dom'
 
const LoginForm = () => {
  const [isFailedAuth, setIsFailedAuth] = useState(false)
  const { logIn } = useAuth()
  const usernameInput = useRef(null)
  const navigate = useNavigate()

  useEffect(() => {
    usernameInput.current.focus()
  }, [])

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: async (values) => {
      setIsFailedAuth(false)
      await tryAuth({
        username: values.username,
        password: values.password,
      })
    },
  })

  const tryAuth = async (data) => {
    try {
      const response = await axios.post(routes.loginPath(), data)
      window.localStorage.setItem('userId', JSON.stringify(response.data))
      logIn()
      navigate('/')
    }
    catch (e) {
      console.error(e)
      setIsFailedAuth(true)
      usernameInput.current.focus()
    }
  }

  return (
    <Col
      as="form"
      md={6}
      xs={12}
      className="mt-3 mt-md-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">Войти</h1>
      <Form.FloatingLabel className="mb-3" label="Ваш ник" controlId="username">
        <Form.Control
          placeholder="Ваш ник"
          name="username"
          autoComplete="username"
          required
          isInvalid={isFailedAuth}
          value={formik.values.username}
          onChange={formik.handleChange}
          ref={usernameInput}
        />
      </Form.FloatingLabel>
      <Form.FloatingLabel className="mb-4" label="Пароль" controlId="password">
        <Form.Control
          placeholder="Пароль"
          name="password"
          autoComplete="current-password"
          required
          type="password"
          isInvalid={isFailedAuth}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          Неверные имя пользователя или пароль
        </Form.Control.Feedback>
        </Form.FloatingLabel>
      <Button type="submit" variant="outline-primary" className="w-100 mb-3">Войти</Button>
    </Col>
  )
}

const LoginPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image alt="Войти" src={loginAvatar} className="rounded-circle" />
              </Col>
              <LoginForm />
          </Card.Body>
          <Card.Footer className="p-4">
            <div className="text-center">
              <span>Нет аккаунта?</span>
              <a href="/signup">Регистрация</a>
            </div>
          </Card.Footer>
        </Card>
      </Col>
    </Row>
  </Container>
)

export default LoginPage
