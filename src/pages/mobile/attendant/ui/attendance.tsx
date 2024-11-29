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

export interface IAttendantProps {}

export default function Attendants(props: IAttendantProps) {
  const { t } = useTranslation();
  const { setHeader, empCode, entCode } = useMobileAppStore();
  const [date, setDate] = React.useState(new Date());
  //   const [final, setFinal] = React.useState(new Date().getFullYear().toString());

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
  // const [dayOffYear, setDayOffYear] = React.useState(new Date().getFullYear());

  React.useEffect(() => {
    setHeader(t("attendance.workTable"));
    getThang();
  }, []);
  return (
    <div
      className="h-screen min-w-[100vw] snap-start overflow-auto"
      id="di-lam"
    >
      <div className="h-14 w-full">Hế lu</div>
      <div>
        <div className="m-2 rounded-md bg-blue-200 py-4">
          <div className="mx-4 rounded-md bg-white px-2 py-1">
            <div className="flex h-10 items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <p className="w-24">Tháng đi làm:</p>
                {!months ? (
                  <div>Loading...</div>
                ) : (
                  <select
                    className="h-8 w-24 px-1"
                    value={thang}
                    onChange={(event) => setThang(event.target.value)}
                  >
                    {months?.map((item, viTri) => {
                      return (
                        <option
                          key={viTri}
                          value={item.Code}
                          className="text-sm text-gray-700"
                        >
                          {item.Name}
                        </option>
                      );
                    })}
                  </select>
                )}
              </div>
              <div className="flex items-end justify-between font-medium text-gray-400">
                <div
                  onClick={() => scrollToId("nghi")}
                  className="flex items-center justify-center gap-2 bg-blue-600 py-2 pl-4 pr-2 text-sm text-white opacity-80"
                >
                  <p>{t("attendance.off")}</p>
                  <BiSolidRightArrow size={18} />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-2 mb-2 mt-4 rounded-lg bg-blue-200 px-1 py-2">
          <div className="ml-4 flex items-start gap-2 py-1">
            <FaSackDollar size={18} className="text-blue-500" />
            <p className="font-bold italic text-gray-600">Bảng chấm công</p>
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
