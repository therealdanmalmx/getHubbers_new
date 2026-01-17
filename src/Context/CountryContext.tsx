"use client";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type CountryContextType = {
  formattedCountry: string;
  country: string
};

export const CountryContext = createContext<CountryContextType>({
  formattedCountry: "",
  country: ""
});

export const CountryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();

  const [country, setCountry] = useState<string>("");
  const [formattedCountry, setFormattedCountry] = useState<string>("");

  const getUserCountry = async () => {
    try {
      const response = await fetch(`https://api.ipinfo.io/lite/me?token=${import.meta.env.VITE_IP_INFO_TOKEN}`);
      const data = await response.json();

      console.log(data.country.toLowerCase());
      localStorage.setItem("country", data.country_code);
      setCountry(data.country_code.toLowerCase());
    } catch (error) {
      console.error("Error detecting country:", error);
      return null;
    }
  };
  console.log({country})

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
    <CountryContext.Provider value={{ formattedCountry, country }}>
      {children}
    </CountryContext.Provider>
  );
};
