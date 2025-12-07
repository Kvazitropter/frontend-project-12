import { Modal, Button } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { useRemoveChannelMutation } from '../../services/api/channelsApi.js'

const Remove = ({ handleHide, clickedChannelId }) => {
  const { t } = useTranslation()
  const [
    removeChannel,
    { isLoading: isRemovingChannel, error: removeChannelError },
  ] = useRemoveChannelMutation()

  const handleRemove = () => {
    removeChannel(clickedChannelId).unwrap()
      .then(() => toast.success(t('channels.removed')))
      .catch(() => toast.error(t('channels.modalRemove.failed')))
  }

  return (
    <Modal show centered onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('channels.modalRemove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('channels.modalRemove.body')}</p>
        {removeChannelError
          && <div className="text-danger">{t('channels.modalRemovel.error')}</div>}
        <div className="d-flex justify-content-end">
          <Button variant="secondary" className="me-2" onClick={handleHide}>
            {t('channels.modalRemove.cancel')}
          </Button>
          <Button
            variant="danger"
            onClick={handleRemove}
            disabled={isRemovingChannel}
          >
            {t('channels.modalRemove.submit')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default Remove
