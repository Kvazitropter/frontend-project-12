import {
  ButtonGroup, Button, Col, Form, InputGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useAddMessageMutation, useGetMessagesQuery, useGetChannelsQuery } from '../services/apiSlice.js';

const MessageBox = () => {
  const { username } = JSON.parse(window.localStorage.getItem('user'));
  const { data: messages, isLoading: isMessagesLoading } = useGetMessagesQuery();
  const { data: channels } = useGetChannelsQuery();
  const { activeChannelId } = useSelector((state) => state.ui);
  const activeChannel = channels?.find((channel) => channel.id === activeChannelId);
  const shownMessages = messages?.filter(({ channelId }) => channelId === activeChannelId);
  const [addMessage] = useAddMessageMutation();

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      addMessage({
        body: values.message,
        channelId: activeChannelId,
        username,
      });
      formik.resetForm();
    },
  });

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm">
          <p className="m-0">
            <b>
              {`# ${activeChannelId === null
                ? 'Loading id...'
                : activeChannel.name}`}
            </b>
          </p>
          <span className="text-muted">
            {`${activeChannelId === null || isMessagesLoading
              ? <>Loading...</>
              : shownMessages.length} сообщений`}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {activeChannelId === null || isMessagesLoading
            ? <>Loading...</>
            : shownMessages.map(({ id, body }) => (
              <div key={id} className="text-break mb-2">
                <b>{username}</b>
                :
                {body}
              </div>
            ))}
        </div>
        <div className="mt-auto px-5 py-3">
          <form
            noValidate
            className="py-1 border rounded-2"
            onSubmit={formik.handleSubmit}
          >
            <InputGroup hasValidation>
              <Form.Control
                name="message"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2"
                required
                onChange={formik.handleChange}
                value={formik.values.message}
              />
              <ButtonGroup
                as={Button}
                vertical
                variant="outline-info"
                type="submit"
                disabled={activeChannelId === null || formik.values.message.trim() === ''}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
                </svg>
                <span className="visually-hidden">Отправить</span>
              </ButtonGroup>
            </InputGroup>
          </form>
        </div>
      </div>
    </Col>
  );
};

export default MessageBox;
