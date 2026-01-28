import { t } from 'i18next';
import { useContext, useState } from 'react';
import { IoChevronDownSharp, IoChevronUpOutline } from "react-icons/io5";
import Flag from 'react-world-flags';
import { CountryContext } from '../Context/CountryContext';


const DropdownCountries = () => {

    const countryList = [
        { name: "Sweden", code: "se" },
        { name: "Portugal", code: "pt" },
        { name: "Deutschland", code: "de" },
        { name: "France", code: "fr" },
        { name: "Espanha", code: "es" },
        { name: "United Kingdom", code: "gb" },
        { name: "Nederland", code: "nl" },
    ];

    const countryInro = [
        {sweden: "Sverige"},
        {portugal: "Portugal"},
        {Deutschland: "Deutschland"},
        {France: "France"},
        {France: "Espanha"},
        {'United Kingdom': "France"},
    ]


    const {setCountryCode, country } = useContext(CountryContext)
    const getInitialCountry = () => {
        const savedCode = localStorage.getItem("country_code");
        return countryList.find(c => c.code.toLowerCase() === savedCode) || countryList[0];
    };

    const [selected, setSelected] = useState<{ name: string; code: string }>(getInitialCountry());

    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative bottom-fullw-56 max-h-96 overflow-y-auto">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full p-4 border-2 border-slate-400 flex items-center justify-content"
            >
            <div className={"flex items-center justify-between lg:justify-start lg:gap-2 gap-4"}>
                <Flag code={selected.code} className="size-8" />
                {t(selected.name.toLowerCase())}
                {isOpen ? <IoChevronUpOutline /> : <IoChevronDownSharp />}
            </div>
            </button>

            {isOpen && (
            <div className="absolute top-full w-full border-2 border-slate-400 bg-white z-10 bottom-full">
                {countryList.map((country) => (
                <div
                    key={country.code}
                    onClick={() => {
                        setSelected(country);
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