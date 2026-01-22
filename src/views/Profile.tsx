import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../Context/FetchContext";
import { useParams } from "react-router";
import { FaGithub, FaBlog, FaCheckCircle, FaLockOpen, FaUserLock } from "react-icons/fa";
import { GoXCircleFill } from "react-icons/go";
import { IoIosMail } from "react-icons/io";
import { Link } from "react-router-dom";

const Profile = () => {
  const { login } = useParams();
  const {profile, repos, getIndividualProfile, getIndividualRepos } = useContext(FetchContext)

  const repoFiltered: any = [];

  repos.forEach((repo) => {
    repoFiltered.push(repo?.language?.toLowerCase());
  })

  const uniqueLanguages = new Set(repoFiltered);

  console.log({uniqueLanguages})

  useEffect(() => {
    getIndividualProfile(login!);
    getIndividualRepos(login!);
  }, [login]);


  return (
    <div className="m-4">
      <div className="w-full lg:w-10/12 p-2 border-2 mx-auto h-4/6 flex justify-start flex-col lg:flex-row">
        <img src={profile.avatar_url} alt="" className="h-full w-full lg:w-1/3 object-cover"/>
        <div className="flex lg:flex-row flex-col w-full justify-between">
          <div className="mx-4 flex flex-col items-start justify-between">
            <div>
              <div className="flex items-center">
                <p className="text-2xl font-bold">{profile.name}</p>
                {profile.hireable ? <FaCheckCircle className="size-8 text-green-700 mx-4" title="available for hire"/> : <GoXCircleFill className="size-8 text-red-700 mx-4" title="not available for hire" />}
              </div>
              {profile.company && <p className="text-xl"> {profile.company}</p>}
              {profile.location && <p className="text-xl">{profile.location} </p>}
              {profile.bio && <p className="text-xl mt-12 max-w-full">{profile.bio}</p>}

                {Array.from(uniqueLanguages).map((language) => (
                language === undefined ? "" :
                <i className={`devicon-${language}-plain text-3xl mx-2`} title={`${language}`}></i>
                )
                )}
            </div>
          </div>
          <div className={`flex flex-row lg:flex-col mt-12 lg:mt-0 ${profile.blog && profile.email ? "justify-center gap-4 lg:justify-between" : "justify-start gap-12"}`}>
            <a href={profile.html_url} target="_blank" title="github profile"><FaGithub className="size-12 lg:size-24"/></a>
            {profile.blog && <Link to={`${profile.blog}`} target="_blank" title="blog"><FaBlog className="size-12 lg:size-24" /></Link>}
            {profile.email && <a href={`emailto:${profile.email}`} target="_blank" title="blog"><IoIosMail className="size-12 lg:size-24" /></a>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile