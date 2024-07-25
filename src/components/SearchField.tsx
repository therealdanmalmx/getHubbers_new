import React, { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";

const SearchField = () => {
  const { getSearchText } = useContext(SearchContext);

  return (
    <div className="flex h-dvh items-center justify-center overflow-hidden">
      <input
        type="text"
        placeholder="search"
        className="border-2 border-gray-500 p-4"
      />
      <button onClick={getSearchText}>Search</button>
    </div>
  );
};

export default SearchField;
