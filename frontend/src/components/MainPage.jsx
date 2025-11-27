import { Container, Row } from 'react-bootstrap';
import Channels from './Channels.jsx';
import Messages from './Messages.jsx';

const MainPage = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 flex-md-row bg-white">
      <Channels />
      <Messages />
    </Row>
  </Container>
);

export default MainPage;
