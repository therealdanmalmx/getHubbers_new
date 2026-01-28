"use client";
import { FC, ReactNode, createContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

type CountryContextType = {
  formattedCountry: string;
  country: string;
  countryCode: string;
  setCountryCode: (code: string) => void;
};

export const CountryContext = createContext<CountryContextType>({
  formattedCountry: "",
  country: "",
  countryCode: "",
  setCountryCode: () => {}
});

export const CountryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();

  const [formattedCountry, setFormattedCountry] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");

  console.log({formattedCountry})

  const getUserCountry = async () => {
    try {
      const storedCountryCode = localStorage.getItem("country_code");

      if (storedCountryCode) {
        setCountryCode(storedCountryCode);
        return;
      }

      const response = await fetch(`https://api.ipinfo.io/lite/me?token=${import.meta.env.VITE_IP_INFO_TOKEN}`);
      const data = await response.json();

      const newCountryCode = data.country_code.toLowerCase();
      setCountry(data.country);
      setCountryCode(newCountryCode);

    } catch (error) {
      console.error("Error detecting country:", error);
      return null;
    }
  };
  console.log({country})

  const getCountry = () => {
    switch (countryCode) {
      case "se":
        setFormattedCountry(t("sweden"));
      break;
      case "pt":
        setFormattedCountry(t("portugal"));
      break;
      case "gb":
        setFormattedCountry(t("united kingdom"));
      break;
      case "es":
        setFormattedCountry(t("spain"));
      break;
      case "fr":
        setFormattedCountry(t("france"));
      break;
      case "nl":
        setFormattedCountry(t("netherlands"));
      break;
      case "de":
        setFormattedCountry(t("germany"));
      break;
      default:
        setFormattedCountry(t(country));
      break;
    }
  };

  useEffect(() => {
    getUserCountry();
  }, [country]);

  useEffect(() => {
    getCountry();
    setCountryCode(countryCode);
  }, [countryCode]);

  return (
    <CountryContext.Provider value={{ formattedCountry, country, countryCode, setCountryCode }}>
      {children}
    </CountryContext.Provider>
  );
};
