import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useGetChannelsQuery, useUpdateChannelMutation } from '../../services/api/channelsApi.js';

const Rename = ({ handleHide, clickedChannelId, clickedChannelName }) => {
  const { data: channels } = useGetChannelsQuery();
  const channelsNames = channels?.map(({ name }) => name);
  const [updateChannel] = useUpdateChannelMutation();
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
      name: clickedChannelName,
    },
    validationSchema,
    onSubmit: (values) => {
      updateChannel({
        id: clickedChannelId,
        data: {
          name: values.name,
        },
      });
      handleHide();
    },
  });

  return (
    <Modal show centered onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
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
          <Modal.Footer>
            <Button variant="secondary" onClick={handleHide}>Отменить</Button>
            <Button type="submit" variant="primary">Отправить</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
