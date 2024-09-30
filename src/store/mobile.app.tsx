import { create } from "zustand";
import i18n from "../locales/i18n";

type Props = {
  device: "phone" | "pc";
  setDevice: (type: "phone" | "pc") => void;
  header: string;
  setHeader: (header: string) => void;
  darkmode: boolean;
  setDarkmode: (darkmode: boolean) => void;
  language: string;
  setLanguage: (app: string) => void;
  selectedApp: string;
  setSelectedApp: (app: string) => void;
};

export const useMobileAppStore = create<Props>((set) => ({
  device: "phone",
  setDevice: (type) => set({ device: type }),
  header: "",
  setHeader: (header: string) => set({ header }),

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
  selectedApp: window.location.pathname.split("/")[1] || "home",
  setSelectedApp: (app: string) => set({ selectedApp: app }),
}));
