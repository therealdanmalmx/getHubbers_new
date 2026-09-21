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
      <div className="bg-nordic grid auto-rows-max grid-cols-5 items-center justify-items-center gap-2 lg:grid-flow-col lg:grid-cols-none">
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
              className="bg-nordic_shade flex w-max items-center justify-center p-1"
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
      <div className="text-nordic_salmon h-2 pt-2 text-center">
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
