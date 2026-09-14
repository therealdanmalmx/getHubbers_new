"use client";

import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../utils/i18n";

type CountryContextType = {
  formattedCountry: string;
  country: string;
  countryCode: string;
  setCountryCode: (code: string) => void;
  setCountry: (code: string) => void;
};

const COUNTRIES = {
  se: { name: "Sweden", key: "sverige", lang: "sv" },
  pt: { name: "Portugal", key: "portugal", lang: "pt" },
  gb: { name: "United Kingdom", key: "united kingdom", lang: "en" },
  es: { name: "Spain", key: "espanha", lang: "es" },
  fr: { name: "France", key: "france", lang: "fr" },
  nl: { name: "Netherlands", key: "nederland", lang: "nl" },
  de: { name: "Germany", key: "deutschland", lang: "de" },
  it: { name: "Italy", key: "italia", lang: "it" },
  no: { name: "Norway", key: "norge", lang: "no" },
  dk: { name: "Denmark", key: "danmark", lang: "da" },
  fi: { name: "Finland", key: "suomi", lang: "fi" },
  pl: { name: "Poland", key: "polska", lang: "pl" },
  ie: { name: "Ireland", key: "ireland", lang: "en" },
} as const;

export const CountryContext = createContext<CountryContextType>({
  formattedCountry: "",
  country: "",
  countryCode: "",
  setCountryCode: () => {},
  setCountry: () => {},
});

export const CountryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();

  const [country, setCountry] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");

  const getUserCountry = async () => {
    try {
      const storedCountryCode = localStorage.getItem("country_code");

      if (storedCountryCode) {
        setCountryCode(storedCountryCode);
        return;
      }

      const response = await fetch(
        `https://api.ipinfo.io/lite/me?token=${import.meta.env.VITE_IP_INFO_TOKEN}`,
      );
      const data = await response.json();

      console.log("ipinfo:", data.country_code, data.country);

      const newCountryCode = data.country_code.toLowerCase();
      setCountryCode(newCountryCode);
    } catch (error) {
      console.error("Error detecting country:", error);
      return null;
    }
  };

  useEffect(() => {
    getUserCountry();
  }, []);

  const entry =
    COUNTRIES[countryCode as keyof typeof COUNTRIES] ?? COUNTRIES.gb;
  const formattedCountry = countryCode ? t(entry.key) : "";

  useEffect(() => {
    if (!countryCode) {
      return;
    }

    setCountry(entry.name);
    i18n.changeLanguage(entry.lang);
    const code = countryCode in COUNTRIES ? countryCode : "gb";
    localStorage.setItem("country_code", code);
  }, [countryCode]);
  return (
    <CountryContext.Provider
      value={{
        formattedCountry,
        country,
        countryCode,
        setCountry,
        setCountryCode,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
};
