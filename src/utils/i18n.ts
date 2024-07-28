import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/en.json";
import se from "./locales/se/se.json";
import pt from "./locales/pt/pt.json";

const resources = {
  en: {
    translation: en,
  },
  se: {
    translation: se,
  },
  pt: {
    translation: pt,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
