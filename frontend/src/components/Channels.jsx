import {
  Button, ButtonGroup, Col, Dropdown, Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../services/api/channelsApi.js';
import { setActiveChannel, setActiveModal, setClickedChannel } from '../services/slices/uiSlice.js';
import getModal from './modals/index.js';

const renderChannel = (
  channel,
  activeChannelId,
  handleSetActiveChannel,
  handleSetClickedChannel,
  handleClickRemove,
  handleClickRename,
) => {
  const { id, name, removable } = channel;
  const variant = id === activeChannelId ? 'secondary' : '';

  const navLinkBtn = (
    <Button
      variant={variant}
      className="w-100 rounded-0 text-start"
      onClick={handleSetActiveChannel}
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  if (!removable) {
    return (
      <Nav.Item
        key={id}
        as="li"
        className="w-100"
      >
        {navLinkBtn}
      </Nav.Item>
    );
  }

  return (
    <Nav.Item
      key={id}
      as="li"
      className="w-100"
    >
      <Dropdown as={ButtonGroup} className="d-flex">
        {navLinkBtn}
        <Dropdown.Toggle variant={variant} split id="dropdown-split-basic" />
        <Dropdown.Menu onClick={handleSetClickedChannel}>
          <Dropdown.Item onClick={handleClickRemove}>Удалить</Dropdown.Item>
          <Dropdown.Item onClick={handleClickRename}>Переименовать</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

const renderModal = (activeModal, handleHide, clickedChannelId, clickedChannelName) => {
  if (!activeModal) {
    return null;
  }

  const Component = getModal(activeModal);

  return (
    <Component
      handleHide={handleHide}
      clickedChannelId={clickedChannelId}
      clickedChannelName={clickedChannelName}
    />
  );
};

const Channels = () => {
  const {
    data: channels,
    isLoading: isChannelsLoading,
    error: channelsLoadError,
  } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { activeChannelId, activeModal, clickedChannelId } = useSelector((state) => state.ui);
  const clickedChannelName = channels?.find(({ id }) => id === clickedChannelId)?.name;

  const handleHide = () => dispatch(setActiveModal(null));
  const handleAdd = () => dispatch(setActiveModal('adding'));
  const handleRemove = () => dispatch(setActiveModal('removing'));
  const handleRename = () => dispatch(setActiveModal('renaming'));

  const renderChannelsList = () => {
    if (isChannelsLoading) {
      return <div>Загрузка...</div>;
    }
    if (channelsLoadError) {
      return <div>Ошибка</div>;
    }

    return (
      <Nav
        as="ul"
        variant="pills"
        fill
        id="channelsBox"
        className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
      >
        {channels?.map((channel) => (
          renderChannel(
            channel,
            activeChannelId,
            () => dispatch(setActiveChannel(channel.id)),
            () => dispatch(setClickedChannel(channel.id)),
            handleRemove,
            handleRename,
          )
        ))}
      </Nav>
    );
  };

  return (
    <>
      <Col xs={4} md={2} className="border-end px-0 flex-column h-100 d-flex bg-light">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>Каналы</b>
          <ButtonGroup
            as="button"
            vertical
            className="p-0 text-primary btn"
            onClick={handleAdd}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            <span className="visually-hidden">Создать канал</span>
          </ButtonGroup>
        </div>
        <Nav
          as="ul"
          variant="pills"
          fill
          id="channelsBox"
          className="flex-column px-2 mb-3 overflow-auto h-100 d-block"
        >
          {renderChannelsList()}
        </Nav>
      </Col>
      {renderModal(activeModal, handleHide, clickedChannelId, clickedChannelName)}
    </>
  );
};

export default Channels;
