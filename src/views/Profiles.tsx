import { useContext } from "react";
import { FetchContext } from "../Context/FetchContext";
import { useNavigate } from 'react-router-dom';

const Profiles = () => {
  const { profiles, getIndividualProfile } = useContext(FetchContext)
  console.log({profiles});

  const navigate = useNavigate();

  const handleProfileClick = async (login: string, e: React.MouseEvent) => {
    e.preventDefault();
    await getIndividualProfile(login);
    navigate(`/profile/${login}`);
  };

  return (
    <div>
      <div>Profile</div>
      <div className="flex mx-auto flex-wrap gap-8 p-8">
         {profiles?.items?.map((profile) => (
          <div
            key={profile.id}
            className="text-center cursor-pointer"
            onClick={(e) => handleProfileClick(profile.login, e)}
          >
            <img src={profile.avatar_url} alt={profile.login} className="size-48 rounded-full mx-auto"/>
            <span>{profile.login}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profiles