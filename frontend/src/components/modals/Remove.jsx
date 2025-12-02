import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { useRemoveChannelMutation } from '../../services/api/channelsApi.js';

const Remove = ({ handleHide, clickedChannelId }) => {
  const { t } = useTranslation();
  const [
    removeChannel,
    { isLoading: isRemovingChannel, error: removeChannelError },
  ] = useRemoveChannelMutation();

  const handleRemove = () => {
    removeChannel(clickedChannelId).unwrap()
      .then(() => toast.success(t('channels.remove.alert.success')))
      .catch(() => toast.error(t('channels.remove.alert.failed')));
  };

  return (
    <Modal show centered onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.remove.modal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channels.remove.modal.body')}</p>
        {removeChannelError
          && <div className="text-danger">{t('channels.remove.modal.error')}</div>}
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleHide}>
            {t('channels.remove.modal.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={handleRemove}
            disabled={isRemovingChannel}
          >
            {t('channels.remove.modal.submit')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
