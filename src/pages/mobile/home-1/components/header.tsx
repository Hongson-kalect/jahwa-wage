import { Badge, Tooltip } from "@mui/material";
import { Avatar, Button, Dropdown, MenuProps, Modal } from "antd";
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

export interface IHomeHeaderProps {}

const StyledHeader = styled.div`
  /* &::before {
    position: absolute;
    content: "";
    height: 200px;
    width: 200px;
    border-radius: 999px;
    background-color: #2c2727;
    top: 10px;
    right: 20%;
  }
  &::after {
    position: absolute;
    content: "";
    height: 100px;
    width: 100px;
    border-radius: 999px;
    background-color: #291414;
    bottom: 10px;
    right: 60%;
  } */
`;

export default function HomeHeader(props: IHomeHeaderProps) {
  // const [notify, setNotify] = React.useState(0);
  // const [showChangeLang, setChangeLang] = React.useState(false);
  // const { language, setLanguage } = useMobileAppStore();
  // const { t, i18n } = useTranslation();
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
    // {
    //   key: 4,
    //   label: <div style={{ fontSize: "12px", color: "#666" }}>Cài đặt</div>,
    // },
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
    // { key: 6, label: <p>Options 1</p> },
    // { key: 7, label: <p>Options 1</p> },
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

          {/* <div className="px-1">
          <DarkmodeSwitch size="8px" />
        </div> */}

          <LanguageChanger />
        </div>

        {/* <Badge badgeContent={4} color="error" className="ml-1">
          <IoNotifications
            size={24}
            style={{
              animation: notify > 0 ? "bellRing 3s linear infinite" : "",
              WebkitTransformOrigin: " 50% 0",
            }}
          />
        </Badge> */}
      </div>

      {/* <Modal
        open={showChangeLang}
        onCancel={() => setChangeLang(false)}
        closable={false}
        footer={null}
      >
        <div div>choi ơi</div>
      </Modal> */}
    </StyledHeader>
  );
}
