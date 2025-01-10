import axios from "axios";
import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
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
import { HiHome } from "react-icons/hi";
import { FaAngleLeft, FaCubes, FaEarthAsia } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";
import { BiSolidUser } from "react-icons/bi";
import { Dropdown, Menu, MenuProps } from "antd";
import { useTranslation } from "react-i18next";
import MobileHomePage from "../../pages/mobile/home/home";

export interface IMobileMainLayoutProps {}

const MainLayout = styled.div`
  width: 100vw;
`;

export default function MobileMainLayout(props: IMobileMainLayoutProps) {
  const { setUser } = useUserInfoStore();
  const { empCode, entCode, setHeader } = useMobileAppStore();
  const { t } = useTranslation();

  const { setDevice, device } = useMobileAppStore();
  const [authening, setAuthening] = React.useState(true);

  const [paramsObject] = useSearch();
  // const param = useParams();
  const activeTab = React.useMemo(() => {
    return paramsObject.tab || "";
  }, [paramsObject]);

  const verifyUser = async () => {
    try {
      setAuthening(true);
      const result = await checkCookieNSession();
      if (result !== "") {
        handleLogout();
      } else {
        const userData = await axios.post("/api/MPersonalInformationERP", {
          empCode,
          entCode,
        });

        if (userData?.data?.Table[0]) {
          setUser({
            ...userData.data.Table[0],
            Photo: userData.data.Table1?.[0].Photo,
          });
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

  const cookiesInfo = React.useMemo(() => {
    const cookies = getRawCookie("JHInfo");
    return decodeURIComponent(cookies || "").split("♪");
  }, []);

  const renderPage = () => {
    if (activeTab === "wage") return <WagePage2 />;
    if (activeTab === "attendant") return <Attendant />;
    if (activeTab === "day-off") return <DayOffPage />;
    if (activeTab === "information") return <Information />;
    else return <MobileHomePage />;
  };

  React.useLayoutEffect(() => {
    const handleResize = () => {
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

  React.useEffect(() => {
    switch (activeTab) {
      case "wage":
        setHeader(t("wagePage.title"));
        break;
      case "attendant":
        setHeader(t("attendantPage.title1"));
        break;
      case "day-off":
        setHeader(t("attendantPage.title2"));
        break;
      case "information":
        setHeader(t("infomationPage.title"));
        break;
      default:
        setHeader(cookiesInfo[0]);
    }
  }, [activeTab, t]);

  if (authening) return <div>Cheking cookie</div>;

  return (
    <MainLayout
      className={`flex h-screen w-screen items-center justify-center ${device === "pc" ? "py-4" : ""}`}
    >
      <div
        className="relative flex h-full w-full max-w-[500px] flex-col overflow-auto bg-white shadow shadow-gray-700"
        // style={{ border: "1px solid red" }}
      >
        <Header />
        <div className="relative flex-1 bg-blue-200 pt-2">
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
  const navigate = useNavigate();

  const [paramsObject, setSearchParams] = useSearch();
  const activeTab = React.useMemo(() => {
    return paramsObject.tab || "";
  }, [paramsObject]);

  return (
    <>
      <div className="flex w-full flex-col">
        <div className="flex h-14 items-center justify-between bg-blue-400 px-2 py-1 text-gray-600">
          <div
            className="ml-0.5 flex items-center gap-4 text-white"
            onClick={() => navigate("/")}
          >
            {activeTab && activeTab !== "home" ? (
              <div>
                <FaAngleLeft className="-mb-1 h-6 w-6" size={20} />
              </div>
            ) : (
              <div
                style={{
                  backgroundImage: `url(${fav})`,
                }}
                className="ml-1.5 h-7 w-12 bg-cover bg-center"
              ></div>
            )}
            <p className="text-lg font-bold">{header}</p>
          </div>

          <div className="option flex items-center gap-1">
            <div className="flex w-7 items-center justify-center">
              <TiHome
                onClick={() => {
                  navigate("/");
                }}
                size={26}
                className="text-gray-100"
              />
            </div>
            <div className="flex w-7 items-center justify-center">
              <LanguageChanger />
            </div>

            <div
              className="flex w-7 items-center justify-center"
              onClick={() => setShowav(true)}
            >
              <FaCubes size={22} className="text-gray-100" />
            </div>

            <div
              className="flex w-7 items-center justify-center"
              onClick={() => {
                setSearchParams({ tab: "information" });
              }}
            >
              <BiSolidUser size={22} className="text-gray-100" />
            </div>
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
