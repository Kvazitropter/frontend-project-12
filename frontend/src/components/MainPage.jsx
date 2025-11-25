import { Container, Row } from 'react-bootstrap';
import ChannelsNav from './ChannelsNav.jsx';
import MessageBox from './MessageBox.jsx';

const Chat = () => (
  <Container className="h-100 my-4 overflow-hidden rounded shadow">
    <Row className="h-100 flex-md-row bg-white">
      <ChannelsNav />
      <MessageBox />
    </Row>
  </Container>
);

export default Chat;
