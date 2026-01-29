import { t } from 'i18next';
import { useContext, useState } from 'react';
import { IoChevronDownSharp, IoChevronUpOutline } from "react-icons/io5";
import Flag from 'react-world-flags';
import { CountryContext } from '../Context/CountryContext';


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

    const {setCountryCode, setCountry, country } = useContext(CountryContext)
    const getInitialCountry = () => {
        const savedCode = localStorage.getItem("country_code");
        return countryList.find(c => c.code.toLowerCase() === savedCode) || countryList[0];
    };

    const [selected, setSelected] = useState<{ name: string; code: string }>(getInitialCountry());

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative w-56">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 border-2 border-slate-400 flex items-center justify-between bg-white"
            >
            <div className={"flex items-center justify-between lg:justify-start lg:gap-2 gap-4"}>
                <Flag code={selected.code} className="size-8" />
                {t(selected.name.toLowerCase())}
                {isOpen ? <IoChevronUpOutline /> : <IoChevronDownSharp />}
            </div>
            </button>

            {isOpen && (
            <div className="absolute bottom-full mb-2 w-full border-2 border-slate-400 bg-white z-50 max-h-60 overflow-y-auto">
                {[...countryList].sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase())).map((country) => (
                <div
                    key={country.code}
                    onClick={() => {
                        setSelected(country);
                        setCountry(country.name);
                        setCountryCode(country.code.toLowerCase())
                        localStorage.setItem("country_code", country.code.toLowerCase());
                        setIsOpen(false);
                        window.location.reload();
                    }}
                    className={`p-4 flex items-center gap-2 hover:bg-slate-100 cursor-pointer ${country.name === selected.name && "bg-slate-200"}`}
                >
                    <Flag code={country.code} className="size-8" />
                    {t(country.name.toLowerCase())}
                </div>
                ))}
            </div>
            )}
        </div>
    );
}

export default DropdownCountries