import React, { useEffect } from "react";
import { useMobileAppStore } from "../../../store/mobile.app";
import { useUserInfoStore } from "../../../store/userinfo";
import {
  useGetAttendance,
  useGetDayOff,
  useGetNews,
  useGetWage,
  useGetWageTime,
} from "./queries";
import News from "./components/news";
import Wage from "./components/wage";
import Leave from "./components/leave";
import Attendances from "./components/attendance";

export default function MobileHomePage() {
  const { user } = useUserInfoStore();
  // const { empCode, entCode } = useMobileAppStore();
  const [date, setDate] = React.useState<string>(
    new Date().getFullYear() + "" + (new Date().getMonth() + 1),
  );

  console.log("user :>> ", user);

  const { data: news } = useGetNews();
  const { data: wageData } = useGetWage(date, "1");
  const { data: monthData } = useGetWageTime();
  const { data: attendanceData } = useGetAttendance(date);
  const { data: dayOffData } = useGetDayOff(date.slice(0, 4));

  useEffect(() => {
    console.log(
      "monthData?.Table?.[0]?.Code :>> ",
      monthData?.Table?.[0]?.Code,
    );
    if (monthData?.Table?.[0]?.Code) {
      setDate(monthData?.Table?.[0]?.Code);
    }
  }, [monthData]);

  console.log("wageData :>> ", wageData);
  console.log("monthData :>> ", monthData);
  console.log("date :>> ", date);

  return (
    <div className="px-4">
      {/* {<News news={news} />} */}
      {<Wage wage={wageData} month={date} />}
      {<Attendances attendance={attendanceData} />}
      {<Leave leave={dayOffData} />}
    </div>
  );
}
