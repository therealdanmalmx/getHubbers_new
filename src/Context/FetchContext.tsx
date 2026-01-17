"use client";
import axios from "axios";
import { FC, ReactNode, createContext, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { AlertContext } from "./AlertContext";

type FetchContextType = {
  profiles: string[];
  profile: {};
  getHubberProfiles: (selectedIcons: string[], city: string) => void;
  getIndividualProfile: (login: string) => void;
};

export const FetchContext = createContext<FetchContextType>({
  profiles: [],
  profile: {},
  getHubberProfiles: () => {},
  getIndividualProfile: () => {},
});

const [profiles, setProfiles] = useState([]);
const [profile, setProfile] = useState({});
const { setAlertText } = useContext(AlertContext);
const { t } = useTranslation();

const getHubberProfiles = async (selectedIcons: string[], city: string) => {
  if (city || city === "") {
    // const res = await axios.get(`https://api.github.com/search/users?q=language:${langList && frameList ? `${langList}+${frameList}` : langList ? `${langList}` : frameList ? `${frameList}` : `${langList}+${frameList}`}+location:${region ? region : 'sweden'}&client_id=${process.env.REACT_APP_GH_CID}&client_secret=${process.env.REACT_APP_GH_CSC}`)
    const res = await axios.get(
      `https://api.github.com/search/users?q=language:${selectedIcons ?? selectedIcons}+location:${city ? city : "Sweden"}&client_id=${process.env.REACT_APP_GH_CID}&client_secret=${process.env.REACT_APP_GH_CSC}`,
    );
    if (res.data.items < 1) {
      setAlertText(t("noprofilesfound"));
    } else {
      setProfiles(res.data.items);
    }
  }
};

const getIndividualProfile = async (login: string) => {
  const res = await axios.get(
    `https://api.github.com/users/${login}?client_id=${process.env.REACT_APP_GH_CID}&client_secret=${process.env.REACT_APP_GH_CSC}`,
  );
  setProfile(res.data);
};

export const FetchProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
