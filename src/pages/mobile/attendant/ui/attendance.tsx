import { useQuery } from "@tanstack/react-query";
import { DatePicker, Skeleton } from "antd";
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
import { PiArrowArcRightThin } from "react-icons/pi";
import dayjs, { Dayjs } from "dayjs";

export interface IAttendantProps {}

export default function Attendants(props: IAttendantProps) {
  const { t } = useTranslation();
  const { setHeader } = useMobileAppStore();

  const [start, setStart] = React.useState<Dayjs>(
    dayjs(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`),
  );
  const [end, setEnd] = React.useState<Dayjs>(
    dayjs(`${new Date().getFullYear()}-${new Date().getMonth() + 1}`).endOf(
      "month",
    ),
  );

  const getAttendances = useQuery<{ Table: Attendance[] }>({
    queryKey: ["workData", start, end],
    queryFn: () =>
      getAttendance(start.format("YYYY-MM-DD"), end.format("YYYY-MM-DD")),
  });

  React.useEffect(() => {
    setHeader(t("attendantPage.title1"));
  }, []);

  return (
    <div className="h-full w-full snap-start overflow-auto">
      <div className="flex h-full flex-col">
        <div className="bg-white py-2">
          <div className="rounded-md bg-white">
            <div className="flex items-center justify-between gap-2">
              <div className="mx-4 flex w-full justify-between rounded-md bg-white px-4 py-3 shadow-inner shadow-gray-800">
                <div className="flex items-center gap-3">
                  <DatePicker
                    inputReadOnly
                    allowClear={false}
                    value={start}
                    onChange={(value) => setStart(value)}
                  />
                  <PiArrowArcRightThin />

                  <DatePicker
                    inputReadOnly
                    allowClear={false}
                    value={end}
                    onChange={(value) => setEnd(value)}
                  />
                </div>
              </div>
            </div>
            <div className="mt-2 flex-1 bg-white px-3.5 py-3">
              <div className="flex items-center gap-2 py-1">
                <IoTimeOutline size={24} />
                <p className="font-bold">
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
      </div>
    </div>
  );
}
