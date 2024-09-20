import { Badge, Tooltip } from "@mui/material";
import {
  Avatar,
  Button,
  Dropdown,
  Image,
  MenuProps,
  Modal,
  Popover,
} from "antd";
import * as React from "react";
import { IoNotifications } from "react-icons/io5";
import { useMobileAppStore } from "../../../../store/mobile.app";
import { CgSmileMouthOpen } from "react-icons/cg";
import { useTranslation } from "react-i18next";
import DarkmodeSwitch from "../../../../components/common/darkmodeSwitch";
import jahwaIcon from "../../../../assets/images/icon3.png";
import { removeCookie } from "../../../../lib/utlis";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserInfoStore } from "../../../../store/userinfo";
import LanguageChanger from "../../../../components/common/languageChange";
import { FaBarsStaggered } from "react-icons/fa6";
import { LuLogOut } from "react-icons/lu";
import jahwaIcon3 from "../../../../assets/images/icon3.png";

export interface IHomeHeaderProps {}

const StyledHeader = styled.div``;

export default function HomeHeader(props: IHomeHeaderProps) {
  const navigate = useNavigate();
  const { user } = useUserInfoStore();
  console.log(user);

  const handleLogout = () => {
    removeCookie("auth");
    navigate("/m");
  };

  const [headerUserOptions] = React.useState([
    {
      key: 1,
      label: <div style={{ fontSize: "14px" }}>{user.NAME}</div>,
    },
    {
      key: 2,
      label: (
        <div style={{ fontSize: "12px", color: "#666" }}>No: {user.EMP_NO}</div>
      ),
    },
    {
      key: 3,
      label: (
        <div style={{ fontSize: "12px", color: "#666" }}>
          {user.chucvi} - {user.DEPT_NM}
        </div>
      ),
    },
    {
      key: 5,
      label: (
        <Button
          danger
          type="primary"
          block
          style={{ margin: "0px -12px", width: "calc( 100% + 24px)" }}
          onClick={handleLogout}
        >
          Đăng xuất
        </Button>
      ),
    },
  ]);

  return (
    <StyledHeader className="relative flex items-end gap-4 py-1 [&>*]:text-white">
      <div className="relative z-10 flex w-full items-center px-2">
        <img src={jahwaIcon} alt="jahwa" className="h-10 w-14" />
        <div className="">{}</div>
        <p className="ml-2 line-clamp-1 flex-1 uppercase text-white">
          jahwa vina
        </p>
        <div className="flex gap-1">
          <Dropdown menu={{ items: headerUserOptions }} placement="bottom">
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
              alt="avatar"
            />
          </Dropdown>

          <LanguageChanger />
        </div>
      </div>
    </StyledHeader>
  );
}

const AvatarItem = () => {
  const navigate = useNavigate();
  const { user } = useUserInfoStore();

  const logout = (params) => {
    removeCookie("auth");
    removeCookie("emp");
    navigate("/");
  };

  return (
    <div className="shadow shadow-red-400">
      <div
        className="flex w-full justify-center"
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
          transform: "translateY(-50%)",
        }}
      >
        <Image
          style={{ borderRadius: "999px", border: "2px solid #546cda" }}
          src={user.avatar}
          height={72}
          width={72}
        />
        {/* <div
          style={{
            background:
              'url("https://bizweb.dktcdn.net/thumb/grande/100/409/603/articles/bao-gia-in-anh-the-lay-ngay.jpg?v=1631007259167") center center / cover no-repeat',
            width: "72px",
            height: "72px",
            borderRadius: "999px",
          }}
        ></div> */}
      </div>
      <div style={{ marginTop: "-32px", textAlign: "center", color: "#888" }}>
        <div style={{ fontSize: "18px", color: "#1d3fd8" }}>{user.NAME}</div>
        <div
          style={{
            fontSize: "14px",
            marginTop: "-4px",
            textAlign: "center",
          }}
        >
          {user.EMAIL_ADDR}
        </div>
        {user.chucvi} - {user.DEPT_NM}
        <div>{user.EMP_NO}</div>
        <Button
          onClick={logout}
          block
          danger
          type="primary"
          style={{ marginTop: "8px" }}
          icon={<LuLogOut size={18} />}
          iconPosition="end"
        >
          <p style={{ paddingBottom: "2px" }}>Đăng xuất</p>
        </Button>
      </div>
    </div>
  );
};

export const HeaderNew = ({ title }: { title: React.ReactNode }) => {
  const navigate = useNavigate();
  const { user } = useUserInfoStore();
  return (
    <div className="flex items-center gap-3">
      <div className="nav-bar" onClick={() => navigate("/m/app/home")}>
        {/* <FaBarsStaggered color="white" size={20} className="h-7" /> */}
        <img src={jahwaIcon3} alt="jahwa" className="h-5" />
      </div>
      <Popover placement="bottomRight" className="" title={<AvatarItem />}>
        <Avatar
          src={user.avatar}
          // size="norma;"
          className="shadow shadow-indigo-400"
        />
      </Popover>
      <div className="page-name line-clamp-1 flex-1 pr-4 text-center text-sm text-gray-50">
        {title}
      </div>
      <div className="options">
        <LanguageChanger />
      </div>
    </div>
  );
};
