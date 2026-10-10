import { useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { LuCrosshair } from "react-icons/lu";
import { CountryContext } from "../Context/CountryContext";
import { SearchContext } from "../Context/SearchContext";

const SearchField = () => {
  const { getSearchCity } = useContext(SearchContext);
  const { formattedCountry } = useContext(CountryContext);
  const { t } = useTranslation();
  const [cityInput, setCityInput] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // stops the browser from reloading the page
    getSearchCity(cityInput);
  };

  return (
    <div
      className={`mx-auto flex h-[calc(100%_-_450px)] flex-col items-center justify-center sm:h-[calc(100%_-_300px)] small-screen:justify-between small-screen:pt-8 ${window.innerHeight === 600 && "pt-12"}`}
    >
      <h1 className="my-4 flex w-max items-center gap-2 text-balance rounded-full bg-nordic_shade px-4 py-2 text-center text-lg text-nordic_salmon">
        <LuCrosshair />
        {t("logoText")}
      </h1>
      <form
        onSubmit={handleSubmit}
        className="flex w-11/12 items-center justify-center gap-2 lg:w-full"
      >
        <input
          value={cityInput}
          onChange={(e) =>
            setCityInput(e.target.value.toLocaleLowerCase().trim())
          }
          className="w-5/6 border-nordic_shade bg-nordic_shade p-4 text-nordic_salmon outline-none md:w-96 lg:p-5"
          placeholder={t("searchFieldPlaceholder", {
            formattedCountry,
          })}
        />
        <button
          className="border-nordic_salmon bg-nordic_salmon p-4 font-bold text-nordic"
          type="submit"
        >
          {t("search")}
          <span className="mx-2 hidden rounded bg-red-300 px-3 py-1 font-mono text-base font-semibold lg:inline-flex">
            ↵ Enter
          </span>
        </button>
      </form>
      {/* <div className="flex w-11/12 items-center justify-center gap-2 lg:w-full">
        <input
          type="text"
          placeholder={t("searchFieldPlaceholder", {
            formattedCountry,
          })}
          className="w-5/6 border-nordic_shade bg-nordic_shade p-4 text-nordic_salmon outline-none md:w-96 lg:p-5"
        />
        <button
          onClick={getSearchCity}
          className="border-nordic_salmon bg-nordic_salmon p-4 font-bold text-nordic"
        >
          {" "}
          {t("searchButton", {
            formattedCountry,
          })}
          <span className="mx-2 hidden rounded bg-red-300 px-3 py-1 font-mono text-base font-semibold lg:inline-flex">
            ↵ Enter
          </span>
        </button>
      </div> */}
    </div>
  );
};

export default SearchField;
