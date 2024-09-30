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

export interface IMobileWage3Props {}

export default function MobileWage3(props: IMobileWage3Props) {
  return (
    <div className="flex h-screen w-full flex-col overflow-auto bg-slate-100">
      <Header />

      <div
        className="flex-1 overflow-scroll px-2"
        style={{ height: "calc(100dvh - 40px)", scrollSnapType: "y proximity" }}
      >
        <ChangeDate />

        <Overview />
        <Payment />

        <PayDetail />
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
      className="z-[999] flex h-16 w-full items-center justify-between bg-[e2e8f088] px-2 py-1 pt-3 text-white"
      // style={{ borderBottom: "1px solid #c0c0c0" }}
    >
      <SidebarToggle color="#555" size={10} />
      <p className="text-lg font-medium uppercase text-gray-700">Bảng lương</p>
      <LanguageChanger />
    </div>
  );
};
