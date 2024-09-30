import * as React from "react";
import { SidebarToggle } from "./components/sidebarToggle";
import { Avatar, DatePicker, Select } from "antd";
import LanguageChanger from "../../../components/common/languageChange";
import styled from "styled-components";
import { RiEdit2Line } from "react-icons/ri";
import dayjs from "dayjs";
import { monthNames } from "../../../lib/utlis";
import { numberToCurrency } from "./utils";
import { BiDetail } from "react-icons/bi";
import Overview from "./ui/overview";
import Payment from "./ui/payment";
import PayDetail from "./ui/payDetail";
import DeDuctDetail from "./ui/deductDetail";
import ChangeDate from "./ui/changeDate";

export interface IMobileWage2Props {}

export default function MobileWage2(props: IMobileWage2Props) {
  return (
    <div className="flex h-screen w-full flex-col overflow-auto bg-black">
      <Header />

      <div
        className="flex-1 overflow-scroll px-2"
        style={{ height: "calc(100dvh - 40px)", scrollSnapType: "y proximity" }}
      >
        <ChangeDate />
        <p className="mb-2 ml-2 mt-3 text-2xl font-medium text-white">
          Overview
        </p>
        <Overview />
        <Payment />
        <p className="mb-2 ml-2 mt-10 text-2xl font-semibold text-cyan-600 text-white">
          Chi tiết chi trả
        </p>
        <PayDetail />
        <p className="m-2 ml-2 mt-10 text-2xl font-semibold text-white">
          Chi tiết khấu trừ
        </p>
        <DeDuctDetail />
      </div>
      <div className="h-4"></div>
    </div>
  );
}

const Header = () => {
  const [year, isYear] = React.useState(false);
  return (
    <div
      className="z-[999] flex h-12 w-full items-center justify-between bg-gradient-to-r from-gray-800 via-gray-900 to-black px-2 py-1 text-white"
      // style={{ borderBottom: "1px solid #c0c0c0" }}
    >
      <SidebarToggle color="white" size={10} />
      <p>Bảng lương</p>
      <LanguageChanger />
    </div>
  );
};
