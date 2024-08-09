"use client";
import { FC, ReactNode, createContext, useContext, useState } from "react";
import { AlertContext } from "./AlertContext";

type SearchContextType = {
  selectedIcons: string[];
  setSelectedIcons: (value: string[]) => void;
  toggleChosenIcons: (icon: string) => void;
  getSearchText: (e: React.MouseEvent<HTMLButtonElement>) => void;
  searchText: string;
};

export const SearchContext = createContext<SearchContextType>({
  selectedIcons: [],
  setSelectedIcons: () => {},
  toggleChosenIcons: () => {},
  getSearchText: () => {},
  searchText: "",
});

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { setShowAlert, setAlertText } = useContext(AlertContext);

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

  const getSearchText = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedIcons.length === 0) {
      setAlertText("Please select at minimum of one icon first");
      setShowAlert(true);
    } else {
      let textSearch = (
        (e.target as HTMLButtonElement)
          .previousElementSibling as HTMLInputElement
      )?.value.trim();
      if (textSearch) {
        setSearchText(textSearch);
        setTimeout(() => {
          (
            (e.target as HTMLButtonElement)
              .previousElementSibling as HTMLInputElement
          ).value = "";
        }, 100);
      }
    }
  };

  return (
    <SearchContext.Provider
      value={{
        selectedIcons,
        setSelectedIcons,
        toggleChosenIcons,
        getSearchText,
        searchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
