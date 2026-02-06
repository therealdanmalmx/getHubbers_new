import { useEffect, useState } from "react";
import { FaChevronCircleLeft } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { Link, useNavigate } from 'react-router-dom';
import { profileList } from "../utils/ProfileList";
import { useTranslation } from "react-i18next";

const SavedList = () => {
  const navigate = useNavigate()
  const { t } = useTranslation();
  const [profiles, setProfiles] = useState(profileList);

  const removeProfile = (id: number) => {
    const index = profileList.findIndex((p) => p.id === id);
    if (index > -1) {
      profileList.splice(index, 1);
      setProfiles(profiles.filter((p) => p.id !== id));
  }
}

useEffect(() => {

  if(!profiles.length)
  {
    navigate("/profiles")
  }
}, [profileList]);

return (
  <div>
    <div className="flex flex-col lg:flex-row justify-center items-center my-4">
      <div onClick={() => navigate(-1)}><FaChevronCircleLeft className="size-12 mx-auto my-2 lg:mx-16 cursor-pointer hover:bg-slate-500 hover:rounded-full"/></div>
        {profileList.length > 0 && <div className="lg:flex-1 text-center text-2xl lg:text-5xl font-bold uppercase">{t("savedProfiles")}</div>}
    </div>
    <div className="flex justify-center flex-wrap gap-8">
      {profiles?.map((profile) => (
        <div
          key={profile.id}
          className="text-center cursor-pointer relative"
        >
          <img src={profile.avatar_url} alt={profile.login} className="h-96 w-96 lg:w-64 b-white p-2 border-slate-100 border-2 rounded-xl object-cover mx-auto"/>
            <div className="absolute inset-4 flex items-end justify-between">
              <MdDeleteForever className="z-10 size-8 text-red-600 hover:text-red-500 duration-300 ease-in-out" onClick={() => {removeProfile(profile.id), !profiles.length && navigate("/profiles")}}/>
              <Link to={`/profile/${profile.login}`}>
                <button className="px-4 py-2 bg-white hover:bg-opacity-50 transition-colors duration-300 ease-in-out rounded-full">{profile.login}</button>
              </Link>
            </div>
        </div>
      ))}
    </div>
  </div>
  )
}

export default SavedList