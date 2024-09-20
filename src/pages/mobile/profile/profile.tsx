import * as React from "react";
import { MobileAppWrapper } from "../../../components/mobile/appWrapper";
import MobileProfileHeader from "./components/header";
import MobileProfileContent from "./components/content";
import { UserInfoType } from "./interface";
import "./profile.css";
import { useUserInfoStore } from "../../../store/userinfo";
import { HeaderNew } from "../calendar-new/ui/header";
import ContentWrap from "../../../components/common/contentWrap";
import ProfileSelector from "./components/profileSelector";
import PersonalProfile from "./components/personalTab";
import CompanyProfile from "./components/companyTab";
import InfoProfile from "./components/infoTab";
import { Image } from "antd";
import { useTranslation } from "react-i18next";

export interface IMobileProfilePageProps {}

export default function MobileProfilePage(props: IMobileProfilePageProps) {
  const [activeTab, setActiveTab] = React.useState<
    "personal" | "work" | "info"
  >("personal");

  const { user } = useUserInfoStore();
  const { t } = useTranslation();

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://172.16.151.129:5000/api/user/v22111014",
  //       );
  //       const data = await response.json();
  //       setUser(data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);

  return (
    <div
      className="h-full w-full overflow-y-auto overflow-x-hidden bg-slate-50"
      style={{ height: "calc(100% - 44px)" }}
    >
      <div
        className="header rounded-b-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 px-3 py-2 shadow-sm shadow-indigo-700"
        // style={{
        //   background: "#5366f1",
        //   boxShadow:
        //     "inset 10px 10px 10px #2862ff, inset -12px -12px 10px #2862ff , 0px 6px 9px #606dca",
        // }}
      >
        {/* <p>Thông tin cá nhân</p> */}
        <HeaderNew title={t("profile.detail.seftInfo.title")} />
      </div>
      <div className="content mt-2 flex-1 px-4">
        <div
          className="panel flex h-[150px] items-center gap-2 rounded-3xl bg-white px-[18px] py-[12px] shadow shadow-indigo-900"
          style={{
            animation:
              "0.3s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running bottomFloatIn",
          }}
        >
          <div className="flex-1 [&_img]:rounded-3xl">
            <Image
              className="h-full w-full rounded-2xl"
              src={user.avatar}
              alt="Anh dai dien"
            />
          </div>
          <div className="flex flex-[2] flex-col gap-1 font-light">
            <div className="flex justify-between text-base">
              <p className="flex items-center text-xs italic">
                {t("profile.seft.name")}:{" "}
                <span className="line-clamp-1 pl-2 text-lg font-medium">
                  {user.NAME}
                </span>
              </p>
              {/* <p className="rounded-full bg-red-400 p-1.5 text-xs text-white">
                {user.NAT_CD}
              </p> */}
            </div>
            <div className="flex justify-between text-base">
              <p className="pr-2 text-xs italic">
                {t("profile.seft.code")}:{" "}
                <span className="text-sm font-medium">{user.EMP_NO}</span>
              </p>
            </div>
            <p className="line-clamp-1 pr-2 text-xs italic">
              {t("profile.seft.duty")}{" "}
              <span className="text-xs font-medium">
                {user.chucvu} - {user.DEPT_NM}
              </span>
            </p>
            <div className="flex justify-between text-base">
              <p className="pr-2 text-xs italic">
                {t("profile.seft.phoneNumber")}:{" "}
                <span className="text-xs font-medium">{user.TEL_NO}</span>
              </p>
            </div>
            <p className="pr-2 text-xs italic">
              {t("profile.seft.email")}:{" "}
              <span className="text-xs font-medium">{user.EMAIL_ADDR}</span>
            </p>
            {/* <div>
              <p className="pr-2 text-xs italic">
                Thường trú:
                <span className="pl-2 text-xs font-medium">
                  {user.CURR_ADDR}
                </span>
              </p>
            </div> */}
          </div>
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 !rounded-tl-none px-4">
        <ProfileSelector activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="w-full">
          {activeTab === "personal" && <PersonalProfile user={user} />}
          {activeTab === "work" && <CompanyProfile user={user} />}
          {/* {activeTab === "info" && <InfoProfile user={user} />} */}
        </div>
      </div>
      <div className="h-1"></div>
    </div>
  );
  return (
    <MobileAppWrapper className="profile-page">
      <MobileProfileHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <MobileProfileContent
        user={user}
        activeTab={activeTab}
        // setActiveTab={setActiveTab}
      />
    </MobileAppWrapper>
  );
}
