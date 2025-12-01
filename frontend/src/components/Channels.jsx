import {
  Button, ButtonGroup, Col, Dropdown, Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useGetChannelsQuery } from '../services/api/channelsApi.js';
import { setActiveChannel, setModalInfo, clearModalInfo } from '../services/slices/uiSlice.js';
import getModal from './modals/index.js';

const Channel = ({ channel }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { id, name, removable } = channel;
  const { activeChannelId } = useSelector((state) => state.ui);
  const variant = id === activeChannelId ? 'secondary' : '';

  const openRemoveModal = () => dispatch(setModalInfo({ type: 'removing', channelId: id }));
  const openRenameModal = () => dispatch(setModalInfo({ type: 'renaming', channelId: id, channelName: name }));

  const navLinkBtn = (
    <Button
      variant={variant}
      className="w-100 rounded-0 text-start"
      onClick={() => dispatch(setActiveChannel(id))}
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
        <Dropdown.Menu>
          <Dropdown.Item onClick={openRemoveModal}>{t('channels.remove.btn')}</Dropdown.Item>
          <Dropdown.Item onClick={openRenameModal}>{t('channels.rename.btn')}</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Nav.Item>
  );
};

const renderModal = (modalInfo, handleHide) => {
  if (!modalInfo.type) {
    return null;
  }

  const Component = getModal(modalInfo.type);

  return (
    <Component
      handleHide={handleHide}
      clickedChannelId={modalInfo.channelId}
      clickedChannelName={modalInfo.channelName}
    />
  );
};

const Channels = () => {
  const { t } = useTranslation();
  const {
    data: channels,
    isLoading: isChannelsLoading,
    error: channelsLoadError,
  } = useGetChannelsQuery();
  const dispatch = useDispatch();
  const { modalInfo } = useSelector((state) => state.ui);

  const handleHide = () => dispatch(clearModalInfo());
  const handleAdd = () => dispatch(setModalInfo({ type: 'adding' }));

  const renderChannelsList = () => {
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
      .map((channel) => <Channel key={channel.id} channel={channel} />);
  };

  return (
    <>
      <Col xs={4} md={2} className="border-end px-0 flex-column h-100 d-flex bg-light">
        <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
          <b>{t('channels.title')}</b>
          <ButtonGroup
            as="button"
            vertical
            className="p-0 text-primary btn"
            disabled={isChannelsLoading}
            onClick={handleAdd}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-plus-square" viewBox="0 0 16 16">
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            <span className="visually-hidden">{t('channels.add.hidden')}</span>
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
      {renderModal(modalInfo, handleHide)}
    </>
  );
};

export default Channels;
