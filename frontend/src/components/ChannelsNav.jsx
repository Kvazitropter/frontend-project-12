import {
  Button, ButtonGroup, Col, Dropdown, Nav,
} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useGetChannelsQuery } from '../services/apiSlice.js';
import { setActiveChannel } from '../services/uiSlice.js';

const Channel = ({
  id, name, removable, variant, handleSetActiveChannel,
}) => {
  const navLinkBtn = (
    <Button
      variant={variant}
      className="w-100 rounded-0 text-start"
    >
      <span className="me-1">#</span>
      {name}
    </Button>
  );

  return (
    <Nav.Item
      key={id}
      as="li"
      className="w-100"
      onClick={handleSetActiveChannel}
    >
      {removable
        ? (
          <Dropdown as={ButtonGroup} className="d-flex">
            {navLinkBtn}
            <Dropdown.Toggle split id="dropdown-split-basic" />
            <Dropdown.Menu>
              <Dropdown.Item eventKey="delete">Удалить</Dropdown.Item>
              <Dropdown.Item eventKey="rename">Переименовать</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )
        : navLinkBtn}
    </Nav.Item>
  );
};

const ChannelsNav = () => {
  const dispatch = useDispatch();
  const {
    data: channels,
    isLoading: isChannelsLoading,
  } = useGetChannelsQuery();
  const { activeChannelId } = useSelector((state) => state.ui);

  return (
    <Col xs={4} md={2} className="border-end px-0 flex-column h-100 d-flex bg-light">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>Каналы</b>
        <ButtonGroup
          as="button"
          vertical
          className="p-0 text-primary btn"
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
        {isChannelsLoading
          ? <>Загрузка...</>
          : channels?.map(({ id, name, removable }) => (
            <Channel
              key={id}
              id={id}
              name={name}
              removable={removable}
              variant={id === activeChannelId ? 'secondary' : ''}
              handleSetActiveChannel={() => dispatch(setActiveChannel(id))}
            />
          )) ?? <>Ошибка загрузки</>}
      </Nav>
    </Col>
  );
};

export default ChannelsNav;
