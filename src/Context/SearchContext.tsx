"use client";
import { FC, ReactNode, createContext, useState } from "react";

type SearchContextType = {
  selectedIcons: string[];
  setSelectedIcons: (value: string[]) => void;
  toggleIcon: (icon: string) => void;
  getSearchText: (e: any) => void;
  setSearchText: (text: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  selectedIcons: [],
  setSelectedIcons: () => {},
  toggleIcon: () => {},
  getSearchText: () => {},
  setSearchText: () => {},
});

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  const toggleIcon = (icon: string) => {
    setSelectedIcons((prevIcons) => {
      if (prevIcons.includes(icon)) {
        return prevIcons.filter((i) => i !== icon);
      } else {
        return [...prevIcons, icon];
      }
    });
  };

  const getSearchText = (e: React.MouseEvent<HTMLButtonElement>) => {
    const textSearch = (
      (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement
    )?.value;
    if (textSearch) {
      setSearchText(textSearch);
      console.log({ searchText });
    }
  };

  return (
    <SearchContext.Provider
      value={{
        selectedIcons,
        setSelectedIcons,
        toggleIcon,
        getSearchText,
        setSearchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
