import { t } from "i18next";
import { useContext, useEffect, useState } from "react";
import { SearchContext } from "../Context/SearchContext";
import iconsData from "../data/iconsData";

const SearchBar = () => {
  const { selectedIcons, toggleChosenIcons } = useContext(SearchContext);
  const [showHelperText, setShowHelperText] = useState(false);

  useEffect(() => {
    selectedIcons.length ? setShowHelperText(true) : setShowHelperText(false);
  }, [selectedIcons]);

  return (
    <div>
      <div className="grid w-full auto-rows-max grid-cols-5 justify-items-stretch gap-2 bg-nordic md:grid-flow-col md:grid-rows-3 lg:grid-flow-col lg:grid-cols-none lg:grid-rows-2 lg:items-start xl:grid-rows-none">
        {iconsData.map((icon) => {
          let isSelected = selectedIcons.includes(icon.value);
          const iconColor =
            `devicon-${icon.name}-plain` +
            (isSelected ? " text-nordic_salmon" : " text-white") +
            (icon.name === "express"
              ? " devicon-" + icon.name + "-original"
              : "") +
            " cursor-pointer";

          return (
            <div
              className="flex min-w-max items-center justify-center bg-nordic_shade p-1"
              key={icon.id}
            >
              <input
                type="checkbox"
                value={icon.value}
                id={icon.value}
                className="appearance-none"
              />
              {icon.value && (
                <i
                  className={`${iconColor} flex items-center`}
                  title={icon.name}
                  onClick={() => {
                    toggleChosenIcons(icon.value);
                  }}
                >
                  <span className="pl-1 text-xs capitalize">{icon.name}</span>
                </i>
              )}
            </div>
          );
        })}
      </div>
      <div className="h-2 pt-2 text-center text-nordic_salmon">
        {showHelperText && (
          <p className="text-slate-500">{t("chosenLanguages")}:</p>
        )}
        {selectedIcons
          .flatMap((icon) =>
            icon === "azuresqldatabase"
              ? "SQL"
              : icon === ".net"
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
