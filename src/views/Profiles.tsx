import { useContext } from "react";
import { Link } from 'react-router-dom';
import { FetchContext } from "../Context/FetchContext";

const Profiles = () => {
  const { profiles } = useContext(FetchContext)
  console.log({profiles});

  return (
    <div>
      <div className="flex mx-auto flex-wrap gap-8 p-8">
        {profiles?.items?.map((profile) => (
          <div
            key={profile.id}
            className="text-center cursor-pointer relative"
          >
            <img src={profile.avatar_url} alt={profile.login} className="h-96 w-64 b-white p-2 border-slate-100 border-2 rounded-xl object-cover mx-auto"/>
            <Link to={`/profile/${profile.login}`}>
              <div className="absolute inset-4 flex items-end justify-end">
                <button className="px-4 py-2 bg-white hover:bg-opacity-50 transition-colors duration-300 ease-in-out rounded-full">{profile.login}</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Profiles