import { create } from "zustand";
import i18n from "../locales/i18n";
import { UserInfoType } from "../pages/mobile/profile/interface";

type UserType = {
  company: string;
  department: string;
  name: string;
  positionKorean: string;
  positionVietnamese: string;
  additionalInfo: string;
};

type Props = {
  emp_no: string;
  setEmp_no: (id: string) => void;
  isLogin: boolean;
  setIsLogin: (bol: boolean) => void;
  user?: UserType;
  setUser: (user: UserType) => void;
};

function parseInfo(inputString: string) {
  // Split the string by the special character '♪'
  const parts = decodeURIComponent(inputString).split("♪");
  console.log("parts :>> ", parts);

  // Extract the relevant information
  const info = {
    company: parts[0],
    department: parts[1],
    name: parts[2],
    positionKorean: parts[3],
    positionVietnamese: parts[4],
    additionalInfo: parts[5],
  };

  return info;
}

export const useUserInfoStore = create<Props>((set) => ({
  emp_no: "",
  isLogin: false,
  user: parseInfo(getRawCookie("JHInfo") || ""),
  setEmp_no: (id) => set({ emp_no: id }),
  setIsLogin: (isLogin) => set({ isLogin }),
  setUser: (user: UserType) => set({ user }),
}));

// Example usage
const inputString =
  "JAHWA VINA♪IT(전산)♪Nguyễn Trung Quy♪Senior Clerk(주임)♪Nhân viên(사원)♪Q5";
const parsedInfo = parseInfo(inputString);
console.log(parsedInfo);

import { persist, createJSONStorage } from "zustand/middleware";
import CryptoJS from "crypto-js";
import { getRawCookie } from "../lib/utlis";

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
