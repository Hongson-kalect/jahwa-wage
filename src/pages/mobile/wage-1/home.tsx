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
import { useTranslation } from "react-i18next";

export interface IMobileWage1Props {}

export default function MobileWage1(props: IMobileWage1Props) {
  const { setHeader, device } = useMobileAppStore();
  const { t } = useTranslation();
  const getWageData = async () => {
    try {
      const res = await httpPost("https://jhapi.jahwa.co.kr/MSelectList/", {
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
    setHeader(t("header.wage"));
  }, [t]);

  if (device === "phone") return <MobilePage />;
  return <PcPage />;
}

const MobilePage = () => {
  const [isYear, setIsYear] = React.useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex h-screen w-full flex-col overflow-auto">
      {/* <Header /> */}
      <div
        className="flex-1 overflow-scroll px-2 pt-14"
        style={{ height: "calc(100dvh - 40px)", scrollSnapType: "y proximity" }}
      >
        <div className="flex items-end justify-between pt-2">
          <div className="">
            <p className="font-medium text-gray-700">{t("common.realGet")}</p>
            <div className="relative mt-2 text-blue-900">
              <p className="pr-3 text-3xl font-medium">12.765.987</p>
              <p className="absolute right-0 top-0 font-medium">đ</p>
            </div>
            <p className="font-light text-gray-300">
              {t("wage.payAt")}: 10-06-2024
            </p>
          </div>

          <ChangeDate isYear={isYear} setIsYear={setIsYear} />
        </div>
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
