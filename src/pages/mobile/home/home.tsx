import React, { useEffect, useMemo } from "react";
import { useMobileAppStore } from "../../../store/mobile.app";
import { useUserInfoStore } from "../../../store/userinfo";
import {
  useGetDayOff,
  useGetNews,
  useGetWage,
  useGetWageTime,
} from "./queries";
import News from "./components/news";
import Wage from "./components/wage";
import Leave from "./components/leave";
import Attendances from "./components/attendance";
import dayjs from "dayjs";
import { getAttendance } from "../attendant/ui/api";
import { Attendance } from "../attendant/ui/interface";
import { useQuery } from "@tanstack/react-query";
import Heading1 from "./components/_shared/heading1";
import { useTranslation } from "react-i18next";
import { HiCash } from "react-icons/hi";
import { MdCalendarMonth, MdSailing } from "react-icons/md";
import { useSearch } from "../../../hooks/useSearch";

export default function MobileHomePage() {
  const { user } = useUserInfoStore();
  const { t } = useTranslation();
  const [date, setDate] = React.useState<string>(
    new Date().getFullYear() + "" + (new Date().getMonth() + 1),
  );

  const [paramsObject, setSearchParams] = useSearch();

  const [startDate, endDate] = useMemo(() => {
    const currentDate = dayjs().format("YYYY-MM-DD");
    const firstDayTwoMonthsAgo = dayjs()
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    return [firstDayTwoMonthsAgo, currentDate];
  }, []);

  const { data: news } = useGetNews();
  const { data: wageData } = useGetWage(date, "1");
  const { data: monthData } = useGetWageTime();
  const { data: dayOffData } = useGetDayOff(date.slice(0, 4));
  const { data: attendanceData } = useQuery<{ Table: Attendance[] }>({
    queryKey: ["workData", startDate, endDate],
    queryFn: () => getAttendance(startDate, endDate),
  });
  // const { data: attendanceData } = getAttendance(startDate, endDate);

  useEffect(() => {
    if (monthData?.Table?.[0]?.Code) {
      setDate(monthData?.Table?.[0]?.Code);
    }
  }, [monthData]);

  return (
    <div className="bg-blue-200 p-2">
      <div
        className="rounded-xl bg-blue-100 p-3"
        onClick={() => setSearchParams({ tab: "wage" })}
      >
        <div className="mb-2 flex items-center gap-2 text-gray-700">
          <HiCash size={24} />
          <Heading1 title={t("homePage.wage")} />
          <div className="text-gray-500">
            {" - " +
              (!date ? "####" : date.slice(4, 6) + "/" + date.slice(0, 4))}
          </div>
        </div>
        {<Wage wage={wageData} month={date} />}
      </div>

      <div
        className="mt-3 rounded-xl bg-blue-100 p-3"
        onClick={() => setSearchParams({ tab: "attendant" })}
      >
        <div className="mb-2 flex items-center gap-2 text-gray-700">
          <MdCalendarMonth size={24} />
          <Heading1 title={t("homePage.attendance")} />
        </div>
        {<Attendances attendance={attendanceData} />}
      </div>

      <div
        className="mt-3 rounded-xl bg-blue-100 p-3"
        onClick={() => setSearchParams({ tab: "day-off" })}
      >
        <div className="mb-2 flex items-center gap-2 text-gray-700">
          <MdSailing size={24} />
          <Heading1 title={t("homePage.dayOff")} />
        </div>
        {<Leave leave={dayOffData} />}
      </div>
    </div>
  );
}
