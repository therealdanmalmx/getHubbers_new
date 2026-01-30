import { useContext, useEffect } from "react";
import { FaCheckCircle, FaChevronCircleLeft, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoXCircleFill } from "react-icons/go";
import { IoIosGlobe, IoIosMail } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { FetchContext } from "../Context/FetchContext";

const Profile = () => {
  const { login } = useParams();
  const {profile, repos, getIndividualProfile, getIndividualRepos } = useContext(FetchContext)

  const navigate = useNavigate()

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
      case "powershell":
        language = "powershell"
        break;
      case "f#":
        language = "fsharp"
        break;
      case "dockerfile":
        language = "docker"
        break;
      case "vba":
        language = "visualbasic"
        break;
      case "vim script":
      case "viml":
        language = "vim"
        break;
      case "tsql":
        language = "microsoftsqlserver"
      break;
      case "asp":
        language = "dot-net"
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
    "nsis",
    "assembly",
    "pike",
    "moonscript",
    "shell",
    "jsonnet",
    "makefile",
    "cue",
    "smarty",
    "gdscript",
    "gherkin",
    "meson",
    "verilog",
    "isabelle",
    "agda",
    "plpgsql",
    "cuda",
    "nunjucks",
    "protocol buffer",
    "mustache",
    "systemverilog",
    "typst",
  ];

  useEffect(() => {
    getIndividualProfile(login!);
    getIndividualRepos(login!);
  }, [login]);


  return (
    <div className="m-4">
      <div onClick={() => navigate(-1)}><FaChevronCircleLeft className="size-12 mx-auto my-8 lg:mx-0 lg:ml-40 cursor-pointer transition-all duration-300 ease-in-out hover:bg-slate-500 hover:rounded-full"/></div>
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
                    language === "less" ?
                    <i className={`devicon-less-plain-wordmark colored text-3xl lg:text-5xl m-2`} title={`${language}`}></i> :
                    language == "emacs lisp" ?
                    <i className={`devicon-emacs-original colored text-2xl lg:text-5xl m-2`} title={`${language}`}></i> :
                    language === "purescript" ?
                    <i className={`devicon-purescript-original colored text-2xl lg:text-5xl m-2`} title={`${language}`}></i> :
                    <i className={`devicon-${switchLanguage(language)}-plain colored text-2xl lg:text-5xl m-2`} title={`${language}`}></i>
                  )
                )}
              </div>
          </div>
          <div className={`flex flex-row lg:flex-col mt-12 lg:mt-0 ${profile.blog && profile.email && profile.twitter_username ? "justify-center gap-12 lg:justify-between" : "justify-start gap-4 lg:gap-12"}`}>
            {profile.html_url && <Link to={profile.html_url} target="_blank" title={`GitHub profile: ${profile.html_url}`}><FaGithub className="size-12 lg:size-24"/></Link>}
            {profile.blog && <Link to={profile.blog.includes("https") || profile.blog.includes("http") ? profile.blog : `https://${profile.blog}`} target="_blank" title={`Website: ${profile.blog}`}><IoIosGlobe className="size-12 lg:size-24" /></Link>}
            {profile.twitter_username && <Link to={`https://x.com/${profile.twitter_username}`} target="_blank" title={`X profile: ${profile.twitter_username}`}  aria-label={`See X profile: ${profile.twitter_username}`}><FaXTwitter className="size-12 lg:size-24" /></Link>}
            {profile.email && <a href={`mailto:${profile.email}`} title={`Email: ${profile.email}`} aria-label={`Send email to ${profile.email}`}><IoIosMail className="size-12 lg:size-24" /></a>}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile