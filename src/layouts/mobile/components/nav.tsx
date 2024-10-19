import * as React from "react";
import { ImCoinPound } from "react-icons/im";
import { useNavigate } from "react-router-dom";
import LanguageChanger from "../../../components/common/languageChange";
import { getRawCookie, handleLogout } from "../../../lib/utlis";
import { useTranslation } from "react-i18next";

export interface INavBarProps {}

export const Navbar = ({
  showNav,
  onClose,
}: {
  showNav: boolean;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <div
      className={`fixed inset-0 flex w-screen duration-300 ${!showNav ? "translate-x-[-100%]" : "translate-x-0"} z-[100]`}
    >
      <div
        className={`relative left-0 top-0 z-[100] flex h-screen w-96 flex-col bg-white`}
        style={{ maxWidth: "80vw" }}
      >
        <div className="" style={{ borderBottom: "1px solid #ddd" }}>
          <div className="relative flex items-center justify-between px-1 pt-1">
            <p className="text-sm text-gray-400">Nhân viên IT - 330700</p>
            <div className="absolute right-1 top-2 flex -skew-x-6 flex-col items-center justify-center rounded-lg font-medium italic text-white">
              <LanguageChanger />
              <div className="mt- px-2 text-right text-xs italic text-gray-400">
                Q6 - E2
              </div>
            </div>
          </div>
          <div className="flex items-start gap-4 px-2 pt-4">
            <div
              className="flex h-[62px] w-[62px] items-center justify-center rounded-full"
              style={{
                border: "2px solid #888",
                background: `url('https://gw.jahwa.co.kr/Photo/VNERP/${getRawCookie("EmpCode")}.JPG') center center / cover no-repeat`,
              }}
            >
              {/* <p className="text-3xl">A</p> */}
            </div>
            <div>
              <p className="mt-1 text-xl font-semibold text-blue-900">
                V22406013
              </p>
              <p className="mt-1 font-medium text-gray-600">Diệp Hồng Sơn</p>
            </div>
          </div>
          <div className="mb-2 mt-5 flex justify-between px-2 text-gray-500">
            <p>Quản lý EMVC</p>
            <p>dh.son@jahwa.co.kr</p>
          </div>
          <div></div>
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-1">
          <div className="flex h-full flex-col overflow-auto">
            <div className="flex-1 overflow-auto">
              <div className="pt-2">
                <NavItem
                  icon={<ImCoinPound size={32} />}
                  title={t("sidebar.wage")}
                  link="/wage1"
                  onChange={onClose}
                />
                <NavItem
                  icon={<ImCoinPound size={32} />}
                  title={t("sidebar.attendance")}
                  link="/attendant"
                  onChange={onClose}
                />
                <NavItem
                  icon={<ImCoinPound size={32} />}
                  title={t("sidebar.asset")}
                  link="/asset"
                  onChange={onClose}
                />
              </div>
            </div>
            <div className="" style={{ borderTop: "1px solid #ffc5c5" }}>
              <NavItem
                icon={<ImCoinPound size={32} />}
                title={t("common.logout")}
                link="/asset"
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
    const linkTo = props.link?.split("/")?.[1];
    if (window.location.pathname.split("/")?.[1] !== linkTo) {
      props.link && navigate(props.link);
      props.onChange();
    }
  };

  return (
    <div
      className={`flex items-center gap-4 px-4 py-3 ${active ? "bg-blue-600 pl-5" : ""} ${props.danger ? "bg-red-50 [&>*]:text-red-600" : ""}`}
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
