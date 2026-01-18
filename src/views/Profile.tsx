import { useContext, useEffect } from "react";
import { FetchContext } from "../Context/FetchContext";
import { useParams } from "react-router";

const Profile = () => {
  const { login } = useParams();
  const {profile, getIndividualProfile } = useContext(FetchContext)

  useEffect(() => {
    getIndividualProfile(login!);
    console.log({profile});
  }, [login, profile]);

  return (
    <div>Profile</div>
  )
}

export default Profile