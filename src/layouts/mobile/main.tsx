import axios from "axios";
import * as React from "react";
import { Outlet } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { httpGet } from "../../api/axios";
import LanguageChanger from "../../components/common/languageChange";
import { getRawCookie, handleLogout } from "../../lib/utlis";
import { SidebarToggle } from "../../pages/mobile/wage-1/components/sidebarToggle";
import { useMobileAppStore } from "../../store/mobile.app";
import { useUserInfoStore } from "../../store/userinfo";
import { Navbar } from "./components/nav";
import { checkCookieNSession } from "./utils";
import WagePage2 from "../../pages/mobile/wage2/page";
import Attendant from "../../pages/mobile/attendant/attendant";
import Asset from "../../pages/mobile/asset/asset";
import Information from "../../pages/mobile/infomation/page";
import { useSearch } from "../../hooks/useSearch";
import DayOffPage from "../../pages/mobile/dayoff/dayOff";
import { t } from "i18next";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";
import fav from "../../assets/images/favicon.gif";
import { LuLogOut } from "react-icons/lu";

export interface IMobileMainLayoutProps {}

const MainLayout = styled.div`
  /* height: 100dvh; */
  /* max-width: 400px; */

  width: 100vw;
  /* border: 1px solid gray; */
  /* margin: -1px; */
  /* border-radius: 20px; */
  /* overflow: hidden; */
`;

export default function MobileMainLayout(props: IMobileMainLayoutProps) {
  const { setUser } = useUserInfoStore();
  const { empCode, entCode } = useMobileAppStore();

  const { setDevice, device } = useMobileAppStore();
  const [authening, setAuthening] = React.useState(true);

  const [paramsObject] = useSearch();
  const activeTab = React.useMemo(() => {
    return paramsObject.tab || "wage";
  }, [paramsObject]);

  const verifyUser = async () => {
    try {
      setAuthening(true);
      const result = await checkCookieNSession();
      console.log("result :>> ", result);
      if (result !== "") {
        handleLogout();
      } else {
        const userData = await axios.post("/api/MPersonalInformationERP", {
          empCode,
          entCode,
        });

        if (userData.data.Table[0]) {
          setUser(userData.data.Table[0]);
        } else {
          toast.error("Failed to get user data");
          handleLogout();
        }
      }

      // await fetchUserData();
      setAuthening(false);
    } catch (error) {
      alert(JSON.stringify(error));
    }
  };

  const renderPage = () => {
    if (activeTab === "wage") return <WagePage2 />;
    if (activeTab === "attendant") return <Attendant />;
    if (activeTab === "day-off") return <DayOffPage />;
    // if (activeTab === "asset") return <Asset />;
    if (activeTab === "information") return <Information />;
  };

  React.useLayoutEffect(() => {
    const handleResize = () => {
      console.log("window.innerWidth :>> ", window.innerWidth);
      if (window.innerWidth > 1000) setDevice("pc");
      else setDevice("phone");
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  React.useEffect(() => {
    verifyUser();
  }, []);

  if (authening) return <div>Cheking cookie</div>;

  return (
    <MainLayout
      className={`flex h-screen w-screen items-center justify-center bg-gray-300 ${device === "pc" ? "py-4" : ""}`}
    >
      <div className="relative flex h-full w-full max-w-[420px] flex-col bg-white">
        <Header />
        <div className="relative flex-1 overflow-auto bg-[#eaeef3]">
          {renderPage()}
          {/* <Outlet /> */}
        </div>
      </div>
    </MainLayout>
  );
}

const Header = () => {
  const [showNav, setShowav] = React.useState(false);
  const { header } = useMobileAppStore();

  const [paramsObject, setSearchParams] = useSearch();
  const activeTab = React.useMemo(() => {
    return paramsObject.tab || "wage";
  }, [paramsObject]);

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex h-14 items-center justify-between bg-white px-2 py-1 text-gray-600">
          <div
            style={{ backgroundImage: `url(${fav})` }}
            className="h-12 w-12 bg-cover bg-center"
            onClick={() => setShowav(true)}
          ></div>
          {/* <SidebarToggle
            color="gray"
            size={10}
            onClick={() => setShowav(true)}
          /> */}
          <p className="flex-1 text-center text-lg font-medium uppercase">
            {header}
          </p>

          {/* <div className="option flex items-center gap-1">
            <div
              onClick={() => {
                window.open("https://gw.jahwa.co.kr/", "_blank");
              }}
              className="flex h-5 w-7 -skew-x-6 items-center justify-center rounded-[50%] bg-gray-700 text-[12px] font-bold text-white"
            >
              GW
            </div>
            <div className="mt-[1px] w-8">
              <PiMicrosoftOutlookLogoFill
                onClick={() => {
                  window.open("https://outlook.office365.com/", "_blank");
                }}
                size={28}
                className="text-gray-700"
              />
            </div>
            <div className="mt-[1px] w-8" onClick={handleLogout}>
              <LuLogOut
                size={24}
                className="text-pink-700"
              />
            </div>
          </div> */}
          {/* <p className="text-lg font-medium uppercase">Bố Sơn Muôn Năm</p> */}

          <LanguageChanger />
        </div>

        {/* <div className="flex h-[52px] items-center justify-between bg-gradient-to-r from-green-500 to-teal-400 px-2 py-0.5 text-sm font-bold text-slate-200"> */}
        <div className="flex h-[52px] items-center justify-between bg-gradient-to-r from-gray-500 to-gray-400 px-2 py-0.5 text-sm font-bold text-slate-200">
          <div
            onClick={() => {
              setSearchParams({ tab: "wage" });
            }}
            className={`uppercase ${activeTab === "wage" ? "translate-y-0.5 text-white" : "opacity-70"} relative flex h-full items-center justify-center duration-300`}
          >
            {t("navbar.payRoll")}
            {activeTab === "wage" && (
              <div className="absolute bottom-0 flex h-1 w-full items-center justify-center rounded-lg bg-gray-200" />
            )}
          </div>
          <div
            onClick={() => {
              setSearchParams({ tab: "attendant" });
            }}
            className={`uppercase ${activeTab === "attendant" ? "translate-y-0.5 text-white" : "opacity-70"} relative flex h-full items-center justify-center duration-300`}
          >
            {t("navbar.attendance")}
            {activeTab === "attendant" && (
              <div className="absolute bottom-0 flex h-1 w-full items-center justify-center rounded-lg bg-gray-200" />
            )}
          </div>
          <div
            onClick={() => {
              setSearchParams({ tab: "day-off" });
            }}
            className={`uppercase ${activeTab === "day-off" ? "translate-y-0.5 text-white" : "opacity-70"} relative flex h-full items-center justify-center duration-300`}
          >
            {t("navbar.dayOff")}
            {activeTab === "day-off" && (
              <div className="absolute bottom-0 flex h-1 w-full items-center justify-center rounded-lg bg-gray-200" />
            )}
          </div>

          <div
            onClick={() => {
              setSearchParams({ tab: "information" });
            }}
            className={`uppercase ${activeTab === "information" ? "translate-y-0.5 text-white" : "opacity-70"} relative flex h-full items-center justify-center duration-300`}
          >
            {t("navbar.infomation")}
            {activeTab === "information" && (
              <div className="absolute bottom-0 flex h-1 w-full items-center justify-center rounded-lg bg-gray-200" />
            )}
          </div>
        </div>
      </div>

      <Navbar
        showNav={showNav}
        onClose={() => {
          setShowav(false);
        }}
      />
    </>
  );
};
