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

export interface IMobileWage4Props {}

export default function MobileWage4(props: IMobileWage4Props) {
  return (
    <div className="flex h-screen w-full flex-col overflow-auto bg-[#fff1f1]">
      <Header />

      <div
        className="flex flex-col gap-2 px-4"
        style={{ height: "calc(100dvh - 40px)", scrollSnapType: "y proximity" }}
      >
        <ChangeDate />

        <Overview />

        <p className="mt-3 text-2xl font-medium text-blue-600">Chi trả</p>
        <Payment />

        <p className="mt-4 text-2xl font-medium text-blue-600">
          Chi tiết chi trả
        </p>
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
    <div>
      <div
        className="z-[999] flex h-48 w-full flex-col items-center justify-between rounded-b-3xl bg-[e2e8f088] bg-red-400 px-2 py-1 pt-3 text-white"
        // style={{ borderBottom: "1px solid #c0c0c0" }}
      >
        <div className="flex w-full justify-between">
          <SidebarToggle color="#000000" size={10} />
          <p className="text-lg font-medium uppercase text-black">Bảng lương</p>
          <LanguageChanger />
        </div>
      </div>
    </div>
  );
};
