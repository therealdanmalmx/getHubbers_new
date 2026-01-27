import CountryIcon from './CountryIcon';


const DropdownCountries = () => {

    const country_code = localStorage.getItem("coubntry_code");

    const countryList = [
        "Sweden",
        "Portugal",
        "Deutschland",
        "France",
        "Espanha",
        "United Kingdom"
    ];


    return (
    <div>
        <select name="countries" id="countries" className='p-4 max-w-96 border-2 border-slate-400'>
            {countryList.map((country: string) => (
                <div className='flex'>
                    <option value={country} className='p-4'>{country}</option>
                    <CountryIcon country={country_code?.toUpperCase} />
                </div>
            ))}
        </select>
    </div>
    )
}

export default DropdownCountries