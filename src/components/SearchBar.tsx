import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import iconsData from "../data/iconsData";

const SearchBar = () => {
  const { selectedIcons, toggleChosenIcons } = useContext(SearchContext);


  return (
    <div>
      <div className="grid grid-cols-5 lg:grid-cols-none lg:grid-flow-col auto-rows-max items-center justify-items-center bg-gray-500/80 gap-2 lg:gap-4 p-2 py-2">
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
      <div className="h-1 text-center">
        {selectedIcons
          .flatMap((icon) =>
            icon === "azuresqldatabase"
              ? "SQL" :
            icon === ".net"
              ? ".NET"
              : icon === ".net core"
                ? ".NET Core"
                : icon === "csharp"
                  ? "C#"
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
