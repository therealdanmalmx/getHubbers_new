import { useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { CountryContext } from "../Context/CountryContext";
import { FetchContext } from "../Context/FetchContext";
import { SearchContext } from "../Context/SearchContext";
import BackButton from "../components/BackButton";

const Profiles = () => {
  useEffect(() => {
    if (!profiles) {
      navigate("/");
    }
  });
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
      <div className="flex flex-col items-center justify-center p-4 lg:flex-row">
        <BackButton route="/" routeName="söksidan" />
        {profiles.items.length > 0 && (
          <div className="gap-6 text-center text-2xl font-bold uppercase text-nordic_salmon md:ml-20 md:text-left lg:flex-1 lg:text-5xl">
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
      <div className="my-8 flex flex-wrap justify-center gap-8">
        {profiles?.items?.map((profile) => (
          <div
            key={profile.id}
            className="relative h-72 w-80 border-t-4 border-t-nordic_salmon bg-nordic_asccent p-2 text-center"
          >
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="b-white mx-auto size-32 rounded-xl bg-nordic_asccent object-contain p-2 lg:w-64"
            />
            <p className="text-xl text-white">@{profile.login}</p>
            <p className="text-xs text-nordic_salmon">
              {profile.html_url.split("//")[1]}
            </p>
            <Link to={`/profile/${profile.login}`}>
              <div className="absolute bottom-5 left-0 flex w-full items-center justify-center px-4">
                <button className="w-full rounded bg-nordic_salmon px-4 py-2 text-sm transition-colors duration-300 ease-in-out hover:bg-red-300">
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
