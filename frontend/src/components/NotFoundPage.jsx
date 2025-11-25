import { Card, Image } from 'react-bootstrap';
import notFoundImg from '../assets/404pageNotFound.svg';

const NotFoundPage = () => (
  <Card bsPrefix="text-center">
    <Image alt="Страница не найдена" className="h-25" fluid src={notFoundImg} />
    <Card.Title as="h1" bsPrefix="text-muted" className="h4">Страница не найдена</Card.Title>
    <Card.Text bsPrefix="text-muted">
      Но вы можете перейти
      {' '}
      <Card.Link href="/">на главную страницу</Card.Link>
    </Card.Text>
  </Card>
);

export default NotFoundPage;
