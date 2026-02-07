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

export const CountryContext = createContext<CountryContextType>({
  formattedCountry: "",
  country: "",
  countryCode: "",
  setCountryCode: () => {},
  setCountry: () => {}
});

export const CountryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { t } = useTranslation();

  const [formattedCountry, setFormattedCountry] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [countryCode, setCountryCode] = useState<string>("");

  const getUserCountry = async () => {
    try {
      const storedCountryCode = localStorage.getItem("country_code");

      if (storedCountryCode) {
        setCountryCode(storedCountryCode);
        return;
      }

      // if(country) {
      //   setCountry(country)
      //   return;
      // }

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

  const getCountry = () => {
    switch (countryCode) {
      case "se":
          setCountry("Sweden")
          setFormattedCountry(t("sverige"));
        break;
        case "pt":
          setCountry("Portugal")
          setFormattedCountry(t("portugal"));
        break;
        case "gb":
          setCountry("United Kingdom")
          setFormattedCountry(t("united kingdom"));
        break;
        case "es":
          setCountry("Spain")
          setFormattedCountry(t("espanha"));
        break;
        case "fr":
          setCountry("France")
          setFormattedCountry(t("france"));
        break;
        case "nl":
          setCountry("Netherlands")
          setFormattedCountry(t("nederland"));
        break;
        case "de":
          setCountry("Germany")
          setFormattedCountry(t("deutschland"));
        break;
        case "it":
          setCountry("Italy")
          setFormattedCountry(t("italia"));
        break;
        case "no":
          setCountry("Norway")
          setFormattedCountry(t("norge"));
        break;
        case "dk":
          setCountry("Denmark")
          setFormattedCountry(t("danmark"));
        break;
        case "fi":
          setCountry("Finland")
          setFormattedCountry(t("suomi"));
        break;
        case "pl":
          setCountry("Poland")
          setFormattedCountry(t("polska"));
        break;
        case "ie":
          setCountry("Ireland")
          setFormattedCountry(t("ireland"));
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
    getCountry();
    if (countryCode) {
      i18n.changeLanguage(countryCode);
      localStorage.setItem("country_code", countryCode);
    }
  }, [countryCode]);

  return (
    <CountryContext.Provider value={{ formattedCountry, country, countryCode, setCountry, setCountryCode }}>
      {children}
    </CountryContext.Provider>
  );
};
