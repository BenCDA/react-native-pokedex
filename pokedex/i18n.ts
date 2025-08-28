import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      switchLang: 'Switch to French',
      back: 'Back',
    },
  },
  fr: {
    translation: {
      switchLang: 'Changer en anglais',
      back: 'Retour',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
