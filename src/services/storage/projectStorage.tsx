import type { Project } from "@/types/project";

const KEY = "portfolio_projects";

export const projectStorage = {
  get(): Project[] {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    try {
      return JSON.parse(raw) as Project[];
    } catch {
      return [];
    }
  },

  set(projects: Project[]) {
    localStorage.setItem(KEY, JSON.stringify(projects));
  },

  clear() {
    localStorage.removeItem(KEY);
  },
};