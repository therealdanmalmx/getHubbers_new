import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import { useTranslation } from "react-i18next";

const SearchField = () => {
  const { getSearchText } = useContext(SearchContext);
  const { t } = useTranslation();

  return (
    <div>
      <h1 className="m-4 mx-2 text-balance text-center text-2xl">
        {t("searchFieldHeading")}
      </h1>
      <div className="mx-4 flex items-center justify-center md:mx-0">
        <input
          type="text"
          placeholder={t("searchFieldPlaceholder")}
          className="w-5/6 border-2 border-r-0 border-gray-500 p-4 outline-none md:w-96"
        />
        <button
          onClick={getSearchText}
          className="border-2 border-l-0 border-black bg-black p-4 text-white"
        >
          {t("searchButton")}
        </button>
      </div>
    </div>
  );
};

export default SearchField;
