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
      <div className="flex flex-col items-center justify-center lg:flex-row">
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
      <div className="my-12 flex flex-wrap justify-center gap-8">
        {profiles?.items?.map((profile) => (
          <div
            key={profile.id}
            className="bg-nordic_asccent border-t-nordic_salmon relative h-72 w-80 border-t-4 p-2 text-center lg:h-80 lg:w-96"
          >
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="b-white bg-nordic_asccent mx-auto size-32 rounded-xl object-contain p-2 lg:w-64"
            />
            <p className="text-xl text-white">@{profile.login}</p>
            <p className="text-nordic_salmon text-xs">
              {profile.html_url.split("//")[1]}
            </p>
            <Link to={`/profile/${profile.login}`}>
              <div className="absolute bottom-5 left-0 flex w-full items-center justify-center px-4">
                <button className="bg-nordic_salmon w-full rounded px-4 py-2 text-sm transition-colors duration-300 ease-in-out hover:bg-red-300">
                  GitHub Profile
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
