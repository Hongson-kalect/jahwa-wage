import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserInfoStore } from "../../store/userinfo";
import { getRawCookie, handleLogout } from "../../lib/utlis";
import { httpGet } from "../../api/axios";
import { checkCookieNSession } from "./utils";
import MobileAppBottom from "./components/app.bottom";
import { ImCoinPound } from "react-icons/im";
import LanguageChanger from "../../components/common/languageChange";
import { SidebarToggle } from "../../pages/mobile/wage-1/components/sidebarToggle";
import { useMobileAppStore } from "../../store/mobile.app";

export interface IMobileMainLayoutProps {}

const MainLayout = styled.div`
  height: 100dvh;
  width: 100vw;
  /* border: 1px solid gray; */
  /* margin: -1px; */
  /* border-radius: 20px; */
  overflow: hidden;
`;

export default function MobileMainLayout(props: IMobileMainLayoutProps) {
  const { user, setUser } = useUserInfoStore();

  const { setDevice } = useMobileAppStore();
  const [authening, setAuthening] = React.useState(true);

  const verifyUser = async () => {
    try {
      setAuthening(true);
      const result = await checkCookieNSession();
      console.log("result :>> ", result);
      if (result !== "") {
        handleLogout();
      }

      await fetchUserData();
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

  React.useEffect(() => {
    verifyUser();
  }, []);

  if (authening) return <div>Cheking cookie</div>;

  return (
    <MainLayout className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-auto">
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

const Navbar = ({
  showNav,
  onClose,
}: {
  showNav: boolean;
  onClose: () => void;
}) => {
  return (
    <div
      className={`fixed inset-0 flex w-screen duration-300 ${!showNav ? "translate-x-[-100%]" : "translate-x-0"} z-[100]`}
    >
      <div
        className={`relative left-0 top-0 z-[100] h-screen w-96 bg-white`}
        style={{ maxWidth: "80vw" }}
      >
        <div className="" style={{ borderBottom: "1px solid #ddd" }}>
          <div className="relative flex items-center justify-between px-4 pt-2">
            <p className="text-2xl font-medium text-blue-900">Diệp Hồng Sơn</p>
            <div className="rounded-lgfont-medium absolute right-1 top-2 flex -skew-x-6 items-center justify-center italic text-white">
              <LanguageChanger />
            </div>
          </div>
          <div className="px-2 text-right text-sm italic text-gray-700">
            Q6 - E2
          </div>
          <div className="flex items-start gap-4 px-2 pt-4">
            <div
              className="flex h-[62px] w-[62px] items-center justify-center rounded-full bg-white"
              style={{ border: "2px solid #888" }}
            >
              <p className="text-3xl">A</p>
            </div>
            <div>
              <p className="mt-1 text-xl font-semibold text-blue-900">
                V22406013
              </p>
              <p className="mt-1 font-medium text-gray-600">
                Nhân viên IT - 330700
              </p>
            </div>
          </div>
          <div className="mb-2 mt-5 flex justify-between px-2 text-gray-500">
            <p>Quản lý EMVC</p>
            <p>dh.son@jahwa.co.kr</p>
          </div>
          <div></div>
        </div>

        <div className="mt-4 flex flex-col gap-1">
          <NavItem
            icon={<ImCoinPound size={32} />}
            title="Bảng lương"
            link="/wage1"
            onChange={onClose}
          />
          <NavItem
            icon={<ImCoinPound size={32} />}
            title="Thời gian đi làm"
            link="/home"
            onChange={onClose}
          />
          <NavItem
            icon={<ImCoinPound size={32} />}
            title="Thông tin phép năm"
            link="/profile"
            onChange={onClose}
          />
          <NavItem
            icon={<ImCoinPound size={32} />}
            title="Quản lý tài sản"
            link="/calendar"
            onChange={onClose}
          />
          {/* <NavItem
            icon={<ImCoinPound size={32} color="#aaa" />}
            title="Bảng lương"
            link="/wage"
          /> */}
        </div>
      </div>
      <div
        className={`flex-1 duration-500 ${showNav ? "bg-[#00000088]" : "max-w-0 bg-white"} `}
        onClick={onClose}
      ></div>
    </div>
  );
};

type NavItemType = {
  icon?: React.ReactNode;
  title?: string;
  link?: string;
  onChange: () => void;
};

const NavItem = (props: NavItemType) => {
  const navigate = useNavigate();
  const active = React.useMemo(() => {
    const linkTo = props.link?.split("/")?.[1];
    if (linkTo) {
      if (window.location.pathname.split("/")?.[1] === linkTo) return true;
    }
    return false;
  }, [window.location.pathname, props.link]);

  const handlenavigate = () => {
    const linkTo = props.link?.split("/")?.[1];
    if (window.location.pathname.split("/")?.[1] !== linkTo) {
      props.link && navigate(props.link);
      props.onChange();
    }
  };

  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 duration-200 ${active ? "bg-blue-600 pl-5" : ""}`}
      onClick={handlenavigate}
    >
      <div
        className={`flex items-center ${active ? "text-white" : "text-gray-400"}`}
      >
        {props.icon}
      </div>
      <p
        className={`text-lg font-medium ${active ? "text-white" : "text-gray-500"}`}
      >
        {props.title}
      </p>
    </div>
  );
};
