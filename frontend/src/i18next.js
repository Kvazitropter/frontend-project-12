import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './locales/ru.js';

const i18nextInstance = i18next.createInstance();
await i18next
  .use(initReactI18next)
  .init({
    resources: { ru },
    lng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    debug: true,
  });

export default i18nextInstance;
