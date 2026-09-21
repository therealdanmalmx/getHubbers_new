import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronCircleLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CountryContext } from "../Context/CountryContext";
import { FetchContext } from "../Context/FetchContext";
import { SearchContext } from "../Context/SearchContext";

const Profiles = () => {
  const { profiles } = useContext(FetchContext);
  const { selectedIcons, searchText } = useContext(SearchContext);
  const { formattedCountry } = useContext(CountryContext);
  const { t } = useTranslation();
  const navigate = useNavigate();

  const country_code = localStorage.getItem("country_code") ?? "";

  const counrySentence = (country_code: string, icons: string) => {
    let sentence: string = "";
    switch (country_code) {
      case "es":
      case "pt":
      case "fr":
      case "it":
        sentence = `${t("developers")} ${icons}`;
        break;
      default:
        sentence = `${icons} ${t("developers")}`;
        break;
    }
    return sentence;
  };

  return (
    <div>
      <div className="my-4 flex flex-col items-center justify-center lg:flex-row">
        <div onClick={() => navigate("/")}>
          <FaChevronCircleLeft className="bg-nordic_salmon mx-auto my-2 size-12 cursor-pointer rounded-full hover:rounded-full hover:bg-red-300 lg:mx-16" />
        </div>
        {profiles.items.length > 0 && (
          <div className="text-nordic_salmon text-center text-2xl font-bold uppercase lg:flex-1 lg:text-5xl">
            {counrySentence(
              country_code,
              selectedIcons
                .map((icon) => (icon === "csharp" ? "C#" : icon))
                .join(", "),
            )}{" "}
            | {searchText ? searchText : formattedCountry}{" "}
          </div>
        )}
      </div>
      <div className="bg-nordic flex flex-wrap justify-center gap-8">
        {profiles?.items?.map((profile) => (
          <div key={profile.id} className="relative cursor-pointer text-center">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="b-white mx-auto h-96 w-96 rounded-xl border-2 border-slate-100 object-cover p-2 lg:w-64"
            />
            <Link to={`/profile/${profile.login}`}>
              <div className="absolute inset-4 flex items-end justify-end">
                <button className="rounded-full bg-white px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-opacity-50">
                  {profile.login}
                </button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Profiles;
