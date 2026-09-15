import { useEffect, useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
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
      <div className="my-4 flex flex-col items-center justify-center lg:flex-row">
        <div onClick={() => navigate(-1)}>
          <FaChevronCircleLeft className="mx-auto my-2 size-12 cursor-pointer hover:rounded-full hover:bg-slate-500 lg:mx-16" />
        </div>
        {savedList.length > 0 && (
          <div className="text-center text-2xl font-bold uppercase lg:flex-1 lg:text-5xl">
            {t("savedProfiles")}
          </div>
        )}
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        {savedList.map((profile) => (
          <div key={profile.id} className="relative cursor-pointer text-center">
            <img
              src={profile.avatar_url}
              alt={profile.login}
              className="b-white mx-auto h-96 w-96 rounded-xl border-2 border-slate-100 object-cover p-2 lg:w-64"
            />
            <div className="absolute inset-4 flex items-end justify-between">
              <MdDeleteForever
                className="z-10 size-8 text-red-600 duration-300 ease-in-out hover:text-red-500"
                onClick={() => {
                  (removeProfile(profile.id),
                    !savedList.length && navigate("/profiles"));
                }}
              />
              <Link to={`/profile/${profile.login}`}>
                <button className="rounded-full bg-white px-4 py-2 transition-colors duration-300 ease-in-out hover:bg-opacity-50">
                  {profile.login}
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedList;
