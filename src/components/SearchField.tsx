import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import { useTranslation } from "react-i18next";
import { CountryContext } from "../Context/CountryContext";

const SearchField = () => {
  const { getSearchCity } = useContext(SearchContext);
  const { formattedCountry } = useContext(CountryContext);

  const { t } = useTranslation();

  return (
    <div>
      <h1 className="m-4 mx-2 w-full text-balance text-center text-2xl xl:w-[500px]">
        {t("searchFieldHeading", {
          formattedCountry,
        })}
      </h1>
      <div className="mx-4 flex items-center justify-center md:mx-0">
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
