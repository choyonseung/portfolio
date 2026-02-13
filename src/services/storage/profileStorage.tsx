import type { Profile } from "@/types/profile";

const KEY = "portfolio_profile";

export const profileStorage = {
  get(): Profile | null {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Profile;
    } catch {
      return null;
    }
  },

  set(profile: Profile) {
    localStorage.setItem(KEY, JSON.stringify(profile));
  },

  clear() {
    localStorage.removeItem(KEY);
  },
};