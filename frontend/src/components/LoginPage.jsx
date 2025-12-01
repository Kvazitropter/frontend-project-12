import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import {
  Form, Card, Container, Image, Button, Col, Row,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import loginAvatar from '../assets/loginAvatar.jpg';
import { useLoginMutation } from '../services/api/userApi.js';

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const usernameInput = useRef(null);
  const [
    login,
    { isLoading: isLoginLoading, isSuccess: isLoginSuccess, error: loginError },
  ] = useLoginMutation();

  useEffect(() => {
    if (isLoginSuccess) {
      navigate('/');
    }
  }, [isLoginSuccess, navigate]);

  useEffect(() => {
    usernameInput.current.focus();
  }, [loginError]);

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      login({
        username: values.username,
        password: values.password,
      });
    },
  });

  return (
    <Col
      as="form"
      md={6}
      xs={12}
      className="mt-3 mt-md-0"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">{t('login.form.header')}</h1>
      <Form.FloatingLabel className="mb-3" label={t('login.form.username')} controlId="username">
        <Form.Control
          placeholder={t('login.form.username')}
          name="username"
          autoComplete="username"
          required
          isInvalid={!!loginError}
          value={formik.values.username}
          onChange={formik.handleChange}
          ref={usernameInput}
        />
      </Form.FloatingLabel>
      <Form.FloatingLabel className="mb-4" label={t('login.form.password')} controlId="password">
        <Form.Control
          placeholder={t('login.form.password')}
          name="password"
          autoComplete="current-password"
          required
          type="password"
          isInvalid={!!loginError}
          value={formik.values.password}
          onChange={formik.handleChange}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {loginError?.status === 401 ? t('login.form.error.wrongData') : t('login.form.error.failed')}
        </Form.Control.Feedback>
      </Form.FloatingLabel>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100 mb-3"
        disabled={isLoginLoading}
      >
        {t('login.form.submit')}
      </Button>
    </Col>
  );
};

const LoginPage = () => {
  const { t } = useTranslation();

  return (
    <Container fluid className="h-100">
      <Row className="justify-content-center align-content-center h-100">
        <Col xs={12} md={8} xxl={6}>
          <Card className="shadow-sm">
            <Card.Body className="row p-5">
              <Col xs={12} md={6} className="d-flex align-items-center justify-content-center">
                <Image alt={t('login.form.header')} src={loginAvatar} className="rounded-circle" />
              </Col>
              <LoginForm />
            </Card.Body>
            <Card.Footer className="p-4">
              <div className="text-center">
                <span>{t('login.footer.message')}</span>
                <a href="/signup">{t('login.footer.registrationLink')}</a>
              </div>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;
