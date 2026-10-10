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
  getSearchCity: (input: string) => void;
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
        cityList.forEach((c) => console.log(c));
      } else {
        console.error("Error loading cities:", countryCode);
        setCityList([]);
      }
    }
  }, [countryCode]);

  const getSearchCity = async (input: string) => {
    if (selectedIcons.length === 0) {
      toast.error(t("showAlertCode"));
      return;
    }

    const searchCity = input.trim();
    const matchedCity = cityList?.find(
      (c) =>
        c.toLocaleLowerCase().trim() === searchCity.toLocaleLowerCase().trim(),
    );

    if (searchCity && !matchedCity) {
      toast.error(t("showAlertCity", { searchCity, formattedCountry }));
      setSearchText("");
      return;
    }

    // Empty input means search the whole country
    const location = matchedCity ?? country;
    if (matchedCity) {
      setSearchText(matchedCity);
    }

    try {
      await getHubberProfiles(selectedIcons, location);
      navigate("/profiles");
    } catch (err) {
      console.error(err);
      toast.error(t("searchFailed")); // add this key to your translations
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
