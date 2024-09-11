import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import iconsData from "../data/iconsData";

const SearchBar = () => {
  const { selectedIcons, toggleChosenIcons } = useContext(SearchContext);

  return (
    <div>
      <div className="grid h-20 w-full grid-flow-col grid-rows-2 items-center justify-center gap-x-[15px] bg-gray-500/80 md:h-16 md:grid-rows-1 md:justify-between md:gap-0 md:gap-x-[10px] md:px-4">
        {iconsData.map((icon) => {
          let isSelected = selectedIcons.includes(icon.value);
          const iconColor =
            `devicon-${icon.name}-plain` +
            (isSelected ? " text-slate-950" : " text-white") +
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
                    title={icon.name}
                    onClick={() => toggleChosenIcons(icon.value)}
                  ></i>
                )}
              </label>
            </div>
          );
        })}
      </div>
      <div className="mt-2 h-6 text-center">
        {selectedIcons
          .flatMap((icon) =>
            icon === ".net"
              ? ".NET"
              : icon === ".net core"
                ? ".NET Core"
                : icon === "php"
                  ? "PHP"
                  : icon === "javascript"
                    ? "JavaScript"
                    : icon === "typescript"
                      ? "TypeScript"
                      : icon.charAt(0).toUpperCase() + icon.slice(1),
          )
          .join(", ")}
      </div>
    </div>
  );
};

export default SearchBar;
