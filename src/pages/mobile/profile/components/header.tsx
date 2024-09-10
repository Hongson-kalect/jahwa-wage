import { Badge } from "@mui/material";
import { Avatar, Image } from "antd";
import * as React from "react";
import { IoNotifications } from "react-icons/io5";
import { useUserInfoStore } from "../../../../store/userinfo";
import LanguageChanger from "../../../../components/common/languageChange";
import { HeaderNew } from "../../calendar-new/components/header";

export interface IMobileProfileHeaderProps {
  activeTab: string;
  setActiveTab: React.Dispatch<
    React.SetStateAction<"personal" | "work" | "info">
  >;
}

export default function MobileProfileHeader({
  activeTab,
  setActiveTab,
}: IMobileProfileHeaderProps) {
  const [notify, setNotify] = React.useState(0);
  const { user } = useUserInfoStore();

  return (
    <div className="items-end gap-4 rounded-b-[40px] px-3 py-2 [&>*]:text-white">
      <HeaderNew title="Thông tin cá nhân" />
      <div className="flex w-full items-center px-4">
        <p className="line-clamp-1 flex-1">Thông tin cá nhân</p>
        {/* <div className="">
          <Avatar
            size="large"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="avatar"
          />
        </div>
        <p className="ml-4 line-clamp-1 flex-1 text-white">{user.NAME}</p> */}

        <LanguageChanger />
        <Badge badgeContent={4} color="error" className="ml-1">
          <IoNotifications
            size={24}
            style={{
              animation: notify > 0 ? "bellRing 3s linear infinite" : "",
              WebkitTransformOrigin: " 50% 0",
            }}
          />
        </Badge>
      </div>

      <div className="mx-2 flex items-center gap-4 rounded-md px-4 py-2">
        <div className="">
          <Image
            className="w-[30vw] rounded-full"
            // size="large"
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            alt="avatar"
          />
        </div>
        <div className="flex flex-col justify-start py-2 text-xs text-black">
          <p className="line-clamp-1 flex-1 font-[cursive] text-base">
            {user.NAME}
          </p>
          <p className="mb-1 line-clamp-1 flex-1 font-[cursive] text-sm">
            Mã NV:{user.EMP_NO}
          </p>
          <p className="line-clamp-1 flex-1 font-[auto] text-[#666]">
            Mail: {user.EMAIL_ADDR}
          </p>
          <p className="line-clamp-1 flex-1 font-[auto] text-[#666]">
            Chức vụ: {user.MINOR_NM} - {user.DEPT_NM}
          </p>
          {/* <p className="line-clamp-1 flex-1">Bộ phận:</p> */}
          {/* <p className="line-clamp-1 flex-1">
            Bậc lương: {user.PAY_GRD1} - {user.PAY_GRD2}
          </p> */}
          <p className="line-clamp-1 flex-1 font-[auto] text-[#666]">
            Trực thuộc: {user.BIZ_AREA_NM}
          </p>
        </div>
      </div>
      {/* <div className="radio relative z-10 -mb-1.5 mt-2 flex justify-evenly px-4 pb-1 [&>*]:text-lg">
        <div
          onClick={() => setActiveTab("personal")}
          className={`pt-2 duration-300 ${activeTab === "personal" ? "active rounded-t-2xl bg-white px-4 font-medium text-primary-4 dark:bg-gray-700 dark:text-white" : "dark:text-gray-400"}`}
        >
          Cá nhân
        </div>
        <div
          onClick={() => setActiveTab("work")}
          className={`pt-2 duration-300 ${activeTab === "work" ? "active rounded-t-2xl bg-white px-4 font-medium text-primary-4 dark:bg-gray-700 dark:text-white" : "dark:text-gray-400"}`}
        >
          Công ty
        </div>
        <div
          onClick={() => setActiveTab("info")}
          className={`pt-2 duration-300 ${activeTab === "info" ? "active rounded-t-2xl bg-white px-4 font-medium text-primary-4 dark:bg-gray-700 dark:text-white" : "dark:text-gray-400"}`}
        >
          Thông tin
        </div>
      </div> */}
    </div>
  );
}
