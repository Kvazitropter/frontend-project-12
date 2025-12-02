import { useFormik } from 'formik';
import { Modal, Form, Button } from 'react-bootstrap';
import * as yup from 'yup';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useGetChannelsQuery, useUpdateChannelMutation } from '../../services/api/channelsApi.js';

const Rename = ({ handleHide, clickedChannelId, clickedChannelName }) => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { data: channels } = useGetChannelsQuery();
  const channelsNames = channels?.map(({ name }) => name);
  const [
    updateChannel,
    { isLoading: isUpdatingChannel, error: updateChannelError },
  ] = useUpdateChannelMutation();

  useEffect(() => {
    inputRef.current.focus();
  }, [updateChannelError]);

  const validationSchema = yup.object().shape({
    name: yup.string()
      .min(3, t('channels.rename.modal.error.name.notInRange'))
      .max(20, t('channels.rename.modal.error.name.notInRange'))
      .notOneOf(channelsNames, t('channels.rename.modal.error.name.notUniq'))
      .required(t('channels.rename.modal.error.name.required')),
  });

  const formik = useFormik({
    initialValues: {
      name: clickedChannelName,
    },
    validationSchema,
    onSubmit: ({ name }) => {
      updateChannel({
        id: clickedChannelId,
        data: {
          name,
        },
      }).unwrap()
        .then(() => toast.success(t('channels.rename.alert.success')))
        .catch(() => toast.error(t('channels.rename.alert.failed')));
    },
  });

  return (
    <Modal show centered onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.rename.modal.title')}</Modal.Title>
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
            isInvalid={(formik.errors.name && formik.touched.name) || updateChannelError}
          />
          <Form.Label htmlFor="name" className="visually-hidden">{t('channels.rename.modal.label')}</Form.Label>
          <Form.Control.Feedback type="invalid">
            {formik.errors.name ?? (updateChannelError && t('channels.rename.modal.error.failed'))}
          </Form.Control.Feedback>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" className="me-2" onClick={handleHide}>
              {t('channels.rename.modal.cancel')}
            </Button>
            <Button type="submit" variant="primary" disabled={isUpdatingChannel}>
              {t('channels.rename.modal.submit')}
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default Rename;
