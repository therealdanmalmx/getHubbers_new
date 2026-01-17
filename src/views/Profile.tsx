import { useContext, useEffect } from "react"
import { FetchContext } from "../Context/FetchContext"

const Profile = () => {
const { profiles } = useContext(FetchContext)

useEffect(() => {
    profiles
}, [profiles]);

console.log({profiles});

    return (
        <div>Profile</div>
    )
}

export default Profile