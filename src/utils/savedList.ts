const STORAGE_KEY = "profileList";

export type SavedProfile = Record<string, any>;

export const getSavedProfiles = (): SavedProfile[] => {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(stored) ? stored : [];
  } catch {
    return [];
  }
};

export const setSavedProfiles = (list: SavedProfile[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
};
