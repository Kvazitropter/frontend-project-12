import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useGetChannelsQuery, useAddChannelMutation } from '../../services/api/channelsApi.js';

const Add = ({ handleHide }) => {
  const { data: channels } = useGetChannelsQuery();
  const channelsNames = channels?.map(({ name }) => name);
  const [addChannel] = useAddChannelMutation();
  const inputRef = useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов')
      .notOneOf(channelsNames, 'Должно быть уникальным')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: (values) => {
      addChannel({
        name: values.name,
      });
      handleHide();
    },
  });

  return (
    <Modal show centered onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Добавить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <Form.Control
              name="name"
              id="name"
              className="mb-2"
              ref={inputRef}
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={formik.errors.name && formik.touched.name}
            />
            <Form.Label htmlFor="name" className="visually-hidden">Имя канала</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleHide}>Отменить</Button>
              <Button type="submit" variant="primary">Отправить</Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
