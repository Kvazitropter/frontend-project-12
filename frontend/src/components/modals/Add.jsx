import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetChannelsQuery, useAddChannelMutation } from '../../services/api/channelsApi.js';

const Add = ({ handleHide }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { data: channels } = useGetChannelsQuery();
  const channelsNames = channels?.map(({ name }) => name);
  const [
    addChannel,
    { isLoading: isAddingChannel, error: addChannelError },
  ] = useAddChannelMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, [addChannelError]);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, t('channels.add.modal.error.name.notInRange'))
      .max(20, t('channels.add.modal.error.name.notInRange'))
      .notOneOf(channelsNames, t('channels.add.modal.error.name.notUniq'))
      .required(t('channels.add.modal.error.name.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    onSubmit: ({ name }) => {
      addChannel({
        name,
      }).unwrap()
        .then(() => toast.success(t('channels.add.alert.success')))
        .catch(() => toast.error(t('channels.add.alert.failed')));
    },
  });

  return (
    <Modal show centered onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.add.modal.title')}</Modal.Title>
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
            <Form.Label htmlFor="name" className="visually-hidden">{t('channels.add.modal.label')}</Form.Label>
            <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" className="me-2" onClick={handleHide}>
                {t('channels.add.modal.cancel')}
              </Button>
              <Button type="submit" variant="primary" disabled={isAddingChannel}>
                {t('channels.add.modal.submit')}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Add;
