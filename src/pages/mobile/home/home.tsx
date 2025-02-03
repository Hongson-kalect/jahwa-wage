import React, { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { HiCash } from "react-icons/hi";
import { MdCalendarMonth, MdSailing } from "react-icons/md";

import { useMobileAppStore } from "../../../store/mobile.app";
import { Attendance } from "../../../interface/attendance";
import { useGetDayOff, useGetWage, useGetWageTime } from "./queries";
import { getAttendanceRange } from "../../../services/attendance";
import { getRawCookie } from "../../../lib/utlis";
import Wage from "./components/wage";
import Attendances from "./components/attendance";
import Heading1 from "./components/_shared/heading1";
import LeaveDetail from "../dayoff/components/leaveDetail";

export default function MobileHomePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setHeader } = useMobileAppStore();
  const [date, setDate] = React.useState<string>(
    new Date().getFullYear() +
      "" +
      (new Date().getMonth() + 1).toString().padStart(2, "0"),
  );
  const year = useMemo(() => new Date().getFullYear(), [date]);

  const [startDate, endDate] = useMemo(() => {
    const currentDate = dayjs().format("YYYY-MM-DD");
    const firstDayTwoMonthsAgo = dayjs()
      .subtract(1, "month")
      .startOf("month")
      .format("YYYY-MM-DD");
    return [firstDayTwoMonthsAgo, currentDate];
  }, []);

  const { data: wageData } = useGetWage(date, "1");
  const { data: monthData } = useGetWageTime();
  const { data: dayOffData } = useGetDayOff(year.toString());
  const { data: attendanceData } = useQuery<{ Table: Attendance[] }>({
    queryKey: ["workData", startDate, endDate],
    queryFn: () => getAttendanceRange({ startDate, endDate }),
  });
  const cookiesInfo = React.useMemo(() => {
    const cookies = getRawCookie("JHInfo");
    return decodeURIComponent(cookies || "").split("♪");
  }, []);

  useEffect(() => {
    if (monthData?.Table?.[0]?.Code) {
      setDate(monthData?.Table?.[0]?.Code);
    }
  }, [monthData]);

  useEffect(() => {
    setHeader(cookiesInfo[0]);
  }, [t]);

  return (
    <div className="pl-4">
      <div className="" onClick={() => navigate("/wage")}>
        <div className="flex items-center gap-2 text-blue-900 underline">
          <HiCash size={24} />
          <Heading1 title={t("homePage.wage")} />
          <div className="text-blue-700">
            {" - " +
              (!date ? "####" : date.slice(4, 6) + "/" + date.slice(0, 4))}
          </div>
        </div>
        {<Wage wage={wageData} />}
      </div>

      <div className="mt-6" onClick={() => navigate("/attendant")}>
        <div className="flex items-center gap-2 text-blue-900 underline">
          <MdCalendarMonth size={24} />
          <Heading1 title={t("homePage.attendance")} />
        </div>
        {<Attendances attendance={attendanceData} />}
      </div>

      <div className="mt-6" onClick={() => navigate("/day-off")}>
        <div className="flex items-center gap-2 text-blue-900 underline">
          <MdSailing size={24} />
          <Heading1 title={t("homePage.dayOff")} />
        </div>
        {/* {<Leave leave={dayOffData} />} */}
        <div className="px-5 pt-4">
          {<LeaveDetail leaveInfo={dayOffData?.Table[0]} />}
        </div>
      </div>
    </div>
  );
}
