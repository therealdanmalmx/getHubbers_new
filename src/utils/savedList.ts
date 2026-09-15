// src/utils/ProfileList.ts  (no JSX here, so .ts is enough)
const STORAGE_KEY = "profileList";

export type SavedProfile = Record<string, any>;

export const getSavedProfiles = (): SavedProfile[] => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return []; // also clears up the bad "undefined" value saved earlier
  }
};

export const setSavedProfiles = (list: SavedProfile[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};
