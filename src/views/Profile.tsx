import { useContext, useEffect } from "react";
import { FetchContext } from "../Context/FetchContext";
import { useParams } from "react-router";
import { FaGithub } from "react-icons/fa";
import { FaBlog } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";

const Profile = () => {
  const { login } = useParams();
  const {profile, getIndividualProfile } = useContext(FetchContext)

  useEffect(() => {
    getIndividualProfile(login!);
  }, [login]);

  console.log({profile})
  return (
    <div className="m-4">
      <div className="w-11/12 p-2 border-2 mx-auto h-4/6 flex flex-col lg:flex-row">
        <img src={profile.avatar_url} alt="" className="h-full w-full lg:w-1/3 object-cover"/>
        <div className="mx-4 flex flex-col justify-between">
          <div>
            <p className="mx-auto text-2xl font-bold">{profile.name} {profile.company && <span>|  {profile.company}</span>}</p>
            {profile.bio && <p className="text-xl">{profile.bio}</p>}
            {profile.location && <p className="text-xl">{profile.location}</p>}
          </div>
        </div>
          <div className={`flex flex-row lg:flex-col mt-12 lg:mt-0 ${profile.blog && profile.hireable ? "justify-between" : "justify-start gap-12"}`}>
            <a href={profile.html_url} target="_blank" title="github profile"><FaGithub className="size-12 lg:size-24"/></a>
            {profile.blog && <a href={`https://${profile.blog}`} target="_blank" title="blog"><FaBlog className="size-12 lg:size-24" /></a>}
            {profile.hireable && <FaCheckCircle className="size-12 lg:size-24"/>}
          </div>
      </div>
    </div>
  )
}

export default Profile