import { Card, Image } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import notFoundImg from '../assets/404pageNotFound.svg';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <Card bsPrefix="text-center">
      <Image alt={t('notFoundPage.title')} className="h-25" fluid src={notFoundImg} />
      <Card.Title as="h1" bsPrefix="text-muted" className="h4">{t('notFoundPage.title')}</Card.Title>
      <Card.Text bsPrefix="text-muted">
        {t('notFoundPage.redirectMessage')}
        {' '}
        <Card.Link href="/">{t('notFoundPage.mainPageLink')}</Card.Link>
      </Card.Text>
    </Card>
  );
};

export default NotFoundPage;
