import { useContext, useState } from "react";
import iconsData from "../data/iconsData";
import { SearchContext } from "../Context/SearchContext";

const SearchBar = () => {
  const { selectedIcons, toggleChosenIcons } = useContext(SearchContext);

  // console.log({ selectedIcons });
  return (
    <div className="fixed top-32 grid h-20 w-full grid-flow-col grid-rows-2 items-center justify-center gap-[10px] bg-gray-500/80 px-4 md:h-16 md:grid-rows-1 md:justify-between md:gap-0">
      {iconsData.map((icon) => {
        let isSelected = selectedIcons.includes(icon.value);
        const iconColor =
          `devicon-${icon.name}-plain` +
          (isSelected ? " text-yellow-400" : " text-white") +
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
                  onClick={() => toggleChosenIcons(icon.value)}
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
