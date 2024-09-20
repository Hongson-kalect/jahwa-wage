import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import * as React from "react";
import { FaCalendarXmark, FaSackDollar, FaUser } from "react-icons/fa6";
import { IoHomeSharp } from "react-icons/io5";
import { MdNotifications } from "react-icons/md";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { routerMainPath } from "../../../config/router";
import { useMobileAppStore } from "../../../store/mobile.app";
import { FaCalendarCheck } from "react-icons/fa";
import { t } from "i18next";

export interface IMobileAppBottomProps {}
const StyledPaper = styled(Paper)`
  div {
    .MuiButtonBase-root {
      color: gray;
    }
    .Mui-selected {
      color: #173096;
      /* color: white; */
    }
  }
`;

export default function MobileAppBottom(props: IMobileAppBottomProps) {
  const { selectedApp, setSelectedApp } = useMobileAppStore();
  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    if (
      // ["home", "wage", "day-off", "calendar", "profile"].includes(selectedApp)
      true
    ) {
      navigate(`/m/${routerMainPath.app}/${selectedApp}`);
    } else {
      navigate(`/m/${routerMainPath.app}/home`);
    }
  }, [selectedApp]);
  return (
    <StyledPaper
      sx={{ position: "fixed", bottom: 0, left: 0, right: 0 }}
      elevation={3}
      className="z-10 h-10 overflow-hidden px-2 shadow shadow-primary-5 dark:[&>div]:bg-black dark:[&_.Mui-selected]:!text-blue-500"
    >
      <BottomNavigation
        className="h-10"
        showLabels
        value={selectedApp}
        onChange={(event, newValue) => {
          setSelectedApp(newValue);
        }}
      >
        <BottomNavigationAction
          label={t("sidebar.home")}
          value={"home"}
          icon={<IoHomeSharp size={20} />}
        />
        <BottomNavigationAction
          label={t("sidebar.calendar")}
          value={"calendar"}
          icon={<FaCalendarCheck size={20} />}
        />
        <BottomNavigationAction
          label={t("sidebar.wage")}
          value={"wage"}
          icon={<FaSackDollar size={20} />}
        />
        <BottomNavigationAction
          label={t("sidebar.dayOff")}
          value={"day-off"}
          icon={<FaCalendarXmark size={20} />}
        />
        <BottomNavigationAction
          label={t("sidebar.seft")}
          value={"profile"}
          icon={<FaUser size={18} />}
        />
      </BottomNavigation>
    </StyledPaper>
  );
}

const StyledButtonItem = styled.div`
  transition: all 0.3s ease-in-out;
  padding: 6px 0px;
  border-radius: 16px;
  flex: 1;
  svg {
    font-size: 26px;
    fill: gray;
    color: gray;
  }
  p {
    display: none;
  }
  &.active {
    flex: 1.5;
    svg {
      font-size: 28px;
      fill: white;
      color: white;
    }
    p {
      display: block;
    }
  }
`;

type BottomProps = {
  active?: boolean;
  icon: React.ReactNode;
  title: string;
  link: string;
};
export const BottomItem = ({ link, icon, title }: BottomProps) => {
  const { selectedApp, setSelectedApp } = useMobileAppStore();

  return (
    <StyledButtonItem
      onClick={() => setSelectedApp(link)}
      className={`${selectedApp === link ? "active bg-primary-4 [&>*]:text-white" : ""} flex items-center justify-center gap-2`}
    >
      {icon}
      <p className="text-lg font-light">{title}</p>
    </StyledButtonItem>
  );
};
