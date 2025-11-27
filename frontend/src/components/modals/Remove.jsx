import { Modal, Button } from 'react-bootstrap';
import { useRemoveChannelMutation } from '../../services/apiSlice';

const Remove = ({ handleHide, clickedChannelId }) => {
  const [removeChannel] = useRemoveChannelMutation();

  return (
    <Modal show centered onHide={handleHide}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Вы уверены?</p>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHide}>Отменить</Button>
          <Button
            variant="danger"
            onClick={() => {
              removeChannel(clickedChannelId);
              handleHide();
            }}
          >
            Удалить
          </Button>
        </Modal.Footer>
      </Modal.Body>
    </Modal>
  );
};

export default Remove;
