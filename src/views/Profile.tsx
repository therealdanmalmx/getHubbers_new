import { t } from "i18next";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  FaBookmark,
  FaCheckCircle,
  FaChevronCircleLeft,
  FaGithub,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { GoXCircleFill } from "react-icons/go";
import { IoIosGlobe, IoIosMail } from "react-icons/io";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import { FetchContext } from "../Context/FetchContext";
import { langugaesWithNoLogo, switchLanguage } from "../utils/Helpers";
import { getSavedProfiles, setSavedProfiles } from "../utils/savedList";

const Profile = () => {
  const [savedList, setSavedList] = useState(getSavedProfiles);
  const { login } = useParams();
  const { profile, repos, getIndividualProfile, getIndividualRepos } =
    useContext(FetchContext);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedList = localStorage.getItem("profileList");
    if (storedList) {
      setSavedList(JSON.parse(storedList));
    }
  }, []);

  const repoFiltered: any = [];

  repos.forEach((repo) => {
    repoFiltered.push(repo?.language?.toLowerCase());
  });

  const uniqueLanguages = new Set(repoFiltered);

  const addProfileToList = (id: number) => {
    if (savedList.some((p) => p.id === id)) {
      toast.error(t("alreadyInList"));
      return;
    }
    const updated = [...savedList, profile];
    setSavedList(updated);
    setSavedProfiles(updated);
    toast.success(t("profileAddedToList"));
  };

  useEffect(() => {
    const loadProfile = async () => {
      setIsLoading(true);
      await Promise.all([
        getIndividualProfile(login!),
        getIndividualRepos(login!),
      ]);
      setIsLoading(false);
    };

    loadProfile();
  }, [login, navigate]);

  useEffect(() => {
    if (!isLoading && Object.keys(profile).length === 0) {
      navigate("/profiles");
    }
  }, [isLoading, profile, navigate]);

  return (
    <div className="mx-2 lg:m-0">
      <div className="flex justify-between">
        <div onClick={() => navigate(-1)}>
          <FaChevronCircleLeft className="mx-auto my-2 size-12 cursor-pointer duration-300 ease-in-out hover:rounded-full hover:bg-slate-500 lg:mx-36" />
        </div>
        <Link to="/profile-list">
          <div className="mx-auto my-2 flex size-12 cursor-pointer flex-col items-center justify-center lg:mx-36">
            {savedList.length > 0 && (
              <div className="relative flex cursor-pointer items-start justify-center duration-300 ease-in-out hover:text-slate-500">
                <FaBookmark className="size-12 cursor-pointer" />
                <span className="absolute cursor-pointer pt-1 text-xl font-bold text-white">
                  {savedList.length}
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>
      <div className="mx-auto flex h-4/6 w-full flex-col justify-start border-2 p-2 lg:w-10/12 lg:flex-row">
        <img
          src={profile.avatar_url}
          alt=""
          className="h-full w-full object-cover lg:w-1/2"
        />
        <div className="flex w-full flex-col justify-between lg:flex-row">
          <div className="mx-4 flex flex-col items-start justify-between space-y-2">
            <div>
              <div className="mt-2 flex items-center justify-between lg:justify-start">
                <p className="text-2xl font-bold">{profile.name}</p>
                {profile.hireable ? (
                  <FaCheckCircle
                    className="size-8 text-green-700 lg:mx-6"
                    title="available for hire"
                  />
                ) : (
                  <GoXCircleFill
                    className="size-8 text-red-700 lg:mx-6"
                    title="not available for hire"
                  />
                )}
              </div>
              <div className="space-y-2 lg:space-y-0">
                {profile.company && (
                  <p className="text-xl"> {profile.company}</p>
                )}
                {profile.location && (
                  <p className="text-xl">{profile.location} </p>
                )}
                {profile.bio && (
                  <p className="w-full text-base lg:max-w-full lg:pt-24 lg:text-xl">
                    {profile.bio}
                  </p>
                )}
              </div>
            </div>
            <div className="mx-auto flex flex-wrap lg:mx-0">
              {Array.from(uniqueLanguages).map((language) =>
                language === undefined ||
                langugaesWithNoLogo.includes(language) ? (
                  <span className="m-0" />
                ) : language === "less" ? (
                  <i
                    className={`devicon-less-plain-wordmark colored m-2 text-3xl lg:text-5xl`}
                    title={`${language}`}
                  ></i>
                ) : language == "emacs lisp" ? (
                  <i
                    className={`devicon-emacs-original colored m-2 text-2xl lg:text-5xl`}
                    title={`${language}`}
                  ></i>
                ) : language === "purescript" ? (
                  <i
                    className={`devicon-purescript-original colored m-2 text-2xl lg:text-5xl`}
                    title={`${language}`}
                  ></i>
                ) : (
                  <i
                    className={`devicon-${switchLanguage(language)}-plain colored m-2 text-2xl lg:text-5xl`}
                    title={`${language === "azuresqldatabase" ? "sql" : language}`}
                  ></i>
                ),
              )}
            </div>
          </div>
          <div
            className={`mt-6 flex flex-row-reverse lg:mt-0 lg:flex-col ${profile.blog && profile.email && profile.twitter_username ? "justify-center gap-12 lg:justify-between" : "justify-start gap-4 lg:gap-12"}`}
          >
            {profile.html_url && (
              <Link
                to={profile.html_url}
                target="_blank"
                title={`GitHub profile: ${profile.html_url}`}
              >
                <FaGithub className="size-12 lg:size-24" />
              </Link>
            )}
            {profile.blog && (
              <Link
                to={
                  profile.blog.includes("https") ||
                  profile.blog.includes("http")
                    ? profile.blog
                    : `https://${profile.blog}`
                }
                target="_blank"
                title={`Website: ${profile.blog}`}
              >
                <IoIosGlobe className="size-12 lg:size-24" />
              </Link>
            )}
            {profile.twitter_username && (
              <Link
                to={`https://x.com/${profile.twitter_username}`}
                target="_blank"
                title={`X profile: ${profile.twitter_username}`}
                aria-label={`See X profile: ${profile.twitter_username}`}
              >
                <FaXTwitter className="size-12 lg:size-24" />
              </Link>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                title={`Email: ${profile.email}`}
                aria-label={`Send email to ${profile.email}`}
              >
                <IoIosMail className="size-12 lg:size-24" />
              </a>
            )}
          </div>
        </div>
      </div>
      <div className="mt-2 flex justify-center">
        <button
          onClick={() => addProfileToList(profile.id)}
          className="w-full bg-slate-500 py-4 text-center text-white transition-colors duration-300 ease-in-out hover:bg-slate-400 lg:w-10/12"
        >
          Add to list
        </button>
      </div>
    </div>
  );
};

export default Profile;
