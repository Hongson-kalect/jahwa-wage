import * as React from "react";
import { FaPersonDigging } from "react-icons/fa6";
import { numberToCurrency2 } from "../../wage/utils";
import { useTranslation } from "react-i18next";

export interface IOverviewProps {}

export default function Overview(props: IOverviewProps) {
  const { t } = useTranslation();
  return (
    <div
      className="mt-1 rounded-lg shadow-inner shadow-gray-600"
      style={{ borderBottom: "1px solid #bebebe" }}
    >
      <div className="flex justify-around py-4">
        <div className="flex flex-col items-center justify-center">
          <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-800 text-2xl font-medium text-white">
            4
          </p>
          <p className="mt-1 text-lg text-gray-500">{t("dayOff.lastYear")}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-800 text-2xl font-medium text-white">
            9
          </p>
          <p className="mt-1 text-lg text-gray-500">{t("dayOff.thisYear")}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-800 text-2xl font-medium text-white">
            0
          </p>
          <p className="mt-1 text-lg text-gray-500">X-RAY</p>
        </div>
      </div>

      <div className="flex" style={{ borderTop: "1px solid #ddd" }}>
        <div
          className="flex flex-1 items-center justify-evenly pb-2"
          style={{ borderRight: "1px solid #ddd" }}
        >
          <p className="mt-2 w-full pl-3 text-gray-500">{t("dayOff.used")}</p>
          <div className="relative mt-3 pr-3 text-2xl font-medium text-red-700">
            12
          </div>
        </div>

        <div className="flex flex-1 items-center pb-2">
          <p className="mt-2 w-full pl-3 text-gray-500">{t("dayOff.left")}</p>
          <div className="relative mt-3 pr-3 text-2xl font-medium text-green-700">
            1
          </div>
        </div>
      </div>
    </div>
  );
}
