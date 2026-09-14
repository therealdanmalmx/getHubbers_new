import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import de from "./locales/de/de.json";
import dk from "./locales/dk/dk.json";
import es from "./locales/es/es.json";
import fi from "./locales/fi/fi.json";
import fr from "./locales/fr/fr.json";
import gb from "./locales/gb/gb.json";
import ie from "./locales/ie/ie.json";
import it from "./locales/it/it.json";
import nl from "./locales/nl/nl.json";
import no from "./locales/no/no.json";
import pl from "./locales/pl/pl.json";
import pt from "./locales/pt/pt.json";
import se from "./locales/se/se.json";

// const countryCode = localStorage.getItem("country_code");

export const resources = {
  en: {
    translation: gb,
  },
  sv: {
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
  es: {
    translation: es,
  },
  nl: {
    translation: nl,
  },
  it: {
    translation: it,
  },
  no: {
    translation: no,
  },
  da: {
    translation: dk,
  },
  fi: {
    translation: fi,
  },
  pl: {
    translation: pl,
  },
  ie: {
    translation: ie,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "en",
    // lng: countryCode!,
    supportedLngs: [
      "en",
      "sv",
      "pt",
      "de",
      "fr",
      "es",
      "nl",
      "it",
      "no",
      "da",
      "fi",
      "pl",
    ],
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
