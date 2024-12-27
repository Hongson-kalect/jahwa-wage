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

export default function MobileHomePage() {
  const { user } = useUserInfoStore();
  // const { empCode, entCode } = useMobileAppStore();
  const [date, setDate] = React.useState<string>(
    new Date().getFullYear() + "" + (new Date().getMonth() + 1),
  );

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
    <div className="px-4">
      {/* {<News news={news} />} */}
      {<Wage wage={wageData} month={date} />}
      {<Attendances attendance={attendanceData} />}
      {<Leave leave={dayOffData} />}
    </div>
  );
}
