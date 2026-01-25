"use client";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type CountryContextType = {
  formattedCountry: string;
  country: string;
};

export const CountryContext = createContext<CountryContextType>({
  formattedCountry: "",
  country: ""
});

export const CountryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();

  const [formattedCountry, setFormattedCountry] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const getUserCountry = async () => {
    try {
      const response = await fetch(`https://api.ipinfo.io/lite/me?token=${import.meta.env.VITE_IP_INFO_TOKEN}`);
      const data = await response.json();
      localStorage.setItem("country_code", data.country_code.toLowerCase());
      setCountry(data.country);
    } catch (error) {
      console.error("Error detecting country:", error);
      return null;
    }
  };

  const getCountry = () => {
    switch (localStorage.getItem("country_code")) {
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
    if (localStorage.getItem("country_code")) {
      getCountry();
    }
  }, [localStorage.getItem("country_code")]);

  return (
    <CountryContext.Provider value={{ formattedCountry, country }}>
      {children}
    </CountryContext.Provider>
  );
};
