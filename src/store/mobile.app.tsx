import { create } from "zustand";
import i18n from "../locales/i18n";

type Props = {
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
  language: string;
  setLanguage: (app: string) => void;
  selectedApp: string;
  setSelectedApp: (app: string) => void;
};

export const useMobileAppStore = create<Props>((set) => ({
  darkmode: false,
  setDarkmode: (darkmode: boolean) =>
    set(() => {
      document.querySelector("html")?.classList.toggle("dark", darkmode);
      return { darkmode };
    }),
  language: localStorage.getItem("language") || "vi",
  setLanguage: (lang: string) =>
    set(() => {
      i18n.changeLanguage(lang);
      localStorage.setItem("language", lang);
      return { language: lang };
    }),
  selectedApp: window.location.pathname.split("/")[3] || "home",
  setSelectedApp: (app: string) => set({ selectedApp: app }),
}));
