"use client";
import { FC, ReactNode, createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { AlertContext } from "./AlertContext";
import { CountryContext } from "./CountryContext";

type SearchContextType = {
  selectedIcons: string[];
  setSelectedIcons: (value: string[]) => void;
  toggleChosenIcons: (icon: string) => void;
  getSearchCity: (e: React.MouseEvent<HTMLButtonElement>) => void;
  searchText: string;
};

export const SearchContext = createContext<SearchContextType>({
  selectedIcons: [],
  setSelectedIcons: () => {},
  toggleChosenIcons: () => {},
  getSearchCity: () => {},
  searchText: "",
});

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setShowAlert, setAlertText } = useContext(AlertContext);
  const { formattedCountry } = useContext(CountryContext);
  const { t } = useTranslation();

  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const toggleChosenIcons = (icon: string) => {
    setSelectedIcons((prevIcons) => {
      if (prevIcons.includes(icon)) {
        return prevIcons.filter((i) => i !== icon);
      } else {
        return [...prevIcons, icon];
      }
    });
  };

  const getSearchCity = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedIcons.length === 0) {
      setAlertText(t("showAlertCode"));
      setShowAlert(true);
    } else {
      let textSearch = (
        (e.target as HTMLButtonElement)
          .previousElementSibling as HTMLInputElement
      )?.value.trim();

      if (textSearch.length) {
        setSearchText(textSearch);
      } else {
        setSearchText(formattedCountry);
      }
    }
  };

  return (
    <SearchContext.Provider
      value={{
        selectedIcons,
        setSelectedIcons,
        toggleChosenIcons,
        getSearchCity,
        searchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
