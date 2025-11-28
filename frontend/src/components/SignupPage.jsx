import { useFormik } from 'formik';
import { useEffect, useRef } from 'react';
import {
  Form, Card, Container, Image, Button, Col, Row,
} from 'react-bootstrap';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import signupAvatar from '../assets/signupAvatar.jpg';
import { useSignupMutation } from '../services/api/userApi.js';

const SignupForm = () => {
  const navigate = useNavigate();
  const usernameInput = useRef(null);
  const [signup, { isLoading, isSuccess, isError: isAuthError }] = useSignupMutation();
  const existingUserError = 'Такой пользователь уже существует';

  useEffect(() => {
    if (isSuccess) {
      navigate('/');
    }
    usernameInput.current?.focus();
  }, [isLoading, isSuccess, navigate]);

  const validationSchema = yup.object().shape({
    username: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .required('Обязательное поле'),
    password: yup.string()
      .min(6, 'Не менее 6 символов')
      .required('Обязательное поле'),
    passwordConfirm: yup.string()
      .oneOf([yup.ref('password'), null], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      passwordConfirm: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      signup({
        username: values.username,
        password: values.password,
      });
    },
  });

  return (
    <Form
      className="w-50"
      onSubmit={formik.handleSubmit}
    >
      <h1 className="text-center mb-4">Регистрация</h1>
      <Form.FloatingLabel className="mb-3" label="Имя пользователя" controlId="username">
        <Form.Control
          placeholder="Имя пользователя"
          name="username"
          autoComplete="username"
          required
          isInvalid={(formik.touched.username && !!formik.errors.username) || isAuthError}
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          ref={usernameInput}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.username}
        </Form.Control.Feedback>
      </Form.FloatingLabel>
      <Form.FloatingLabel className="mb-3" label="Пароль" controlId="password">
        <Form.Control
          placeholder="Пароль"
          name="password"
          autoComplete="new-password"
          required
          type="password"
          isInvalid={(formik.touched.password && !!formik.errors.password) || isAuthError}
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.password}
        </Form.Control.Feedback>
      </Form.FloatingLabel>
      <Form.FloatingLabel className="mb-4" label="Подтвердите пароль" controlId="passwordConfirm">
        <Form.Control
          placeholder="Подтвердите пароль"
          name="passwordConfirm"
          autoComplete="new-password"
          required
          type="password"
          isInvalid={
            (formik.touched.passwordConfirm && !!formik.errors.passwordConfirm) || isAuthError
          }
          value={formik.values.passwordConfirm}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        <Form.Control.Feedback type="invalid" tooltip>
          {formik.errors.passwordConfirm ?? existingUserError}
        </Form.Control.Feedback>
      </Form.FloatingLabel>
      <Button
        type="submit"
        variant="outline-primary"
        className="w-100"
        disabled={isLoading}
      >
        Зарегистрироваться
      </Button>
    </Form>
  );
};

const SignupPage = () => (
  <Container fluid className="h-100">
    <Row className="justify-content-center align-content-center h-100">
      <Col xs={12} md={8} xxl={6}>
        <Card className="shadow-sm">
          <Card.Body className="d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
            <div>
              <Image alt="Регистрация" src={signupAvatar} className="rounded-circle" />
            </div>
            <SignupForm />
          </Card.Body>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default SignupPage;
