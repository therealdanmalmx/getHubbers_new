"use client";
import { FC, ReactNode, createContext, useState } from "react";

type SearchContextType = {
  selectedIcons: string[];
  setSelectedIcons: (value: string[]) => void;
  toggleChosenIcons: (icon: string) => void;
  getSearchText: (e: React.MouseEvent<HTMLButtonElement>) => void;
  setSearchText: (text: string) => void;
};

export const SearchContext = createContext<SearchContextType>({
  selectedIcons: [],
  setSelectedIcons: () => {},
  toggleChosenIcons: () => {},
  getSearchText: () => {},
  setSearchText: () => {},
});

export const SearchProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");

  console.log({ selectedIcons });

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
    let textSearch = (
      (e.target as HTMLButtonElement).previousElementSibling as HTMLInputElement
    )?.value.trim();
    if (textSearch) {
      setSearchText(textSearch);
      getHubberProfiles(textSearch);
      setTimeout(() => {
        (
          (e.target as HTMLButtonElement)
            .previousElementSibling as HTMLInputElement
        ).value = "";
      }, 100);
    }
  };

  // const getHubberProfiles = (textSearch: string) => {
  //   console.log({ textSearch });
  //   console.log({ selectedIcons });

  // };

  const getHubberProfiles = async (searchText: string[], city: string) => {
    if (city || city === "") {
      // const res = await axios.get(`https://api.github.com/search/users?q=language:${langList && frameList ? `${langList}+${frameList}` : langList ? `${langList}` : frameList ? `${frameList}` : `${langList}+${frameList}`}+location:${region ? region : 'sweden'}&client_id=${process.env.REACT_APP_GH_CID}&client_secret=${process.env.REACT_APP_GH_CSC}`)
      const res = await axios.get(
        `https://api.github.com/search/users?q=language:${codeList ?? codeList}+location:${region ? region : countryName}&client_id=${process.env.REACT_APP_GH_CID}&client_secret=${process.env.REACT_APP_GH_CSC}`,
      );
      if (res.data.items < 1) {
        showAlert("Inga profiler hittades baserat på dina val");
      } else {
        setProfiles(res.data.items);
      }
    }
  };

  const getProfile = async (login) => {
    const res = await axios.get(
      `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GH_CID}&client_secret=${process.env.REACT_APP_GH_CSC}`,
    );
    setProfiler(res.data);
  };

  return (
    <SearchContext.Provider
      value={{
        selectedIcons,
        setSelectedIcons,
        toggleChosenIcons,
        getSearchText,
        setSearchText,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
