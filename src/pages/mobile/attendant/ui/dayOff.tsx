import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { BiInfoCircle, BiSolidLeftArrow } from "react-icons/bi";
import { FaCalendarXmark, FaSackDollar } from "react-icons/fa6";
import { OffDate, OffHour, OffInfo } from "./interface";
import { useMobileAppStore } from "../../../../store/mobile.app";
import { getDayOff } from "./api";
import { scrollToId } from "../../../../lib/utlis";
import BangNghi from "../components/bangnghi";
import { LuCalendarMinus } from "react-icons/lu";
import { MdCalendarMonth } from "react-icons/md";
import { FaBed } from "react-icons/fa";

export interface IDayOffProps {}

export default function DayOff(props: IDayOffProps) {
  const { t } = useTranslation();
  const { setHeader, empCode, entCode } = useMobileAppStore();
  const [dayOffYear, setDayOffYear] = React.useState(
    new Date().getFullYear().toString(),
  );

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 2010 + 1 },
    (_, index) => currentYear - index,
  );

  // const [dayOffYear, setDayOffYear] = React.useState(new Date().getFullYear());

  const getDayOffs = useQuery<{
    Table: [OffInfo];
    Table1: [OffHour];
    Table2: OffDate[];
  }>({
    queryKey: ["dayOff", dayOffYear],
    queryFn: () => getDayOff(dayOffYear),
  });

  React.useEffect(() => {
    setHeader(t("attendantPage.title2"));
  }, []);

  return (
    <div
      className="flex h-full w-full snap-start flex-col overflow-auto"
      id="nghi"
    >
      <div className="bg-white py-2">
        <div className="mx-4 rounded-md bg-white px-2 py-1">
          <div className="flex h-10 items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              {/* <p className="flex-1">{t("attendantPage.year")}:</p> */}
              <MdCalendarMonth size={32} className="text-blue-600" />
              <select
                className="h-8 w-24 border-none px-1 text-lg outline-none"
                value={dayOffYear}
                onChange={(event) =>
                  setDayOffYear(event.target.value.toString())
                }
              >
                {years?.map((item, viTri) => {
                  return (
                    <option
                      key={viTri}
                      value={item}
                      className="text-sm text-gray-700"
                    >
                      {item}
                    </option>
                  );
                })}
              </select>
            </div>

            <p className="flex items-center gap-2 text-lg font-medium text-blue-600">
              <FaBed size={28} /> {getDayOffs?.data?.Table2?.length}{" "}
              {t("common.day")}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 bg-white px-2 py-3">
        <div className="flex items-start gap-2 py-1">
          <BiInfoCircle size={24} />
          <p className="font-bold text-gray-900">
            {t("attendantPage.leaveInfo")}
          </p>
        </div>

        <div className="mx-2 mt-2 text-center">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <p className="text-sm">{t("attendantPage.leaveTotal")}:</p>
              <p>{getDayOffs?.data?.Table[0]?.YEAR_SAVE}</p>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-sm">{t("attendantPage.leaveUsed")}:</p>
              <p className="text-red-500">
                {getDayOffs?.data?.Table[0]?.YEAR_SAVE_TOT}
              </p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2 px-2">
            <p className="text-sm">{t("attendantPage.leaveRemnant")}:</p>
            <p className="text-red-500">
              {getDayOffs?.data?.Table[0]?.MAX_YEAR_CNT}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-2 min-h-0 flex-1 bg-white px-2 py-2">
        <div className="flex items-start gap-2 py-1">
          <LuCalendarMinus size={24} className="text-gray-900" />
          <p className="font-bold text-gray-900">
            {t("attendantPage.leaveTable")}
          </p>
        </div>
        {getDayOffs.isLoading ? (
          <>
            <Skeleton className="mt-4" active />
            <Skeleton className="mt-4" active />
          </>
        ) : (
          <BangNghi list={getDayOffs?.data?.Table2.reverse()} />
        )}
      </div>
    </div>
  );
}
