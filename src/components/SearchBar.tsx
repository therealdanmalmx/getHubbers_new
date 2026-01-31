import { useContext } from "react";
import { SearchContext } from "../Context/SearchContext";
import iconsData from "../data/iconsData";

const SearchBar = () => {
  const { selectedIcons, toggleChosenIcons } = useContext(SearchContext);

  return (
    <div>
      <div className="grid max-h-36 w-full grid-flow-col grid-rows-2 items-center justify-between bg-gray-500/80 lg:h-20 lg:grid-rows-1 lg:gap-0 lg:gap-x-[10px] px-4">
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
      <div>
        {selectedIcons
          .flatMap((icon) =>
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
