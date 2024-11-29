import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "antd";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { BiSolidLeftArrow, BiSolidRightArrow } from "react-icons/bi";
import { scrollToId } from "../../../lib/utlis";
import { useMobileAppStore } from "../../../store/mobile.app";
import BangCong from "./components/bangcong";
import BangNghi from "./components/bangnghi";
import ChangeDate from "./components/changeDate";
import Overview from "./components/overview";
import { getAttendance, getDayOff } from "./ui/api";
import { Attendance, OffDate, OffHour, OffInfo } from "./ui/interface";
import { setDay } from "date-fns";
import axios from "axios";
import { FaSackDollar } from "react-icons/fa6";
import Attendants from "./ui/attendance";
import DayOff from "./ui/dayOff";

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
    setHeader(t("attendance.workTable"));
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
    <div className="h-screen w-screen overflow-scroll bg-blue-300">
      <div className="flex snap-x snap-mandatory overflow-auto">
        <Attendants />
        <DayOff />
      </div>
    </div>
  );

  return (
    <div className="flex w-screen overflow-auto">
      <div className="h-screen w-full">
        <div className="h-14 w-full">Hế lu</div>
        <div>
          <div className="mt-2 px-4">
            <p className="text-right font-medium text-gray-400">Phép năm</p>
            <Overview />
          </div>

          <div
            className="mt-8 px-4 text-right font-medium text-gray-400"
            // style={{ borderBottom: "1px solid #f2f2f2" }}
          >
            Ngày đi làm
          </div>

          <div
            className="header mt-1 flex items-center justify-between rounded-xl px-2 pt-4"
            // style={{ borderTop: "1px solid #ddd" }}
          >
            <div className="">
              <p className="font-medium text-gray-700">Đi làm</p>
              <div className="relative mt-2 text-blue-900">
                <p className="pr-3 text-4xl font-medium">28 ngày</p>
                {/* <p className="absolute right-0 top-0 font-medium">đ</p> */}
              </div>
              <p className="mt-1 font-light text-gray-400">
                Số giờ: 240 - Tăng ca: 48
              </p>
            </div>
            <ChangeDate isYear={isYear} setIsYear={setIsYear} />
          </div>

          {/* <div className="mt-6 px-4">
          <p className="pr-4 text-right font-medium text-gray-400">Phép năm</p>
          <Overview />
        </div> */}

          <div className="mt-8 px-4">
            <p className="pr-4 text-right font-medium text-gray-400">
              Bảng công
            </p>
            <BangCong />
          </div>
        </div>
      </div>
      <div className="h-full w-full">
        <div className="h-14 w-full">Hế lu</div>
        <div>
          <div className="mt-2 px-4">
            <p className="text-right font-medium text-gray-400">Phép năm</p>
            <Overview />
          </div>

          <div
            className="mt-8 px-4 text-right font-medium text-gray-400"
            // style={{ borderBottom: "1px solid #f2f2f2" }}
          >
            Ngày đi làm
          </div>

          <div
            className="header mt-1 flex items-center justify-between rounded-xl px-2 pt-4"
            // style={{ borderTop: "1px solid #ddd" }}
          >
            <div className="">
              <p className="font-medium text-gray-700">Đi làm</p>
              <div className="relative mt-2 text-blue-900">
                <p className="pr-3 text-4xl font-medium">28 ngày</p>
                {/* <p className="absolute right-0 top-0 font-medium">đ</p> */}
              </div>
              <p className="mt-1 font-light text-gray-400">
                Số giờ: 240 - Tăng ca: 48
              </p>
            </div>
            <ChangeDate isYear={isYear} setIsYear={setIsYear} />
          </div>

          {/* <div className="mt-6 px-4">
          <p className="pr-4 text-right font-medium text-gray-400">Phép năm</p>
          <Overview />
        </div> */}

          <div className="mt-8 px-4">
            <p className="pr-4 text-right font-medium text-gray-400">
              Bảng công
            </p>
            <BangCong />
          </div>
        </div>
      </div>
    </div>
  );
}
