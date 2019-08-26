import { i18n } from '../i18n';

export const changeLangFunc = () => {
  const nextLang = i18n.language === 'en' ? 'fa' : 'en';
  i18n.changeLanguage(nextLang);
  return nextLang;
};
