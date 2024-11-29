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

export interface IDayOffProps {}

export default function DayOff(props: IDayOffProps) {
  const { t } = useTranslation();
  const { setHeader, empCode, entCode } = useMobileAppStore();
  const [dayOffYear, setDayOffYear] = React.useState(
    new Date().getFullYear().toString(),
  );
  const [final, setFinal] = React.useState(new Date().getFullYear().toString());

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
    queryKey: ["dayOff", final],
    queryFn: () => getDayOff(final),
  });

  React.useEffect(() => {
    setHeader(t("attendance.workTable"));
  }, []);

  return (
    <div className="h-screen min-w-[100vw] snap-start overflow-auto" id="nghi">
      <div className="h-14 w-full">Hế lu</div>
      <div>
        <div className="m-2 rounded-md bg-blue-200 py-4">
          <div className="mx-4 rounded-md bg-white px-2 py-1">
            <div className="flex h-10 items-center justify-between gap-4">
              <div className="flex items-end justify-between font-medium text-gray-400">
                <div
                  onClick={() => scrollToId("di-lam")}
                  className="flex items-center justify-center gap-2 bg-blue-600 py-2 pl-4 pr-2 text-sm text-white opacity-80"
                >
                  <BiSolidLeftArrow size={18} />
                  <p>{t("work.goWork")}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <select
                  className="h-8 w-24 px-1"
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
            </div>
          </div>
        </div>

        <div className="mx-2 mb-2 mt-4 rounded-lg bg-blue-200 px-1 py-2">
          <div className="ml-4 flex items-start gap-2 py-1">
            <BiInfoCircle size={18} className="text-blue-500" />
            <p className="font-bold italic text-gray-600">Thông tin phép năm</p>
          </div>

          <div className="mx-2 mt-2 rounded-lg bg-white p-2 text-center">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <p>Phép năm tổng:</p>
                <p>{getDayOffs?.data?.Table[0].YEAR_SAVE_TOT}</p>
              </div>
              <div className="flex items-center gap-2">
                <p>Đã dùng:</p>
                <p className="text-red-500">
                  {getDayOffs?.data?.Table[0].YEAR_SAVE}
                </p>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-center gap-2">
              <p>Còn lại:</p>
              <p className="text-red-500">
                {getDayOffs?.data?.Table[0].MAX_YEAR_CNT}
              </p>
            </div>
          </div>

          {/* {getDayOffs.isLoading ? (
            <>
              <Skeleton className="mt-4" active />
              <Skeleton className="mt-4" active />
            </>
          ) : (
            
          )} */}
        </div>

        <div className="mx-2 mb-2 mt-4 rounded-lg bg-blue-200 px-1 py-2">
          <div className="ml-4 flex items-start gap-2 py-1">
            <FaCalendarXmark size={18} className="text-blue-500" />
            <p className="font-bold italic text-gray-600">Bảng Nghỉ</p>
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
    </div>
  );
}
