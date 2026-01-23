import { useContext, useEffect, useState } from "react";
import { FetchContext } from "../Context/FetchContext";
import { useParams } from "react-router";
import { FaGithub, FaBlog, FaCheckCircle, FaLockOpen, FaUserLock } from "react-icons/fa";
import { IoIosGlobe } from "react-icons/io";
import { GoXCircleFill } from "react-icons/go";
import { IoIosMail } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6"
import { Link } from "react-router-dom";

const Profile = () => {
  const { login } = useParams();
  const {profile, repos, getIndividualProfile, getIndividualRepos } = useContext(FetchContext)

  console.log({profile});

  const repoFiltered: any = [];

  repos.forEach((repo) => {
    repoFiltered.push(repo?.language?.toLowerCase());
  })

  const uniqueLanguages = new Set(repoFiltered);

  const switchLanguage = (language: any) => {
    switch (language) {
      case "css":
        language = "css3"
        break;
      case "c#":
        language = "csharp"
        break;
      case "c++":
        language = "cplusplus"
        break;
      case "vue":
        language = "vuejs"
        break;
      case "html":
        language = "html5"
        break;
      case "objective-c":
        language = "objectivec"
        break;
      case "jupyter notebook":
        language = "jupyter"
        break;
      case "shell":
        language = "powershell"
        break;
      case "f#":
        language = "fsharp"
        break;
      case "dockerfile":
        language = "docker"
        break;
      default:
        break;
    }

    return language
  }

  const langugaesWithNoLogo: any[] = [
    "actionscript",
    "shaderlab",
    "jinja",
    "hcl",
    "openscad",
    "nix",
    "renderscript",
    "scss",
    "ejs",
    "supercollider",
    "mdx",
    "d",
    "dtrace",
    "batchfile",
    "starlark",
  ];

  useEffect(() => {
    getIndividualProfile(login!);
    getIndividualRepos(login!);
  }, [login]);


  return (
    <div className="m-4">
      <div className="w-full lg:w-10/12 p-2 border-2 mx-auto h-4/6 flex justify-start flex-col lg:flex-row">
        <img src={profile.avatar_url} alt="" className="h-full w-full lg:w-1/2 object-cover"/>
        <div className="flex lg:flex-row flex-col w-full justify-between">
          <div className="mx-4 flex flex-col items-start justify-between space-y-2">
            <div>
              <div className="flex items-center justify-between lg:justify-start mt-2">
                <p className="text-2xl font-bold">{profile.name}</p>
                {profile.hireable ? <FaCheckCircle className="size-8 text-green-700 lg:mx-6" title="available for hire"/> : <GoXCircleFill className="size-8 text-red-700 lg:mx-6" title="not available for hire" />}
              </div>
              <div className="space-y-4 lg:space-y-0">
                {profile.company && <p className="text-xl"> {profile.company}</p>}
                {profile.location && <p className="text-xl">{profile.location} </p>}
                {profile.bio && <p className="text-base lg:text-xl lg:pt-24 lg:max-w-full w-full">{profile.bio}</p>}
              </div>
            </div>
              <div className="flex mx-auto flex-wrap lg:mx-0">
                {Array.from(uniqueLanguages).map((language) => (
                  language === undefined || langugaesWithNoLogo.includes(language) ? <span className="m-0" /> :
                    <i className={`devicon-${switchLanguage(language)}-plain colored text-2xl lg:text-5xl m-2`} title={`${language}`}></i>
                  )
                )}
              </div>
          </div>
          <div className={`flex flex-row lg:flex-col mt-12 lg:mt-0 ${profile.blog && profile.email ? "justify-center gap-12 lg:justify-between" : "justify-start gap-4 lg:gap-12"}`}>
            {profile.html_url && <a href={profile.html_url} target="_blank" title="github profile"><FaGithub className="size-12 lg:size-24"/></a>}
            {profile.blog && <Link to={`${profile.blog}`} target="_blank" title="website"><IoIosGlobe className="size-12 lg:size-24" /></Link>}
            {profile.email && <a href={`emailto:${profile.email}`} target="_blank" title="blog"><IoIosMail className="size-12 lg:size-24" /></a>}
            {profile.twitter_usrname && <Link to={`${profile.twitter_usrname}`} target="_blank" title="website"><FaXTwitter className="size-12 lg:size-24" /></Link>}
            {profile.twitter_username && <p>{profile.homepage}</p>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile