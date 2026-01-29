import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import { useTranslation } from "react-i18next";
import { CountryContext } from "../Context/CountryContext";

const SearchField = () => {
  const { getSearchCity } = useContext(SearchContext);
  const { formattedCountry } = useContext(CountryContext);

  const { t } = useTranslation();

  return (
    <div className="flex flex-col justify-start mt-8 lg:mt-24 h-[50vh] space-y-4 items-center mx-auto">
      <h1 className="w-full text-balance text-center text-lg lg:text-2xl xl:w-[500px]">
        {t("searchFieldHeading", {
          formattedCountry,
        })}
      </h1>
      <div className="flex items-center justify-center w-11/12 lg:w-full">
        <input
          type="text"
          placeholder={t("searchFieldPlaceholder", {
          formattedCountry,
        })}
          className="w-5/6 border-2 border-r-0 border-gray-500 p-4 outline-none md:w-96"
        />
        <button
          onClick={getSearchCity}
          className="border-2 border-l-0 border-black bg-black p-4 text-white"
        >
          {t("searchButton", {
          formattedCountry,
        })}
        </button>
      </div>
    </div>
  );
};

export default SearchField;
