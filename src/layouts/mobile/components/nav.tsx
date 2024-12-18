import * as React from "react";
import { ImCoinPound } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import LanguageChanger from "../../../components/common/languageChange";
import { getRawCookie, handleLogout } from "../../../lib/utlis";
import { useTranslation } from "react-i18next";
import { FaCalendarDays, FaSackDollar } from "react-icons/fa6";
import { RiComputerLine, RiLogoutBoxFill } from "react-icons/ri";
import { AiOutlineDollar } from "react-icons/ai";
import { MdOutlineCalendarToday } from "react-icons/md";
import { IoCalendarOutline } from "react-icons/io5";
import { SlLogout } from "react-icons/sl";
import { useUserInfoStore } from "../../../store/userinfo";
import { BsFillPersonCheckFill } from "react-icons/bs";
import { PiMicrosoftOutlookLogoFill } from "react-icons/pi";

export interface INavBarProps {}

export const Navbar = ({
  showNav,
  onClose,
}: {
  showNav: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();
  const { user } = useUserInfoStore();
  console.log("user :>> ", user);

  const imgUrl = React.useMemo(() => {
    return (
      "https://gw.jahwa.co.kr/Photo/" +
      decodeURIComponent(getRawCookie("Photo") || "")
    );
  }, []);

  return (
    <div
      className={`absolute inset-0 flex w-full duration-300 ${!showNav ? "translate-x-[-100%]" : "translate-x-0"} z-[999]`}
    >
      <div
        className={`relative left-0 top-0 z-[100] flex h-full w-96 flex-col bg-white`}
        style={{ maxWidth: "80vw" }}
      >
        <div className="" style={{ borderBottom: "1px solid #ddd" }}>
          <div className="relative flex items-center justify-between px-1 pt-1">
            <div className="flex items-start gap-4 px-2">
              <div
                className="flex h-[62px] w-[62px] items-center justify-center rounded-full"
                style={{
                  border: "2px solid #666",
                  background: `url('${imgUrl}') center top / cover no-repeat`,
                }}
              >
                {/* <p className="text-3xl">A</p> */}
              </div>
              <div>
                <p className="mt-1 text-lg font-bold text-blue-800">
                  {user?.NAME}
                </p>
                <p className="text-sm font-bold text-gray-700">
                  {" "}
                  {user?.EMP_NO}
                </p>
                <p className="text-xs text-gray-700"> {user?.EMAIL_ADDR}</p>
              </div>
            </div>
            <div className="absolute right-1 top-2 flex -skew-x-6 flex-col items-center justify-center rounded-lg font-bold italic text-white">
              <LanguageChanger />
              <div className="mt- px-1 text-right text-xs italic text-gray-400"></div>
            </div>
          </div>

          <div className="mb-2 mt-5 flex justify-between px-2 text-gray-600">
            <p className="text-sm">{user?.ROLE_CD_NM}</p>
            <p className="text-sm">{user?.DEPT_NM}</p>
          </div>
          <div></div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1">
          <div className="flex h-full flex-col overflow-auto">
            <div className="flex-1 overflow-auto">
              <div className="pt-2">
                {/* <NavItem
                  icon={<AiOutlineDollar size={28} />}
                  title={t("sidebar.payRoll")}
                  link="/wage"
                  onChange={onClose}
                /> */}
                {/* <NavItem
                  icon={<AiOutlineDollar size={28} />}
                  title={t("sidebar.wage")}
                  link="/wage1"
                  onChange={onClose}
                /> */}
                {/* <NavItem
                  icon={<IoCalendarOutline size={28} />}
                  title={t("sidebar.attendance")}
                  link="/attendant"
                  onChange={onClose}
                />
                <NavItem
                  icon={<BsFillPersonCheckFill size={28} />}
                  title={t("sidebar.infomation")}
                  link="/infomation"
                  onChange={onClose}
                /> */}
                <NavItem
                  icon={
                    <div className="flex h-5 w-8 -skew-x-6 items-center justify-center rounded-[50%] bg-green-700 text-[11px] font-bold italic text-white">
                      GW
                    </div>
                  }
                  title={t("sidebar.gw")}
                  link="https://gw.jahwa.co.kr/"
                  onChange={onClose}
                />
                <NavItem
                  icon={
                    <div className="mt-[1px] w-8">
                      <PiMicrosoftOutlookLogoFill
                        size={28}
                        className="text-[#185abd]"
                      />
                    </div>
                  }
                  title={t("sidebar.outlook")}
                  link="https://outlook.office365.com/"
                  onChange={onClose}
                />

                {/* Cái này đến trang quản lý tài sản nè */}
                {/* <NavItem
                  icon={<RiComputerLine size={28} />}
                  title={t("sidebar.asset")}
                  link="/asset"
                  onChange={onClose}
                /> */}
              </div>
            </div>
            <div className="" style={{ borderTop: "1px solid #ffc5c5" }}>
              <NavItem
                icon={<RiLogoutBoxFill size={32} />}
                title={t("sidebar.logout")}
                // link="/asset"
                danger
                onChange={handleLogout}
              />
            </div>
          </div>
          {/* <NavItem
              icon={<ImCoinPound size={32} color="#aaa" />}
              title="Bảng lương"
              link="/wage"
            /> */}
        </div>
      </div>
      <div
        className={`flex-1 duration-1000 ${showNav ? "bg-[#00000088]" : "max-w-0 bg-white"} `}
        onClick={onClose}
      ></div>
    </div>
  );
};

type NavItemType = {
  icon?: React.ReactNode;
  title?: string;
  link?: string;
  danger?: boolean;
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
    if (props.link?.includes("http")) {
      window.open(props.link, "_blank");
    } else {
      const linkTo = props.link?.split("/")?.[1];
      if (window.location.pathname.split("/")?.[1] !== linkTo) {
        props.link && navigate(props.link);
        props.onChange();
      }
    }
  };

  return (
    <div
      className={`flex cursor-pointer items-center gap-4 px-4 py-3 ${active ? "bg-blue-600 pl-5" : ""} ${props.danger ? "bg-red-50 [&>*]:text-red-600" : ""}`}
      onClick={handlenavigate}
    >
      <div
        className={`flex items-center ${active ? "text-white" : "text-gray-400"}`}
      >
        {props.icon}
      </div>
      <p
        className={`line-clamp-1 text-lg font-medium ${active ? "text-white" : "text-gray-900"}`}
      >
        {props.title}
      </p>
    </div>
  );
};
