import { useContext, useState } from "react";
import iconsData from "../data/iconsData";
import { SearchContext } from "../Context/SearchContext";

const SearchBar = () => {
  const { selectedIcons, toggleIcon } = useContext(SearchContext);

  return (
    <div className="fixed top-32 flex h-16 w-full flex-auto flex-wrap items-center justify-between bg-gray-500/80 px-4">
      {iconsData.map((icon) => {
        let isSelected = selectedIcons.includes(icon.value);
        const iconColor =
          `devicon-${icon.name}-plain` +
          (isSelected ? " text-green-500" : " text-white") +
          (icon.name === "express"
            ? " devicon-" + icon.name + "-original"
            : "") +
          " cursor-pointer text-2xl md:text-4xl";

        return (
          <div key={icon.id}>
            <label htmlFor={icon.value}>
              <input
                type="checkbox"
                value={icon.value}
                id={icon.value}
                className="appearance-none"
              />
              {icon.value && (
                <i
                  className={iconColor}
                  title={icon.value}
                  onClick={() => toggleIcon(icon.value)}
                ></i>
              )}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default SearchBar;
