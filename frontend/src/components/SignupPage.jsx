import { useFormik } from 'formik'
import { useEffect, useRef } from 'react'
import {
  Form, FloatingLabel, Card, Container, Image, Button, Col, Row,
} from 'react-bootstrap'
import * as yup from 'yup'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import signupAvatar from '../assets/signupAvatar.jpg'
import { useSignupMutation } from '../services/api/userApi.js'

const SignupForm = () => {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const usernameInput = useRef(null)
  const [
    signup,
    { isLoading: isAuthLoading, isSuccess: isAuthSuccess, error: authError },
  ] = useSignupMutation()

  useEffect(() => {
    if (isAuthSuccess) {
      navigate('/')
    }
  }, [isAuthSuccess, navigate])

  useEffect(() => {
    usernameInput.current.focus()
  }, [authError])

  const validationSchema = yup.object().shape({
    username: yup.string()
      .min(3, t('signup.error.username.notInRange'))
      .max(20, t('signup.error.username.notInRange'))
      .required(t('signup.error.required')),
    password: yup.string()
      .min(6, t('signup.error.password.short'))
      .required(t('signup.error.required')),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], t('signup.error.confirmPassword.notMatch'))
      .required(t('signup.error.required')),
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      signup({
        username: values.username,
        password: values.password,
      }).unwrap()
        .catch(() => toast.error(t('signup.error.failed')))
    },
  })

  return (
    <Form
      className="w-50"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('signup.header')}</h1>
      <FloatingLabel className="mb-3" label={t('signup.username')} controlId="username">
        <Form.Control
          placeholder={t('signup.username')}
          name="username"
          autoComplete="username"
          required
          isInvalid={(formik.touched.username && !!formik.errors.username) || authError}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          ref={usernameInput}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.username}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel className="mb-3" label={t('signup.password')} controlId="password">
        <Form.Control
          placeholder={t('signup.password')}
          name="password"
          autoComplete="new-password"
          required
          type="password"
          isInvalid={(formik.touched.password && !!formik.errors.password) || authError}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password}
        </Form.Control.Feedback>
      </FloatingLabel>
      <FloatingLabel className="mb-4" label={t('signup.confirmPassword')} controlId="confirmPassword">
        <Form.Control
          placeholder={t('signup.confirmPassword')}
          name="confirmPassword"
          autoComplete="new-password"
          required
          type="password"
          isInvalid={
            (formik.touched.confirmPassword && !!formik.errors.confirmPassword) || authError
          }
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.confirmPassword
            ?? (authError?.status === 409 && t('signup.error.existingUser'))}
        </Form.Control.Feedback>
      </FloatingLabel>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100"
        disabled={isAuthLoading}
      >
        {t('signup.submit')}
      </Button>
    </Form>
  )
}

const SignupPage = () => {
  const { t } = useTranslation()

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image alt={t('signup.header')} src={signupAvatar} className="rounded-circle" />
              </div>
              <SignupForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default SignupPage
