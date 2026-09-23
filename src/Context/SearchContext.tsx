"use client";
import {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
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
  const { formattedCountry, country } = useContext(CountryContext);
  const { t } = useTranslation();

  const [selectedIcons, setSelectedIcons] = useState<string[]>([]);
  const [searchText, setSearchText] = useState<string>("");
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
      const modules = import.meta.glob("../utils/cities/*.ts", { eager: true });
      const module = modules[`../utils/cities/${countryCode}.ts`] as any;

      if (module) {
        cityCache.set(countryCode!, module.default);
        setCityList(module.default);
      } else {
        console.error("Error loading cities:", countryCode);
        setCityList([]);
      }
    }
  }, [countryCode]);

  const getSearchCity = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (selectedIcons.length === 0) {
      toast.error(t("showAlertCode"));
    } else {
      let searchCity = (
        (e.target as HTMLButtonElement)
          .previousElementSibling as HTMLInputElement
      )?.value.trim();

      if (searchCity) {
        if (cityList && new Set(cityList).has(searchCity)) {
          setSearchText(searchCity);
          const result: any = await getHubberProfiles(
            selectedIcons,
            searchCity,
          );
          if (!result) {
            return;
          } else {
            navigate("/profiles");
          }
        } else {
          toast.error(
            t("showAlertCity", {
              searchCity,
              formattedCountry,
            }),
          );
        }
      } else {
        const result: any = await getHubberProfiles(selectedIcons, country);
        if (!result) {
          return;
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
