"use client";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { AlertContext } from "./AlertContext";
import { CountryContext } from "./CountryContext";
import { FetchContext } from "./FetchContext";

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
  const { getHubberProfiles, profiles } = useContext(FetchContext);

  const navigate = useNavigate();
  const { setShowAlert, setAlertText } = useContext(AlertContext);
  const { formattedCountry } = useContext(CountryContext);
  const { t } = useTranslation();

  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [cityList, setCityList] = useState<string[]>([]);

  const toggleChosenIcons = (icon: string) => {
    setSelectedIcons((prevIcons) => {
      if (prevIcons.includes(icon)) {
        return prevIcons.filter((i) => i !== icon);
      } else {
        return [...prevIcons, icon];
      }
    });
  };

  const cityCache = new Map<string, string[]>();
  const country = localStorage.getItem("country");

  useEffect(() => {
    if (cityCache.has(country!)) {
      setCityList(cityCache.get(country!)!);
    } else {
      import( /* @vite-ignore */ `../utils/cities/${country}`)
        .then((module) => {
          cityCache.set(country!, module.default);
          setCityList(module.default);
        })
        .catch((error) => {
          console.error("Error loading cities:", error);
          setCityList([]);
        });
    }
  }, [country]);

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
        if (cityList && new Set(cityList).has(textSearch)) {
          setSearchText(textSearch);
          getHubberProfiles(selectedIcons, textSearch);
          console.log("profile", profiles.items.length);
          if (profiles.items.length === 0) {
            setAlertText(t("noprofilesfound"));
            setShowAlert(true);

          } else {
            navigate("/profiles");
          }
        } else {
          setAlertText(
            t("showAlertCity", {
              textSearch,
              formattedCountry,
            }),
          );
          setShowAlert(true);
        }
      } else {
        setSearchText(formattedCountry);
        getHubberProfiles(selectedIcons, searchText);
          if (profiles.items.length === 0) {
            setAlertText(t("noprofilesfound"));
            setShowAlert(true);

          } else {
            navigate("/profiles");
          }
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
