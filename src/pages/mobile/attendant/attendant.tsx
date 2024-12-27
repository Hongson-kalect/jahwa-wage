import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useMobileAppStore } from "../../../store/mobile.app";
import { getAttendance, getDayOff } from "./ui/api";
import Attendants from "./ui/attendance";
import { Attendance, OffDate, OffHour, OffInfo } from "./ui/interface";

export interface IAttendantProps {}

export default function Attendant(props: IAttendantProps) {
  const { t } = useTranslation();
  const { setHeader, empCode, entCode } = useMobileAppStore();
  const [dayCount, setDayCount] = React.useState(0);
  const [isYear, setIsYear] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const [dayOffYear, setDayOffYear] = React.useState(
    new Date().getFullYear().toString(),
  );
  const [final, setFinal] = React.useState(new Date().getFullYear().toString());
  const offYearRef = React.useRef<HTMLInputElement | null>(null);

  const [months, setMonths] = React.useState<string[]>([
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1).toString().padStart(2, "0"),
  ]);
  const [thang, setThang] = React.useState(
    new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1).toString().padStart(2, "0"),
  );

  const getAttendances = useQuery<{ Table: Attendance[] }>({
    queryKey: ["workData", thang],
    queryFn: () =>
      getAttendance(
        date.getFullYear().toString(),
        (date.getMonth() + 1).toString(),
      ),
  });

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
    setHeader(t("attendantPage.title1"));
    getThang();
  }, []);

  React.useEffect(() => {
    let count = 0;
    getAttendances.data?.Table.map((item) => {
      if (item.END_TIME) count += 1;
    });
    setDayCount(count);
  }, [getAttendances?.data]);

  return (
    <div className="h-full w-full">
      <div className="flex h-full w-full overflow-auto">
        <Attendants />
        {/* <DayOff /> */}
      </div>
    </div>
  );
}
