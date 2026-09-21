import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { CountryContext } from "../Context/CountryContext";
import { SearchContext } from "../Context/SearchContext";

const SearchField = () => {
  const { getSearchCity } = useContext(SearchContext);
  const { formattedCountry } = useContext(CountryContext);
  const { t } = useTranslation();

  return (
    <div
      className={`mx-auto flex flex-col items-center justify-start space-y-4 pt-20 lg:pt-32 small-screen:justify-start small-screen:pt-8 ${window.innerHeight === 600 && "pt-12"}}`}
    >
      <h1 className="text-nordic_salmon w-full text-balance text-center text-lg xl:w-[500px]">
        {t("searchFieldHeading", {
          formattedCountry,
        })}
      </h1>
      <div className="flex w-11/12 items-center justify-center lg:w-full">
        <input
          type="text"
          placeholder={t("searchFieldPlaceholder", {
            formattedCountry,
          })}
          className="bg-nordic_shade text-nordic_salmon border-nordic_shade w-5/6 border-2 border-r-0 p-4 outline-none md:w-96"
        />
        <button
          onClick={getSearchCity}
          className="border-nordic_salmon bg-nordic_salmon text-nordic border-2 border-l-0 p-4"
        >
          {" "}
          {/* Search */}
          {t("searchButton", {
            formattedCountry,
          })}
        </button>
      </div>
    </div>
  );
};

export default SearchField;
