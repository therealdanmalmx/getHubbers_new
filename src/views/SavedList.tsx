import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import { getSavedProfiles } from "../utils/savedList";

const SavedList = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [savedList, setSavedList] = useState(getSavedProfiles);

  const removeProfile = (id: number) => {
    const updated = savedList.filter((p) => p.id !== id);
    setSavedList(updated);
    localStorage.setItem("profileList", JSON.stringify(updated));
  };

  useEffect(() => {
    if (!savedList.length) {
      navigate("/profiles");
    }
  }, [savedList]);

  return (
    <div>
      <div className="m-4 flex flex-col items-center justify-center lg:flex-row">
        <BackButton route="/profiles" routeName="utvecklare" />
        {savedList.length > 0 && (
          <div className="text-2xl font-bold uppercase text-nordic_salmon md:ml-28 md:text-left lg:flex-1 lg:text-5xl">
            {t("savedProfiles")}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-6">
        {savedList.map((profile) => (
          <div
            key={profile.id}
            className="flex size-80 flex-col justify-between border-t-4 border-t-nordic_salmon bg-nordic_asccent p-4 text-center"
          >
            <div>
              <img
                src={profile.avatar_url}
                alt={profile.login}
                className="b-white mx-auto size-32 rounded-xl bg-nordic_asccent object-contain p-2"
              />
              <p className="text-xl text-white">@{profile.login}</p>
              <p className="text-xs text-nordic_salmon">
                {profile.html_url.split("//")[1]}
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <Link to={`/profile/${profile.login}`}>
                <div className="bottom-12 left-0 flex w-full items-center justify-center px-4">
                  <button className="w-full rounded bg-nordic_salmon px-4 py-2 text-sm transition-colors duration-300 ease-in-out hover:bg-red-300">
                    GitHub Profile
                  </button>
                </div>
              </Link>
              <div
                onClick={() => {
                  (removeProfile(profile.id),
                    !savedList.length && navigate("/profiles"));
                }}
                className="bottom-2 left-0 flex w-full items-center justify-center px-4"
              >
                <button className="w-full rounded border border-nordic_salmon px-4 py-2 text-sm text-white transition-colors duration-300 ease-in-out hover:text-nordic_salmon">
                  Remove
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedList;
