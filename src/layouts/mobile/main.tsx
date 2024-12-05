import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserInfoStore } from "../../store/userinfo";
import { getRawCookie, handleLogout } from "../../lib/utlis";
import { httpGet, httpPost } from "../../api/axios";
import { checkCookieNSession } from "./utils";
import MobileAppBottom from "./components/app.bottom";
import { ImCoinPound } from "react-icons/im";
import LanguageChanger from "../../components/common/languageChange";
import { SidebarToggle } from "../../pages/mobile/wage-1/components/sidebarToggle";
import { useMobileAppStore } from "../../store/mobile.app";
import { Navbar } from "./components/nav";
import { toast } from "react-toastify";
import axios from "axios";

export interface IMobileMainLayoutProps {}

const MainLayout = styled.div`
  /* height: 100dvh; */
  width: 100vw;
  /* border: 1px solid gray; */
  /* margin: -1px; */
  /* border-radius: 20px; */
  /* overflow: hidden; */
`;

export default function MobileMainLayout(props: IMobileMainLayoutProps) {
  const { user, setUser } = useUserInfoStore();
  const { empCode, entCode } = useMobileAppStore();

  const { setDevice } = useMobileAppStore();
  const [authening, setAuthening] = React.useState(true);

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

  const fetchUserData = async () => {
    console.log("code asd lsdl ád", getRawCookie("EmpCode"));
    try {
      console.log("nàn í", "user/" + getRawCookie("EmpCode"));
      const res = await httpGet("user/" + getRawCookie("EmpCode"));
      const data = res.data;
      setUser(
        data?.[0]
          ? {
              ...data?.[0],
              avatar: `https://gw.jahwa.co.kr/Photo/VNERP%2F${getRawCookie("EmpCode")}.JPG`,
            }
          : {},
      );
    } catch (error) {
      console.log("error", error);
    }
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

  // React.useEffect(() => {
  //   getWageMonth();
  //   getWageType();
  //   getWageData();
  // testPythonAPI();
  // }, []);

  React.useEffect(() => {
    verifyUser();
  }, []);

  if (authening) return <div>Cheking cookie</div>;

  return (
    <MainLayout className="h-screen w-screen bg-blue-300">
      <div className="h-full">
        <Header />
        <Outlet />
        <div className="bottom-space mt-2"></div>
      </div>
      {/* <MobileAppBottom /> */}
    </MainLayout>
  );
}

const Header = () => {
  const [showNav, setShowav] = React.useState(false);
  const { header } = useMobileAppStore();
  return (
    <>
      <div
        className="fixed left-0 right-0 top-0 z-[10] flex h-14 w-full items-center justify-between bg-[#ffffffbb] px-2 py-1 text-gray-600 backdrop-blur"
        style={{ borderBottom: "1px solid #9c9c9c" }}
      >
        <SidebarToggle color="gray" size={10} onClick={() => setShowav(true)} />
        <p className="text-lg font-medium uppercase">{header}</p>
        <LanguageChanger />
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
