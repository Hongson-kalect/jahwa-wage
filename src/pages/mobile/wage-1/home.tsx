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
import { ImCoinPound } from "react-icons/im";

import Overview from "./ui/overview";
import Payment from "./ui/payment";
import PayDetail from "./ui/payDetail";
import DeDuctDetail from "./ui/deductDetail";
import ChangeDate from "./ui/changeDate";
import { useNavigate } from "react-router-dom";
import { useMobileAppStore } from "../../../store/mobile.app";
import { useQuery } from "@tanstack/react-query";
import { httpPost } from "../../../api/axios";

export interface IMobileWage1Props {}

export default function MobileWage1(props: IMobileWage1Props) {
  const { setHeader, device } = useMobileAppStore();

  const getWageData = async () => {
    try {
      const res = await httpPost("https://jhapi.jahwa.co.kr/MSelectList", {
        DIV: "202406",
        Data: "",
        EntCode: "V22111014",
      });
      console.log("get wage", res.data);
      return res.data;
    } catch (error) {
      console.log("get wage", error);
      return {};
    }
  };

  const wageData = useQuery({
    queryFn: getWageData,
    queryKey: ["getWageData"],
  });

  React.useEffect(() => {
    setHeader("Bảng lương");
  }, []);

  if (device === "phone") return <MobilePage />;
  return <PcPage />;
}

const MobilePage = () => {
  return (
    <div className="flex h-screen w-full flex-col overflow-auto">
      {/* <Header /> */}
      <div
        className="flex-1 overflow-scroll px-2 pt-14"
        style={{ height: "calc(100dvh - 40px)", scrollSnapType: "y proximity" }}
      >
        <ChangeDate />
        <Overview />
        {/* <Payment /> */}
        <PayDetail />

        <DeDuctDetail />
        <div className="h-4"></div>
      </div>
    </div>
  );
};

const PcPage = () => {
  return <p className="mt-24">PC page này em ây</p>;
};
