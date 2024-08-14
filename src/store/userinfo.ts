import { create } from "zustand";
import i18n from "../locales/i18n";
import { UserInfoType } from "../pages/mobile/profile/interface";

type Props = {
  emp_no: string;
  setEmp_no: (id: string) => void;
  isLogin: boolean;
  setIsLogin: (bol: boolean) => void;
  user: UserInfoType;
  setUser: (user: UserInfoType) => void;
};

export const useUserInfoStore = create<Props>((set) => ({
  emp_no: "",
  isLogin: false,
  user: {},
  setEmp_no: (id) => set({ emp_no: id }),
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user: UserInfoType) => set({ user }),
}));

import { persist, createJSONStorage } from "zustand/middleware";
import CryptoJS from "crypto-js";

const encrypt = (data) =>
  CryptoJS.AES.encrypt(JSON.stringify(data), "secret-key").toString();
const decrypt = (data) =>
  JSON.parse(
    CryptoJS.AES.decrypt(data, "secret-key").toString(CryptoJS.enc.Utf8),
  );

export const useUserPersist = create(
  persist(
    (set, get) => ({
      bears: 0,
      addABear: () => set({ bears: get().bears + 1 }),
    }),
    {
      name: "emp_no_persist",
      storage: createJSONStorage(() => ({
        getItem: (name) => decrypt(localStorage.getItem(name)),
        setItem: (name, value) => localStorage.setItem(name, encrypt(value)),
        removeItem: (name) => localStorage.removeItem(name),
      })),
    },
  ),
);
