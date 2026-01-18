import { useContext, useEffect } from "react";
import { FetchContext } from "../Context/FetchContext";
import { useParams } from "react-router";

const Profile = () => {
  const { login } = useParams();
  const {profile, getIndividualProfile } = useContext(FetchContext)

  useEffect(() => {
    getIndividualProfile(login!);
  }, [login]);

  console.log({profile})
  return (
    <div>
      <div>Profile</div>
      <img src={profile.avatar_url} alt="" />
      <p>{profile.name}</p>
      <p>{profile.company}</p>
    </div>
  )
}

export default Profile