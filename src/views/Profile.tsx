import { useContext } from "react";
import { FetchContext } from "../Context/FetchContext";

const Profile = () => {
  const { profiles } = useContext(FetchContext)
  console.log({profiles});

  return (
    <div>
      <div>Profile</div>
        {profiles?.items?.map((profile) => (
        <div key={profile.id}>
            <img src={profile.avatar_url} alt={profile.login} />
            {profile.login}
        </div>
        ))}

    </div>
  )
}


export default Profile