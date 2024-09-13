import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";
import en from "./locales/en/en.json";
import pt from "./locales/pt/pt.json";
import se from "./locales/se/se.json";
import de from "./locales/de/de.json";
import fr from "./locales/fr/fr.json";

const country = localStorage.getItem("country");

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
  de: {
    translation: de,
  },
  fr: {
    translation: fr,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    lng: country || "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
