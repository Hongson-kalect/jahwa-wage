import axios from "axios";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { BiSolidUser } from "react-icons/bi";
import { FaAngleLeft, FaCubes } from "react-icons/fa6";
import { TiHome } from "react-icons/ti";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import fav from "../../assets/images/favicon.gif";
import LanguageChanger from "../../components/common/languageChange";
import { useSearch } from "../../hooks/useSearch";
import { getRawCookie, handleLogout } from "../../lib/utlis";
import Attendant from "../../pages/mobile/attendant/attendant";
import DayOffPage from "../../pages/mobile/dayoff/dayOff";
import MobileHomePage from "../../pages/mobile/home/home";
import Information from "../../pages/mobile/infomation/page";
import WagePage2 from "../../pages/mobile/wage2/page";
import { useMobileAppStore } from "../../store/mobile.app";
import { useUserInfoStore } from "../../store/userinfo";
import { Navbar } from "./components/nav";
import { checkCookieNSession } from "./utils";
import Asset from "../../pages/mobile/asset/asset";
import ScrollToTop from "../../lib/ScrollToTop";
import Loading from "./components/loading";
import CookieChecking from "./checkCookie";

export interface IMobileMainLayoutProps {}

const MainLayout = styled.div`
  /* width: 100vw; */
`;

const Content = styled.div`
  position: relative;
  flex: 1;
  background-color: white;
  margin-top: 8px;
  & * {
    animation: fadeOn 0.2s ease-in-out;
  }
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
      // alert(JSON.stringify(error));
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
    if (activeTab === "asset") return <Asset />;
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
      case "asset":
        setHeader(t("assetPage.title"));
        break;
      default:
        setHeader(cookiesInfo[0]);
    }
  }, [activeTab, t]);

  if (authening)
    return (
      <div>
        <CookieChecking />
      </div>
    );

  return (
    <MainLayout
      className={`min-h-dvh !animate-none ${device === "pc" ? "py-4" : ""}`}
    >
      <div className="!animation-none relative w-full max-w-[500px] bg-white">
        <ScrollToTop />
        <Loading />
        <Header />
        <Content>
          <Outlet />
        </Content>
      </div>
    </MainLayout>
  );
}

const HeaderNav = () => {
  const navigate = useNavigate();
  const { header } = useMobileAppStore();
  const params = useParams();
  const pathName = React.useMemo(() => {
    return window.location.pathname;
  }, [window.location.pathname]);

  const isHomePage = React.useMemo(
    () => window.location.pathname === "/",
    [window.location.pathname],
  );

  const handleNavigate = () => {
    const pathNameArr = pathName.split("/");
    console.log(pathNameArr);
    if (pathName.includes("/asset-check/")) {
      if (pathNameArr[3])
        // /asset-check/masterId/departmentId
        return navigate(`asset-check/${pathNameArr[2]}`);
      if (pathNameArr[2])
        // /asset-check/masterId
        return navigate(`asset`);
    }
    // if (pathName.includes("/asset-check/")) {
    return navigate("/");
    // }
    navigate("/");
  };

  return (
    <div
      className="ml-0.5 flex items-center gap-4"
      onClick={() => {
        handleNavigate();
      }}
    >
      {!(pathName === "/") ? (
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
      <p className="line-clamp-1 text-lg font-bold">{header}</p>
    </div>
  );
};

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
      <div
        className="mb-4 flex w-full flex-col"
        style={{ borderBottom: "1px solid #ddd" }}
      >
        <div className="flex h-14 items-center justify-between bg-white px-2 py-1 text-gray-600">
          <HeaderNav />

          <div className="option flex items-center gap-1">
            <div className="flex w-7 items-center justify-center">
              <TiHome
                onClick={() => {
                  navigate("/");
                }}
                size={26}
                className="text-gray-400"
              />
            </div>
            <div className="flex w-7 items-center justify-center">
              <LanguageChanger />
            </div>

            <div
              className="flex w-7 items-center justify-center"
              onClick={() => setShowav(true)}
            >
              <FaCubes size={22} className="text-gray-400" />
            </div>

            <div
              className="flex w-7 items-center justify-center"
              onClick={() => {
                navigate("/information");
                // setSearchParams({ tab: "information" });
              }}
            >
              <BiSolidUser size={22} className="text-gray-400" />
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
