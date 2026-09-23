import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { LuCrosshair } from "react-icons/lu";
import { CountryContext } from "../Context/CountryContext";
import { SearchContext } from "../Context/SearchContext";

const SearchField = () => {
  const { getSearchCity } = useContext(SearchContext);
  const { formattedCountry } = useContext(CountryContext);
  const { t } = useTranslation();

  return (
    <div
      className={`h-fullz-_300px)] mx-auto flex flex-col items-center justify-center xl:h-[calc(100%_-_200px)] small-screen:justify-start small-screen:pt-8 ${window.innerHeight === 600 && "pt-12"}}`}
    >
      <h1 className="text-nordic_salmon bg-nordic_shade my-4 flex w-max items-center gap-2 text-balance rounded-full px-4 py-2 text-center text-lg">
        <LuCrosshair />
        {t("logoText")}
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
          className="border-nordic_salmon bg-nordic_salmon text-nordic border-2 border-l-0 p-4 font-bold"
        >
          {" "}
          {t("searchButton", {
            formattedCountry,
          })}
          <span className="mx-2 rounded bg-red-300 px-3 py-1 font-mono text-base font-semibold">
            ↵ Enter
          </span>
        </button>
      </div>
    </div>
  );
};

export default SearchField;
