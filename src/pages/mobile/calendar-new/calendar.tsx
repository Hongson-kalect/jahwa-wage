import { useQuery } from "@tanstack/react-query";
import { DatePicker, Empty } from "antd";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { BiRun, BiSolidBowlRice } from "react-icons/bi";
import {
  FaArrowAltCircleUp,
  FaCaretSquareDown,
  FaCaretSquareRight,
} from "react-icons/fa";
import { PiClockCountdownFill } from "react-icons/pi";
import { useUserInfoStore } from "../../../store/userinfo";
import { HeaderNew } from "./ui/header";
import { WorkList, WorkType } from "./interface";
import { calDateValue, getWorkData } from "./api";
import { StyledCalendar } from "./components/calendar";
import { mergeWorkDateAndShift } from "./utils";
import CalendarDetail from "./ui/calendar";
import CalendarContent from "./ui/content";

export interface ICalendarNewProps {}

export default function CalendarNew(props: ICalendarNewProps) {
  const { t } = useTranslation();
  const { user } = useUserInfoStore();

  const [isViewAll, setIsViewAll] = React.useState(true);
  const [workData, setWorkData] = React.useState<
    { date: string; time?: string; data: WorkType[]; shift: string }[]
  >([]);
  const [selectedMonth, setSelectedMonth] = React.useState<Dayjs>(
    dayjs(
      new Date(new Date().getTime() - 1000 * 60 * 60 * 24).toISOString(),
      "YYYY-MM-DD",
    ),
  ); //calendarValue
  const [calendarValue, setCalendarValue] = React.useState<Date>(new Date());
  const selectedDate = React.useMemo(() => {
    return workData.find((item) => {
      return (
        new Date(item.date).toISOString().slice(0, 10) ===
        calendarValue.toISOString().slice(0, 10)
      );
    });
  }, [calendarValue, workData]);

  const dateDetail = React.useMemo(() => {
    const tempDetail = {
      ot: 0,
      eb: 0,
      of: "",
      half: 0,
      comeLate: 0,
      leaveSoon: 0,
    };
    if (selectedDate) {
      selectedDate.data.map((detail) => {
        if ([33, 31, 47, 40, 38].includes(Number(detail.dilig_cd)))
          tempDetail.ot +=
            Number(detail.dilig_hh) * 60 + Number(detail.dilig_mm);
        if ([55, 56, 57, 58, 59, 60].includes(Number(detail.dilig_cd)))
          tempDetail.eb +=
            Number(detail.dilig_hh) * 60 + Number(detail.dilig_mm);
        if ([13].includes(Number(detail.dilig_cd)))
          tempDetail.comeLate +=
            Number(detail.dilig_hh) * 60 + Number(detail.dilig_mm);
        if ([14].includes(Number(detail.dilig_cd)))
          tempDetail.leaveSoon +=
            Number(detail.dilig_hh) * 60 + Number(detail.dilig_mm);
        if (
          [1, 2, 4, 5, 8, 10, 15, 18, 19, 20, 21].includes(
            Number(detail.dilig_cd),
          )
        )
          tempDetail.of = detail.dilig_nm || "Nghỉ";
        if ([9].includes(Number(detail.dilig_cd))) tempDetail.half += 1;
      });
    }
    return tempDetail;
  }, [selectedDate]);

  console.log("workData", workData);

  const [bonus, setBonus] = React.useState<
    { id: number; name: string; time: number }[]
  >([]);

  console.log("selectedDate", selectedDate);
  console.log("selectedDate", calendarValue.toISOString().slice(0, 10));

  const [showNote, setShowNote] = React.useState(false);

  const onCalendarChange = (date: Date | null) => {
    console.log("date", date?.toISOString());
    if (date) {
      const tempDate = new Date(date.getTime() + 1000 * 60 * 60 * 12); //Khấu trừ 7h timestamp
      setCalendarValue(tempDate);
    }
  };

  const workQuery = useQuery<WorkList>({
    queryFn: () => {
      return getWorkData(
        user.EMP_NO,
        selectedMonth.year() + "-" + (selectedMonth.month() + 1),
      );
    },
    queryKey: ["workData", selectedMonth],
  });

  React.useEffect(() => {
    setCalendarValue(
      new Date(selectedMonth.unix() * 1000 + 1000 * 60 * 60 * 12),
    );
  }, [selectedMonth]);

  React.useEffect(() => {
    if (workQuery.data?.work?.length) {
      return setWorkData(
        mergeWorkDateAndShift(workQuery.data.work, workQuery.data.shift),
      );
    }
    setWorkData([]);
  }, [workQuery.data]);

  return (
    <div
      className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden bg-slate-100"
      style={{ height: "calc(100% - 44px)" }}
    >
      <div className="header rounded-b-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 px-3 py-2 shadow-sm shadow-indigo-700">
        <HeaderNew title={t("header.calendar")} />
      </div>
      <div className="calendar mt-8 px-2">
        <CalendarDetail
          calendarValue={calendarValue}
          selectedMonth={selectedMonth}
          setCalendarValue={setCalendarValue}
          setSelectedMonth={setSelectedMonth}
          workData={workData}
        />
      </div>

      <div className="content px-2.5">
        <div className="flex justify-between py-2">
          <div className="option text-2xl font-medium text-indigo-800">
            {t("common.detail")}
          </div>
          <div
            className="option italic text-red-500 underline"
            onClick={() => setIsViewAll(!isViewAll)}
          >
            {isViewAll ? "Xem đã chọn" : "Xem tất cả"}
          </div>
        </div>
        <CalendarContent
          calendarValue={calendarValue}
          workData={workData}
          viewAll={isViewAll}
        />
      </div>
    </div>
  );
}

type CalendarMarkProps = {
  date: number;
  data?: {
    date: string;
    data: WorkType[];
    shift: string;
  };
};

export const CalendarMark = (props: CalendarMarkProps) => {
  const [haveSomething, setHaveSomething] = React.useState(false);
  if (!props.data) return <div></div>;

  return (
    <div className="flex w-full items-center justify-center px-[15%]">
      <div
        className={`h-[3px] w-full overflow-hidden rounded-lg bg-transparent shadow ${Number(props?.data?.shift) === 2 ? "flex shadow-primary-8" : ""}`}
      >
        {!haveSomething && <div className="h-full flex-1 bg-green-400" />}
        {props.data.data.some((item) => {
          if ([33, 31, 47, 40, 38].includes(Number(item.dilig_cd))) {
            !haveSomething && setHaveSomething(true);
            return true;
          }
        }) && <div className="h-full flex-1 bg-cyan-600" />}
        {
          props.data.data.some((item) => {
            if ([1].includes(Number(item.dilig_cd))) {
              !haveSomething && setHaveSomething(true);
              return true;
            }
          }) && <div className="h-full flex-1 bg-orange-500" /> //phép năm
        }
        {
          props.data.data.some((item) => {
            if ([9].includes(Number(item.dilig_cd))) {
              !haveSomething && setHaveSomething(true);
              return true;
            }
          }) && <div className="h-full flex-1 bg-yellow-500" /> //phép năm
        }
        {props.data.data.some((item) => {
          if ([5, 19, 20].includes(Number(item.dilig_cd))) {
            !haveSomething && setHaveSomething(true);
            return true;
          }
        }) && <div className="h-full flex-1 bg-red-600" />}
        {props.data.data.some((item) => {
          if ([13].includes(Number(item.dilig_cd))) {
            !haveSomething && setHaveSomething(true);
            return true;
          }
        }) && <div className="h-full flex-1 bg-pink-500" />}
        {props.data.data.some((item) => {
          if ([14].includes(Number(item.dilig_cd))) {
            !haveSomething && setHaveSomething(true);
            return true;
          }
        }) && <div className="h-full flex-1 bg-indigo-500" />}
      </div>
    </div>
  );
};
