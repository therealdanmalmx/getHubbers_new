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
  const { getHubberProfiles } = useContext(FetchContext);

  const navigate = useNavigate();
  const { setShowAlert, setAlertText } = useContext(AlertContext);
  const { formattedCountry, country } = useContext(CountryContext);
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
  const countryCode = localStorage.getItem("country_code");

  useEffect(() => {
    if (cityCache.has(countryCode!)) {
      setCityList(cityCache.get(countryCode!)!);
    } else {
      import( /* @vite-ignore */ `../utils/cities/${countryCode}`)
        .then((module) => {
          cityCache.set(countryCode!, module.default);
          setCityList(module.default);
        })
        .catch((error) => {
          console.error("Error loading cities:", error);
          setCityList([]);
        });
    }
  }, [countryCode]);

  const getSearchCity = async (e: React.MouseEvent<HTMLButtonElement>) => {

    if (selectedIcons.length === 0) {
      setAlertText(t("showAlertCode"));
      setShowAlert(true);
    } else {
      let searchCity = (
        (e.target as HTMLButtonElement)
          .previousElementSibling as HTMLInputElement
      )?.value.trim();

      if (searchCity.length) {
        if (cityList && new Set(cityList).has(searchCity)) {
          setSearchText(searchCity);
          const result: any = await getHubberProfiles(selectedIcons, searchCity);
          if (!result)
          {
            setAlertText(t("noprofilesfound"));
            setShowAlert(true);
          } else {
            navigate("/profiles");
          }

        } else {
          setAlertText(
            t("showAlertCity", {
              searchCity,
              formattedCountry,
            }),
          );
          setShowAlert(true);
        }
      } else {
          setSearchText(searchCity);
          const result: any = await getHubberProfiles(selectedIcons, searchCity);
          if (!result)
          {
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
