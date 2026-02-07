import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from 'react-router-dom';
import { CountryContext } from "../Context/CountryContext";
import { FetchContext } from "../Context/FetchContext";
import { SearchContext } from "../Context/SearchContext";
import { FaChevronCircleLeft } from "react-icons/fa";


const Profiles = () => {
  const { profiles } = useContext(FetchContext)
  const {selectedIcons, searchText} = useContext(SearchContext)
  const {formattedCountry} = useContext(CountryContext)
  const { t } = useTranslation();
  const navigate = useNavigate()

  const country_code = localStorage.getItem("country_code") ?? "";

  const counrySentence = (country_code: string, icons: string) => {

    let sentence:string = "";
    switch(country_code)
    {
        case "es":
        case "pt":
        case "fr":
        case "it":
          sentence = `${t("developers")} ${icons}`
        break;
        default:
          sentence = `${icons} ${t("developers")}`
        break
      }
      return sentence;
  }

  useEffect(() => {
  }, [profiles]);

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-center items-center my-4">
        <div onClick={() => navigate("/")}><FaChevronCircleLeft className="size-12 mx-auto my-2 lg:mx-16 cursor-pointer hover:bg-slate-500 hover:rounded-full"/></div>
          {profiles.items.length > 0 && <div className="lg:flex-1 text-center text-2xl lg:text-5xl font-bold uppercase">{counrySentence(country_code, selectedIcons.map((icon => icon === "csharp" ? "C#" : icon)).join(", "))} | {searchText ? searchText : formattedCountry} </div>}
      </div>
      <div className="flex justify-center flex-wrap gap-8">
        {profiles?.items?.map((profile) => (
          <div
            key={profile.id}
            className="text-center cursor-pointer relative"
          >
            <img src={profile.avatar_url} alt={profile.login} className="h-96 w-96 lg:w-64 b-white p-2 border-slate-100 border-2 rounded-xl object-cover mx-auto"/>
            <Link to={`/profile/${profile.login}`}>
              <div className="absolute inset-4 flex items-end justify-end">
                <button className="px-4 py-2 bg-white hover:bg-opacity-50 transition-colors duration-300 ease-in-out rounded-full">{profile.login}</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profiles