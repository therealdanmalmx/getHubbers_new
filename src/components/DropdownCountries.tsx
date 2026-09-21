import { t } from "i18next";
import { useContext, useState } from "react";
import { CircleFlag } from "react-circle-flags";
import { IoChevronDownSharp, IoChevronUpOutline } from "react-icons/io5";
import { CountryContext } from "../Context/CountryContext";

const DropdownCountries = () => {
  const countryList = [
    { name: "Deutschland", code: "de" },
    { name: "Danmark", code: "dk" },
    { name: "Espanha", code: "es" },
    { name: "Ireland", code: "ie" },
    { name: "Suomi", code: "fi" },
    { name: "France", code: "fr" },
    { name: "United Kingdom", code: "gb" },
    { name: "Italia", code: "it" },
    { name: "Norge", code: "no" },
    { name: "Nederland", code: "nl" },
    { name: "Polska", code: "pl" },
    { name: "Portugal", code: "pt" },
    { name: "Sverige", code: "se" },
  ];

  const { setCountryCode, setCountry } = useContext(CountryContext);
  const getInitialCountry = () => {
    const savedCode = localStorage.getItem("country_code");
    return (
      countryList.find((c) => c.code === savedCode) ??
      countryList.find((c) => c.code === "gb")!
    );
  };

  const [selected, setSelected] = useState<{ name: string; code: string }>(
    getInitialCountry(),
  );

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-52">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-nordic flex w-full items-center justify-between p-4"
      >
        <div className={"flex w-full items-center justify-between text-white"}>
          <span className="text-nordic_salmon flex items-center gap-2">
            <CircleFlag countryCode={selected.code} className="size-5" />
            {/* <Flag code={selected.code} className="size-8" /> */}
            {t(selected.name.toLowerCase())}
          </span>
          <span>
            {isOpen ? <IoChevronUpOutline /> : <IoChevronDownSharp />}
          </span>
        </div>
      </button>

      {isOpen && (
        <div className="bg-nordic absolute bottom-full z-50 mb-2 max-h-60 w-full overflow-y-auto">
          {[...countryList]
            .sort((a, b) =>
              t(a.name.toLowerCase()).localeCompare(t(b.name.toLowerCase())),
            )
            .map((country) => (
              <div
                key={country.code}
                onClick={() => {
                  setSelected(country);
                  setCountry(country.name);
                  setCountryCode(country.code);
                  localStorage.setItem("country_code", country.code);
                  setIsOpen(false);
                }}
                className={`hover:bg-nordic_asccent flex cursor-pointer items-center gap-2 p-4 text-white ${country.name === selected.name && "bg-nordic_shade"}`}
              >
                <CircleFlag countryCode={country.code} className="size-5" />
                {/* <Flag code={country.code} className="size-8" /> */}
                {t(country.name.toLowerCase())}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DropdownCountries;
