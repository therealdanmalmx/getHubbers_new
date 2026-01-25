import { useContext, useEffect } from "react";
import { Link, useRoutes } from 'react-router-dom';
import { FetchContext } from "../Context/FetchContext";
import { SearchContext } from "../Context/SearchContext";
import { CountryContext } from "../Context/CountryContext";
import { useTranslation } from "react-i18next";

const Profiles = () => {
  const { profiles } = useContext(FetchContext)
  const {selectedIcons, searchText} = useContext(SearchContext)
  const {formattedCountry} = useContext(CountryContext)
  const { t } = useTranslation();

  useEffect(() => {
  }, [profiles]);

  return (
    <div>
      {profiles.items.length > 0 && <div className="text-center text-2xl lg:text-5xl font-bold uppercase my-4">{selectedIcons.join(", ")} {t("developers")} | {searchText ? searchText : formattedCountry} </div>}
      <div className="flex justify-center flex-wrap gap-8 p-8">
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