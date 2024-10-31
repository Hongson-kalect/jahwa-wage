import * as React from "react";
import { getWageData, getWageMonth, getWageType } from "./utils";

import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { useMobileAppStore } from "../../../store/mobile.app";
import ChangeDate from "./ui/changeDate";
import DeDuctDetail from "./ui/deductDetail";
import Overview from "./ui/overview";
import PayDetail from "./ui/payDetail";
import { WorkData, WorkMonth, WorkType } from "./interface";
import { Skeleton } from "antd";

export interface IMobileWage1Props {}

export default function MobileWage1(props: IMobileWage1Props) {
  const { device } = useMobileAppStore();

  if (device === "phone") return <MobilePage />;
  return <PcPage />;
}

const MobilePage = () => {
  const { setHeader, empCode, entCode } = useMobileAppStore();
  const { t } = useTranslation();

  const [date, setDate] = React.useState(
    new Date(
      new Date().getFullYear(),
      new Date().getMonth() - 1,
      new Date().getDate(),
    ),
  );
  const [isYear, setIsYear] = React.useState(false);

  const wageMonth = useQuery<WorkMonth>({
    queryFn: () => getWageMonth(),
    queryKey: ["getWageMonth"],
  });

  const wageType = useQuery<WorkType>({
    queryFn: () =>
      getWageType(
        date.getFullYear() + (date.getMonth() + 1).toString().padStart(2, "0"),
      ),
    queryKey: ["getWageType", date],
  });

  const wageData = useQuery<WorkData>({
    queryFn: () =>
      getWageData(
        date.getFullYear() + (date.getMonth() + 1).toString().padStart(2, "0"),
      ),
    queryKey: ["getWageData", date],
  });

  React.useEffect(() => {
    setHeader(t("header.wage"));
  }, [t]);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-auto">
      {/* <Header /> */}
      <div
        className="flex-1 overflow-scroll px-2 pt-14"
        style={{ height: "calc(100dvh - 40px)", scrollSnapType: "y proximity" }}
      >
        <div className="flex items-end justify-between pt-2">
          <div className="">
            <p className="font-medium text-gray-700">{t("common.realGet")}</p>
            <div className="relative mt-2 text-blue-900">
              <div className="relative mt-2 text-blue-900">
                {wageData.isPending ? (
                  <Skeleton.Input className="mr-2 h-7" active />
                ) : wageData.data?.Table3?.[0]?.REAL_PROV_AMT ? (
                  <>
                    <p className="pr-3 text-3xl font-medium">
                      {wageData.data?.Table3?.[0]?.REAL_PROV_AMT}
                    </p>
                    <p className="absolute right-0 top-0 font-medium">đ</p>
                  </>
                ) : (
                  <p>\ \ \ \ \ \ \ \ \ \ \ \</p>
                )}
              </div>
            </div>
            <p className="font-light text-gray-300">
              {t("wage.payAt")}: 10-06-2024
            </p>
          </div>

          <ChangeDate
            date={date}
            setDate={setDate}
            isYear={isYear}
            setIsYear={setIsYear}
          />
        </div>
        <Overview wageData={wageData.data} />
        {/* <Payment /> */}
        <PayDetail isLoading={wageData.isPending} wageData={wageData.data} />

        <DeDuctDetail isLoading={wageData.isLoading} wageData={wageData.data} />
        <div className="h-4"></div>
      </div>
    </div>
  );
};

const PcPage = () => {
  return <p className="mt-24">PC page này em ây</p>;
};
