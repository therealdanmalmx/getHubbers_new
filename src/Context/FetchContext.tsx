import axios from "axios";
import { FC, ReactNode, createContext, useCallback, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { AlertContext } from "./AlertContext";
import { CountryContext } from "./CountryContext";

type GithubProfilesResponse = {
  incomplete_results: boolean;
  items: Array<{
    id: number;
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    score: number;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: GithubProfilesResponse;
    url: string;
    user_view_type: string;
  }>;
  total_count: number;
};

type FetchContextType = {
  profiles: GithubProfilesResponse;
  profile: Record<string, any>;
  repos: any[];
  getHubberProfiles: (selectedIcons: string[], city: string) => Promise<void>;
  getIndividualProfile: (login: string) => Promise<void>;
  getIndividualRepos: (login: string) => Promise<void>;
};

export const FetchContext = createContext<FetchContextType>({
  profiles: { items: [], total_count: 0, incomplete_results: false },
  profile: {},
  repos: [],
  getHubberProfiles: async () => {},
  getIndividualProfile: async () => {},
  getIndividualRepos: async () => {},
});

export const FetchProvider: FC<{ children: ReactNode }> = ({ children }) => {

const [profiles, setProfiles] = useState<GithubProfilesResponse>({ items: [], total_count: 0, incomplete_results: false });  const [profile, setProfile] = useState<Record<string, any>>({});
const [repos, setRepos] = useState([]);
const { setAlertText } = useContext(AlertContext);
const {formattedCountry, country } = useContext(CountryContext)
const { t } = useTranslation();

const getHubberProfiles = async (selectedIcons: string[], city: string) => {
  if (city !== undefined) {
    try {
      // Check if country is better to use
      const query = `language:${selectedIcons.join("+")}+location:${city ? city : formattedCountry }`
      const res = await axios.get(
        `https://api.github.com/search/users?q=${query}&client_id=${import.meta.env.VITE_GH_CID}&client_secret=${import.meta.env.VITE_GH_CSC}`,
      );

      if (!res.data.items.length) {
        setAlertText(t("noprofilesfound"));
      } else {
        setProfiles(await res.data);
        return await res.data;
      }

    } catch (error) {
        console.error("Fetch error:", error);
        setAlertText(t("fetcherror"));
    }
  }
};

const getIndividualProfile = async (login: string) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users/${login}?client_id=${import.meta.env.VITE_GH_CID}&client_secret=${import.meta.env.VITE_GH_CSC}`,
    );
    setProfile(await res.data);
    return await res.data;

  } catch (error) {
      console.error("Profile fetch error:", error);
      setAlertText(t("profileerror"));
  }
};

const getIndividualRepos = async (login: string) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users/${login}/repos?client_id=${import.meta.env.VITE_GH_CID}&client_secret=${import.meta.env.VITE_GH_CSC}`,
    );
    setRepos(await res.data);
    return await res.data;

  } catch (error) {
      console.error("Repo fetch error:", error);
      setAlertText(t("profileerror"));
  }
};

// useEffect(async () => {
//   // Octokit.js
// // https://github.com/octokit/core.js#readme
//   const octokit = new Octokit({
//     auth: 'YOUR-TOKEN'
//   })

//   await octokit.request('PATCH /user', {
//     blog: 'https://github.com/blog',
//     name: 'monalisa octocat',
//     headers: {
//       'X-GitHub-Api-Version': '2022-11-28'
//     }
//   })
// })

  return (
    <FetchContext.Provider
      value={{
        profiles,
        profile,
        repos,
        getHubberProfiles,
        getIndividualProfile,
        getIndividualRepos,

      }}
    >
      {children}
    </FetchContext.Provider>
  );
};
