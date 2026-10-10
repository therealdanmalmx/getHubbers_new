import { t } from "i18next";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBookmark, FaGithub } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { IoIosGlobe } from "react-icons/io";
import { MdOutlinePinDrop, MdOutlineWorkOutline } from "react-icons/md";
import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import BackButton from "../components/BackButton";
import { FetchContext } from "../Context/FetchContext";
import {
  getLanguageName,
  langugaesWithNoLogo,
  switchLanguage,
} from "../utils/Helpers";
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
    if (repo === undefined) {
      return;
    }

    repoFiltered.push(
      repo?.language?.toLowerCase() !== undefined &&
        repo?.language?.toLowerCase(),
    );
  });

  const uniqueLanguages = new Set(repoFiltered.filter(Boolean));

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
    <div className="mx-36 my-8">
      <div className="flex items-center justify-between">
        <BackButton route="/profiles" routeName={t("developers")} />
        <Link to="/profile-list">
          <div className="mx-auto my-2 flex size-12 cursor-pointer flex-col items-center justify-center">
            {savedList.length > 0 && (
              <div className="text-nordic_blue relative flex cursor-pointer items-start justify-center duration-300 ease-in-out hover:text-blue-400">
                <FaBookmark className="bg size-12 cursor-pointer" />
                <span className="absolute cursor-pointer pt-1 text-xl font-bold text-white">
                  {savedList.length}
                </span>
              </div>
            )}
          </div>
        </Link>
      </div>
      <div className="flex flex-col justify-start rounded-lg bg-nordic_asccent p-5 lg:flex-row">
        <img
          src={profile.avatar_url}
          alt=""
          className="size-44 rounded object-contain"
        />
        <div className="flex w-full flex-col justify-between lg:flex-row">
          <div className="mx-4 flex flex-col flex-wrap items-start justify-between space-y-2">
            <div>
              <div className="flex items-center justify-start gap-4">
                <p className="w-fit whitespace-nowrap text-4xl font-bold text-white">
                  {profile.name}
                </p>
                {profile.hireable ? (
                  <div
                    className="text-nordic_blue w-fit whitespace-nowrap rounded-full bg-nordic_light px-3 py-1 text-center text-xs"
                    title={t("availableForHire")}
                  >
                    {t("availableForHire")}
                  </div>
                ) : (
                  <div
                    className="w-fit items-center whitespace-nowrap rounded-full bg-nordic_light px-3 py-1 text-center text-xs text-nordic_salmon"
                    title={t("availableNotForHire")}
                  >
                    {t("availableNotForHire")}
                  </div>
                )}
              </div>
              {profile.bio && (
                <p className="w-fit text-base text-nordic_salmon">
                  {profile.bio}
                </p>
              )}
            </div>
            {profile.company && (
              <div className="flex items-center gap-2">
                <MdOutlineWorkOutline className="size-5 text-nordic_salmon" />
                <p className="text-nordic_salmon"> {profile.company}</p>
              </div>
            )}
            <div>
              {profile.location && (
                <div className="flex items-center gap-2">
                  <span>
                    <MdOutlinePinDrop className="text-nordic_blue text-sm" />
                  </span>
                  <span className="text-nordic_blue text-sm">
                    {profile.location}{" "}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className={`flex flex-row items-center justify-center gap-2`}>
            {profile.html_url && (
              <Link
                to={profile.html_url}
                target="_blank"
                title={`GitHub profile: ${profile.html_url}`}
                className="cursor-pointer"
              >
                <div className="flex w-max items-center gap-2 rounded-lg bg-nordic_salmon px-3 py-1">
                  <FaGithub className="size-6 text-nordic" />
                  <span className="text-xs">GitHub profil</span>
                </div>
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
                <div className="flex w-max items-center gap-2 rounded-lg bg-nordic px-3 py-1">
                  <IoIosGlobe className="text-nordic_blue size-6" />
                  <span className="text-xs text-white">Webbplats</span>
                </div>
              </Link>
            )}
            {profile.twitter_username && (
              <Link
                to={`https://x.com/${profile.twitter_username}`}
                target="_blank"
                title={`X profile: ${profile.twitter_username}`}
                aria-label={`See X profile: ${profile.twitter_username}`}
              >
                <div className="bg-nordic_blue flex w-max items-center gap-2 rounded-lg px-2 py-1">
                  <FaXTwitter className="size-6 text-nordic" />
                  {/* <span className="text-xs text-nordic">X / Twitter</span> */}
                </div>
              </Link>
            )}
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                title={`Email: ${profile.email}`}
                aria-label={`Send email to ${profile.email}`}
              >
                <HiOutlineMail className="size-12 text-slate-300" />
              </a>
            )}
          </div>
        </div>
      </div>
      {!Array.from(uniqueLanguages).length ? (
        <span className="hidden" />
      ) : (
        <div className="my-2 rounded-lg bg-nordic_shade p-4">
          <p className="mb-2 text-nordic_salmon">Technology & Skills</p>
          <div className="flex flex-wrap gap-2">
            {Array.from(uniqueLanguages).map((language) =>
              language === undefined ||
              langugaesWithNoLogo.includes(language) ? (
                <span className="hidden" />
              ) : language === "less" ? (
                <i
                  className={`devicon-less-plain-wordmark colored text-3xl lg:text-5xl`}
                  title={`${language}`}
                ></i>
              ) : language == "emacs lisp" ? (
                <i
                  className={`devicon-emacs-original colored flex size-[110px] flex-col items-center justify-center rounded-lg bg-nordic text-2xl lg:text-5xl`}
                  title={`${language}`}
                >
                  <p className="mt-2 text-center text-xs text-white">
                    {getLanguageName(String(language ?? ""))}
                  </p>
                </i>
              ) : language == "fortran" ? (
                <i
                  className={`devicon-fortran-original colored flex size-[110px] flex-col items-center justify-center rounded-lg bg-nordic text-2xl lg:text-5xl`}
                  title={`${language}`}
                >
                  <p className="mt-2 text-center text-xs text-white">
                    {getLanguageName(String(language ?? ""))}
                  </p>
                </i>
              ) : language === "purescript" ? (
                <i
                  className={`devicon-purescript-original colored m-2 text-2xl lg:text-5xl`}
                  title={`${language}`}
                ></i>
              ) : (
                <i
                  className={`flex size-[110px] flex-col items-center justify-center rounded-lg bg-nordic devicon-${switchLanguage(language)}-plain colored text-2xl lg:text-5xl`}
                  title={`${language === "azuresqldatabase" ? "sql" : language}`}
                >
                  <p className="mt-2 text-center text-xs text-slate-300">
                    {getLanguageName(String(language ?? ""))}
                  </p>
                </i>
              ),
            )}
          </div>
        </div>
      )}
      <div className="mt-2">
        <button
          onClick={() => addProfileToList(profile.id)}
          className="w-full bg-nordic_shade py-4 text-center text-nordic_salmon transition-colors duration-300 ease-in-out hover:bg-nordic_asccent"
        >
          {t("addToList")}
        </button>
      </div>
    </div>
  );
};

export default Profile;
