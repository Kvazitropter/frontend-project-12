import {
  ButtonGroup, Col, Form, InputGroup,
} from 'react-bootstrap';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useRef, useEffect } from 'react';
import { useAddMessageMutation, useGetMessagesQuery } from '../services/api/messagesApi.js';
import { useGetChannelsQuery } from '../services/api/channelsApi.js';

const MessageForm = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const [
    addMessage,
    { isLoading: isAddingMessage },
  ] = useAddMessageMutation();
  const { username: currentUsername } = useSelector((state) => state.auth);
  const { activeChannelId } = useSelector((state) => state.ui);

  useEffect(() => {
    inputRef.current.focus();
  }, [activeChannelId]);

  const formik = useFormik({
    initialValues: {
      message: '',
    },
    onSubmit: (values) => {
      addMessage({
        body: values.message,
        channelId: activeChannelId,
        username: currentUsername,
      });
      formik.resetForm();
    },
  });

  return (
    <Form
      noValidate
      className="py-1 border rounded-2"
      onSubmit={formik.handleSubmit}
    >
      <InputGroup hasValidation>
        <Form.Control
          name="message"
          aria-label={t('messages.new.label')}
          placeholder={t('messages.new.placeholder')}
          className="border-0 p-0 ps-2"
          ref={inputRef}
          onChange={formik.handleChange}
          value={formik.values.message}
        />
        <ButtonGroup
          as="button"
          vertical
          type="submit"
          className="btn"
          disabled={!formik.values.message.trim() || isAddingMessage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z" />
          </svg>
          <span className="visually-hidden">{t('messages.new.hidden')}</span>
        </ButtonGroup>
      </InputGroup>
    </Form>
  );
};

const Message = ({ message }) => {
  const { id, body, username } = message;
  return (
    <div key={id} className="text-break mb-2">
      <b>{username}</b>
      :
      {body}
    </div>
  );
};

const Messages = () => {
  const { t } = useTranslation();
  const {
    data: messages,
    isLoading: isMessagesLoading,
    error: messagesLoadError,
  } = useGetMessagesQuery();
  const {
    data: channels,
    isLoading: isChannelsLoading,
    error: channelsLoadError,
  } = useGetChannelsQuery();
  const { activeChannelId } = useSelector((state) => state.ui);

  const getActiveChannelName = () => {
    if (isChannelsLoading) {
      return t('network.loading');
    }
    if (channelsLoadError) {
      switch (channelsLoadError.status) {
        case 401: return t('network.error.notAuth');
        default: return t('network.error.failed');
      }
    }
    return channels
      .find((channel) => channel.id === activeChannelId)
      ?.name;
  };

  const getShownMessages = () => {
    if (isMessagesLoading) {
      return t('network.loading');
    }
    if (messagesLoadError) {
      switch (messagesLoadError.status) {
        case 401: return t('network.error.notAuth');
        default: return t('network.error.failed');
      }
    }
    return messages
      .filter(({ channelId }) => channelId === activeChannelId)
      .map((message) => <Message key={message.id} message={message} />);
  };

  const shownMessages = getShownMessages();
  const messagesCount = Array.isArray(shownMessages) ? t('messages.count', { count: shownMessages?.length }) : shownMessages;

  return (
    <Col className="p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>{getActiveChannelName()}</b>
          </p>
          <span className="text-muted">
            {messagesCount}
          </span>
        </div>
        <div id="messages-box" className="chat-messages overflow-auto px-5 ">
          {shownMessages}
        </div>
        <div className="mt-auto px-5 py-3">
          <MessageForm />
        </div>
      </div>
    </Col>
  );
};

export default Messages;
