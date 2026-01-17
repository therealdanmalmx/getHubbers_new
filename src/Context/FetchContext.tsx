import axios from "axios";
import { FC, ReactNode, createContext, useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { AlertContext } from "./AlertContext";

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
  getHubberProfiles: (selectedIcons: string[], city: string) => Promise<void>;
  getIndividualProfile: (login: string) => Promise<void>;
};

export const FetchContext = createContext<FetchContextType>({
  profiles: { items: [], total_count: 0, incomplete_results: false },
  profile: {},
  getHubberProfiles: async () => {},
  getIndividualProfile: async () => {},
});

export const FetchProvider: FC<{ children: ReactNode }> = ({ children }) => {

const [profiles, setProfiles] = useState<GithubProfilesResponse>({ items: [], total_count: 0, incomplete_results: false });  const [profile, setProfile] = useState<Record<string, any>>({});
  const { setAlertText } = useContext(AlertContext);
  const { t } = useTranslation();

const getHubberProfiles = async (selectedIcons: string[], city: string) => {
  if (city !== undefined) {
    try {
      const query = `language:${selectedIcons.join("+")}+location:${city ? city : "Sweden" }`
      const res = await axios.get(
        `https://api.github.com/search/users?q=${query}&client_id=${import.meta.env.VITE_GH_CID}&client_secret=${import.meta.env.VITE_GH_CSC}`,
      );

      if (res.data.items.length === 0) {
        setAlertText(t("noprofilesfound"));
      } else {
        setProfiles(res.data);
      }

    } catch (error) {
        console.error("Fetch error:", error);
        setAlertText(t("fetcherror"));
    }
  }
};

const getIndividualProfile = useCallback(async (login: string) => {
  try {
    const res = await axios.get(
      `https://api.github.com/users/${login}?client_id=${import.meta.env.VITE_GH_CID}&client_secret=${import.meta.env.VITE_GH_CSC}`,
    );
    setProfile(await res.data);

  } catch (error) {
      console.error("Profile fetch error:", error);
      setAlertText(t("profileerror"));
  }
}, [setAlertText, t]);

  return (
    <FetchContext.Provider
      value={{
        profiles,
        profile,
        getHubberProfiles,
        getIndividualProfile,
      }}
    >
      {children}
    </FetchContext.Provider>
  );
};
