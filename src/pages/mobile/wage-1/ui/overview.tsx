import * as React from "react";
import { FaPersonDigging } from "react-icons/fa6";
import { numberToCurrency2 } from "../../wage/utils";
import { useTranslation } from "react-i18next";
import { WorkData } from "../interface";
import { Skeleton } from "antd";

export interface IOverviewProps {
  wageData?: WorkData;
}

export default function Overview({ wageData }: IOverviewProps) {
  const { t } = useTranslation();

  return (
    <div
      className="mt-8 rounded-lg shadow-inner shadow-gray-300"
      style={{ borderBottom: "1px solid #bebebe" }}
    >
      {!wageData?.Table3?.[0]?.PROV_TOT_AMT ? (
        <div className="flex flex-col items-center justify-center gap-2 py-6">
          <p className="text-gray-300">Tháng này</p>
          <p className="text-2xl text-gray-400">Chưa có lương</p>
        </div>
      ) : (
        <>
          <div className="flex justify-around py-4">
            <div className="flex flex-col items-center justify-center">
              <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-medium text-white shadow shadow-blue-400">
                28
              </p>
              <p className="mt-1 text-base text-slate-400">
                {t("wage.dayWorkCount")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-medium text-white shadow shadow-blue-400">
                2400
              </p>
              <p className="mt-1 text-base text-slate-400">
                {t("wage.hourWorkCount")}
              </p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-xl font-medium text-white shadow shadow-blue-400">
                1200
              </p>
              <p className="mt-1 text-base text-slate-400">
                {t("wage.overtimeCount")}
              </p>
            </div>
          </div>

          <div className="flex" style={{ borderTop: "1px solid #ddd" }}>
            <div
              className="flex flex-1 flex-col items-center pb-2"
              style={{ borderRight: "1px solid #ddd" }}
            >
              <p className="mt-2 w-full pl-3 text-sm text-slate-400">
                {t("wage.bonusDetail")}
              </p>
              <div className="relative mt-3 px-2 text-center text-2xl font-medium text-green-700 opacity-80">
                {wageData?.Table3?.[0]?.PROV_TOT_AMT ? (
                  <>
                    <p>{wageData?.Table3?.[0]?.PROV_TOT_AMT}</p>
                    <p className="absolute right-0 top-0 text-sm">đ</p>
                  </>
                ) : (
                  <div className="w-full">
                    <Skeleton.Input
                      className="h-6 w-32 overflow-hidden"
                      active
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="relative flex flex-1 flex-col items-center">
              <p className="mt-2 w-full pl-3 text-sm text-slate-400">
                {t("wage.deductDetail")}
              </p>
              <div className="relative mt-3 px-2 text-center text-2xl font-medium text-red-700 opacity-80">
                {wageData?.Table3?.[0]?.SUB_TOT_AMT ? (
                  <>
                    <p>{wageData?.Table3?.[0]?.SUB_TOT_AMT}</p>
                    <p className="absolute right-0 top-0 text-sm">đ</p>
                  </>
                ) : (
                  <Skeleton.Input className="h-6 w-32 overflow-hidden" active />
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
