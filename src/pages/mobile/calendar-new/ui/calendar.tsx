import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { StyledCalendar } from "../components/calendar";
import { CalendarMark } from "../components/calendarMark";
import { FaCaretSquareDown, FaCaretSquareRight } from "react-icons/fa";
import { WorkType } from "../interface";

export interface ICalendarProps {
  selectedMonth: Dayjs;
  setSelectedMonth: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  calendarValue: Date;
  setCalendarValue: React.Dispatch<React.SetStateAction<Date>>;
  workData: { date: string; time?: string; data: WorkType[]; shift: string }[];
}

export default function CalendarDetail({
  selectedMonth,
  setSelectedMonth,
  calendarValue,
  setCalendarValue,
  workData,
}: ICalendarProps) {
  const { t } = useTranslation();
  const [showNote, setShowNote] = React.useState(false);

  const onCalendarChange = (date: Date | null) => {
    console.log("date", date?.toISOString());
    if (date) {
      const tempDate = new Date(date.getTime() + 1000 * 60 * 60 * 12); //Khấu trừ 7h timestamp
      setCalendarValue(tempDate);
    }
  };

  return (
    <div>
      <div className="panel relative h-[180px] bg-white shadow-md shadow-indigo-400">
        <div className="absolute -top-5 flex w-full items-center justify-end pr-1">
          <DatePicker
            cellRender={(val) => (
              <div>
                {t("common.month")} {dayjs(val).month() + 1}
              </div>
            )}
            picker="month"
            size="small"
            value={selectedMonth}
            onCalendarChange={(e) => setSelectedMonth(e)}
            allowClear={false}
            style={{
              boxShadow: "#5244d9 -1px -1px 1px, #081150 1px -1px 1px",
            }}
            inputReadOnly
            className="w-28 rounded-none border-none py-0 font-bold text-indigo-900 outline-none [&_*::placeholder]:text-gray-200 [&_*]:text-sm [&_*]:font-medium"
          />
        </div>

        <StyledCalendar
          className="shadow-md shadow-gray-500 dark:[&_*]:text-gray-100"
          showNeighboringMonth={false}
          tileClassName={({ date }) => {
            if (date.getDay() === 0) return "bg-orange-200 text-error";
          }}
          // calendarType="islamic"
          tileContent={({ date, view }: { date: Date; view: string }) => {
            const day = date.getDate();
            return (
              <CalendarMark
                date={day}
                data={workData.find(
                  (item) => new Date(item.date).getDate() === day,
                )}
              />
            );
          }}
          onChange={(val) => onCalendarChange(val)}
          activeStartDate={calendarValue}
          value={calendarValue}
          showNavigation={false}
          showWeekNumbers={false}
          defaultValue={calendarValue}
        />
      </div>

      <div className="mt-2 rounded-lg bg-white px-2 py-1">
        <div
          onClick={() => setShowNote(!showNote)}
          className="flex w-full items-center gap-4 py-2 text-left text-[10px] text-xs text-rose-400"
        >
          <p>{t("work.note")}:</p>
          {showNote ? <FaCaretSquareDown /> : <FaCaretSquareRight />}
        </div>
        {showNote ? (
          <div className="mb-2 flex w-full flex-wrap items-center gap-y-1">
            <div className="flex w-1/4 flex-col items-center justify-center gap-0.5 px-2 text-center">
              <div className="h-0.5 w-8 rounded-lg bg-green-400"></div>
              <p className="mb-1 text-[10px] font-light text-slate-800">
                {t("work.normal")}
              </p>
            </div>

            <div className="flex w-1/4 flex-col items-center justify-center gap-0.5 px-2 text-center">
              {" "}
              <div className="h-0.5 w-8 rounded-lg bg-cyan-600"></div>
              <p className="mb-1 text-[10px] font-light text-slate-800">
                {t("work.overtime")}
              </p>
            </div>
            <div className="flex w-1/4 flex-col items-center justify-center gap-0.5 px-2 text-center">
              {" "}
              <div className="h-0.5 w-8 rounded-lg bg-red-600"></div>
              <p className="mb-1 text-[10px] font-light text-slate-800">
                {t("work.offNoP")}
              </p>
            </div>
            <div className="flex w-1/4 flex-col items-center justify-center gap-0.5 px-2 text-center">
              {" "}
              <div className="h-0.5 w-8 rounded-lg bg-orange-500"></div>
              <p className="mb-1 text-[10px] font-light text-slate-800">
                {t("work.offP")}
              </p>
            </div>

            <div className="flex w-1/4 flex-col items-center justify-center gap-0.5 px-2 text-center">
              {" "}
              <div className="h-0.5 w-8 rounded-lg bg-yellow-500"></div>
              <p className="mb-1 text-[10px] font-light text-slate-800">
                {t("work.offhalf")}
              </p>
            </div>

            <div className="flex w-1/4 flex-col items-center justify-center gap-0.5 px-2 text-center">
              <div className="h-0.5 w-8 rounded-lg bg-pink-500"></div>
              <p className="mb-1 text-[10px] font-light text-slate-800">
                {t("work.comeLate")}
              </p>
            </div>
            <div className="flex w-1/4 flex-col items-center justify-center gap-0.5 px-2 text-center">
              {" "}
              <div className="h-0.5 w-8 rounded-lg bg-indigo-500"></div>
              <p className="mb-1 text-[10px] font-light text-slate-800">
                {t("work.leaveSoon")}
              </p>
            </div>
            <div className="flex w-1/4 flex-col items-center justify-center gap-0.5 px-2 text-center">
              {" "}
              <div className="h-0.5 w-8 rounded-lg bg-transparent shadow shadow-primary-8"></div>
              <p className="mb-1 text-[10px] font-light text-slate-700">
                {t("work.nightShift")}
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
