"use client";
import { count } from "console";
import { use } from "i18next";
import { FC, ReactNode, createContext, useEffect, useState } from "react";

type CountryContextType = {
  formattedCountry: string;
};

export const CountryContext = createContext<CountryContextType>({
  formattedCountry: "",
});

export const CountryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [country, setCountry] = useState<string>("");
  const [formattedCountry, setFormattedCountry] = useState<string>("");

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
        setFormattedCountry("Sweden");
        break;
      case "pt":
        setFormattedCountry("Portugal");
        break;
      case "en":
        setFormattedCountry("United Kingdom");
        break;
      case "fr":
        setFormattedCountry("France");
        break;
      case "de":
        setFormattedCountry("Germany");
        break;
      default:
        setFormattedCountry("United Kingdom");
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
