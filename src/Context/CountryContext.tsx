"use client";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type CountryContextType = {
  formattedCountry: string;
};

export const CountryContext = createContext<CountryContextType>({
  formattedCountry: "",
});

export const CountryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [country, setCountry] = useState<string>("");
  const [formattedCountry, setFormattedCountry] = useState<string>("");
  const { t } = useTranslation();

  const getUserCountry = async () => {
    try {
      const response = await fetch("https://ipapi.co/json/");
      const data = await response.json();
      setCountry(data.country.toLowerCase());
    } catch (error) {
      console.error("Error detecting country:", error);
      return null;
    }
  };

  const getCountry = () => {
    switch (country) {
      case "se":
        setFormattedCountry(t("sweden"));
        break;
      case "pt":
        setFormattedCountry(t("portugal"));
        break;
      case "en":
        setFormattedCountry(t("united kingdom"));
        break;
      case "fr":
        setFormattedCountry(t("france"));
        break;
      case "de":
        setFormattedCountry(t("germany"));
        break;
      default:
        setFormattedCountry(t("united kingdom"));
        break;
    }
  };

  useEffect(() => {
    getUserCountry();
  }, []);

  useEffect(() => {
    if (country) {
      getCountry();
    }
  }, [country]);

  return (
    <CountryContext.Provider value={{ formattedCountry }}>
      {children}
    </CountryContext.Provider>
  );
};
