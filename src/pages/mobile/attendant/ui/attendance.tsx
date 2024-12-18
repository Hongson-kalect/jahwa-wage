import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import axios from "axios";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { BiSolidRightArrow } from "react-icons/bi";
import { FaSackDollar } from "react-icons/fa6";
import { useMobileAppStore } from "../../../../store/mobile.app";
import { scrollToId } from "../../../../lib/utlis";
import BangCong from "../components/bangcong";
import { getAttendance } from "./api";
import { Attendance } from "./interface";
import { useUserInfoStore } from "../../../../store/userinfo";
import { toast } from "react-toastify";
import { IoTimeOutline } from "react-icons/io5";
import { MdCalendarMonth } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";

export interface IAttendantProps {}

export default function Attendants(props: IAttendantProps) {
  const { user } = useUserInfoStore();
  const { t } = useTranslation();
  const { setHeader, empCode, entCode } = useMobileAppStore();
  const months = React.useMemo<string[]>(() => {
    if (!user?.ENTR_DT) {
      toast.error("cook");
      return [];
    }
    const tempMonth = [];
    const currentMonth = [new Date().getFullYear(), new Date().getMonth() + 1];
    let entriMonth: number[] | string[] = user.ENTR_DT?.split("-");
    entriMonth = entriMonth.map((item) => Number(item));

    while (
      currentMonth[0] * 15 + currentMonth[1] >=
      Number(entriMonth[0] * 15) + Number(entriMonth[1])
    ) {
      tempMonth.unshift(
        `${entriMonth[0]}${entriMonth[1].toString().padStart(2, "0")}`,
      );
      entriMonth[1] += 1;
      if (entriMonth[1] == 13) {
        entriMonth[1] = 1;
        entriMonth[0] += 1;
      }
    }

    return tempMonth;
  }, []);
  const [thang, setThang] = React.useState(
    new Date().getFullYear() +
      (new Date().getMonth() + 1).toString().padStart(2, "0"),
  );

  const getAttendances = useQuery<{ Table: Attendance[] }>({
    queryKey: ["workData", thang],
    queryFn: () => getAttendance(thang.slice(0, 4), thang.slice(4, 6)),
  });

  console.log("thang :>> ", thang);

  console.log("getAttendances.data :>> ", getAttendances.data);

  const getThang = async () => {
    const dulieuapi = await axios.post("/api/MSelectList", {
      DIV: "PAY_YYMM",
      Data: thang,
      EntCode: entCode,
      EmpCode: empCode,
    });

    const currentMonth =
      new Date().getFullYear() +
      (new Date().getMonth() + 1).toString().padStart(2, "0");
    setMonths([
      {
        Code: currentMonth,
        Name: currentMonth,
      },
      ...dulieuapi.data.Table,
    ]);
  };
  // const [dayOffYear, setDayOffYear] = React.useState(new Date().getFullYear());
  const workDate = React.useMemo<number>(() => {
    return (
      getAttendances?.data?.Table?.reduce((count, item) => {
        if (item.END_TIME) count += 1;

        return count;
      }, 0) || 0
    );
  }, [getAttendances?.data?.Table, thang]);

  React.useEffect(() => {
    setHeader(t("attendantPage.title1"));
    getThang();
  }, []);
  return (
    <div
      className="h-full w-full snap-start overflow-auto"
      // id="di-lam"
    >
      <div className="flex h-full flex-col">
        <div className="bg-white py-2">
          <div className="mx-4 rounded-md bg-white px-2 py-1">
            <div className="flex h-10 items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                {/* <p className="flex-1">{t("attendantPage.month")}:</p> */}
                <MdCalendarMonth size={32} className="text-blue-600" />
                {!months ? (
                  <div>Loading...</div>
                ) : (
                  <select
                    className="h-8 w-24 border-none px-1 text-lg outline-none"
                    value={thang}
                    onChange={(event) => setThang(event.target.value)}
                  >
                    {months?.map((item, viTri) => {
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
                )}
              </div>
              <p className="flex items-center gap-2 text-lg font-medium text-blue-600">
                <FaCheckCircle size={24} /> {workDate} {t("common.day")}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-2 flex-1 bg-white px-2 py-3">
          <div className="flex items-center gap-2 py-1">
            <IoTimeOutline size={24} className="mt-0.5" />
            <p className="font-bold text-gray-900">
              {t("attendantPage.attendanceTable")}
            </p>
          </div>
          {getAttendances.isLoading ? (
            <>
              <Skeleton className="mt-4" active />
              <Skeleton className="mt-4" active />
            </>
          ) : (
            <BangCong list={getAttendances?.data?.Table} />
          )}
        </div>
      </div>
    </div>
  );
}
