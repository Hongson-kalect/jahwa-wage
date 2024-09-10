import { Avatar, DatePicker, Empty } from "antd";
import * as React from "react";
import { FaBarsProgress, FaBarsStaggered } from "react-icons/fa6";
import { GiHolyGrail } from "react-icons/gi";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { LiaHandHoldingUsdSolid, LiaRunningSolid } from "react-icons/lia";
import { HiBars3BottomLeft } from "react-icons/hi2";
import LanguageChanger from "../../../components/common/languageChange";
import MobileHomeCalendar from "../daycheck/components/calender";
import { useQuery } from "@tanstack/react-query";
import { WorkList, WorkType } from "./interface";
import { calDateValue, getWorkData } from "./utils";
import styled from "styled-components";
import Calendar from "react-calendar";
import { useTranslation } from "react-i18next";
import {
  FaArrowAltCircleUp,
  FaCaretSquareDown,
  FaCaretSquareRight,
  FaRegHandPointUp,
} from "react-icons/fa";
import { PiBowlFood, PiClockCountdownFill } from "react-icons/pi";
import { LuAlarmClockOff } from "react-icons/lu";
import { BiBowlRice, BiRun, BiSolidBowlRice } from "react-icons/bi";
import dayjs, { Dayjs } from "dayjs";
import { useUserInfoStore } from "../../../store/userinfo";
import { toast } from "react-toastify";
import { HeaderNew } from "./components/header";

const StyledCalendar = styled(Calendar)`
  /* margin-top: 8px; */
  /* border-radius: 20px; */
  outline: none !important;
  overflow: hidden;
  width: 100%;
  height: 100%;
  border: 1px solid #828282;
  padding: 2px 0px;
  display: flex !important;
  .react-calendar__viewContainer {
    flex: 1;
  }
  .react-calendar__month-view__weekdays__weekday {
    padding: 4px 0;
    background-color: #c1eaff;
    /* font-weight: ; */
    color: #555;
    text-align: center;
    & * {
      text-decoration: none;

      font-size: 13px !important;
    }
    &:first-child {
      /* border-top-left-radius: 20px; */
    }
    &:nth-child(6) {
      /* color: #e2850b;
      background-color: #ffe9c0; */
    }
    &:last-child {
      /* color: red;
      background-color: #f3d294; */
      /* border-top-right-radius: 20px; */
    }
  }

  .react-calendar__viewContainer {
    margin-top: -2px;
    flex: 1;
    .react-calendar__month-view {
      height: 100%;

      & > div:last-child {
        height: 100%;
        & > div:last-child {
          height: 100%;
          display: flex;
          flex-direction: column;
          & > div:last-child {
            flex: 1;
            button {
              /* padding: 6px 4px !important; */
              font-size: 14px;
              font-weight: 600;
              color: #444;
              border: none;
              /* box-shadow: 1px 1px 1px black; */
              background-color: transparent;
              transition: all 0.3s linear;
              &.react-calendar__month-view__days__day--weekend {
                background-color: #ffe9c0;
                color: #e2850b;
                /* background-color: red; */
              }
              &.react-calendar__tile--active {
                border-radius: 4px;
                background-color: #5b45db !important;
                animation: blink 2s cubic-bezier(0.39, 0.575, 0.565, 1) infinite;
                color: white !important;
              }
            }
          }
        }
      }
    }
  }

  /* height: 250px; */
  .react-calendar__month-view__weekNumbers {
    /* hide week number */
    display: none !important;
  }
  .react-calendar__tile {
    padding: 2px !important;
  }
  .react-calendar__navigation {
    margin: 0;
    height: 16%;
  }

  @keyframes blink {
    0% {
    }

    40%,
    70% {
      --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0
        var(--tw-ring-offset-width) #ff0000;
      --tw-ring-shadow: var(--tw-ring-inset) 0 0 0
        calc(3px + var(--tw-ring-offset-width)) var(--tw-ring-color);
      box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow),
        var(--tw-shadow, 0 0 #0000);
      scale: 1.02;
    }
    100% {
    }
  }
`;

export interface ICalendarNewProps {}

export default function CalendarNew(props: ICalendarNewProps) {
  const { t } = useTranslation();

  const [isViewAll, setIsViewAll] = React.useState(false);
  const { user } = useUserInfoStore();
  const [workData, setWorkData] = React.useState<
    { date: string; time?: string; data: WorkType[]; shift: string }[]
  >([]);

  const [selectedMonth, setSelectedMonth] = React.useState<Dayjs>(
    dayjs(
      new Date(new Date().getTime() - 1000 * 60 * 60 * 24).toISOString(),
      "YYYY-MM-DD",
    ),
  ); //calendarValue
  const [calendarValue, setCalendarValue] = React.useState<Date>(new Date()); //calendarValue
  const selectedDate = React.useMemo(() => {
    // return 'qq'
    // setCalendarValue= new Date()
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

  console.log("dateDetail", dateDetail);

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
      const workDates = workQuery.data.work;
      // setCalendarValue(new Date(workDates[0]?.check_date));
      const workShifts = workQuery.data.shift;
      const sortArray: {
        date: string;
        time?: string;
        shift: string;
        data: WorkType[];
      }[] = [];
      workDates.map((work) => {
        //get work shift
        let workShift = "1";
        workShifts.map((shift) => {
          if (calDateValue(shift.chang_dt) <= calDateValue(work.check_date))
            workShift = shift.wk_type;
          else return;
        });

        let matchDate = sortArray.find((item) => {
          return item.date === work.check_date;
        });
        if (!matchDate) {
          matchDate = {
            date: work.check_date,
            time: work.check_time,
            shift: workShift,
            data: [],
          };
          sortArray.push(matchDate);
        }
        matchDate.data.push(work);
        // if(sortArray.some((item)=>{item.month===work.month}))
      });
      return setWorkData(sortArray);
    }
    setWorkData([]);
  }, [workQuery.data]);

  return (
    <div
      className="h-full w-full overflow-y-auto overflow-x-hidden bg-slate-50"
      style={{ height: "calc(100% - 44px)" }}
      // style={{
      //   background:
      //     "url(https://th.bing.com/th/id/R.3c489fc3d57210d12875d2a31656771a?rik=5PqU%2bhbZl7gzIQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fVbCgf6N.jpg&ehk=%2baaoHfTrbbttD9Wd6ERbUuFre%2fPNv62EdEqfvKIScXw%3d&risl=&pid=ImgRaw&r=0) center center /cover no-repeat",
      // }}
      // style={{
      //   background:
      //     "url(https://th.bing.com/th/id/OIP.vSx9a0BaAFmBMbNZEDFaJAHaEK?rs=1&pid=ImgDetMain) center center /cover no-repeat",
      // }}
      // style={{
      //   background:
      //     "url(https://bobthecamper.com/sitebuilder/images/navbarTWObackgroundALT4-254x644.png) center center /cover no-repeat",
      // }}
    >
      <div
        className="header h-[165px] rounded-b-[40px] bg-gradient-to-b from-indigo-900 to-indigo-700 px-3 py-2 shadow-md shadow-indigo-700"
        style={{
          background: "#5366f1",
          boxShadow:
            "inset 10px 10px 10px #2862ff, inset -12px -12px 10px #2862ff , 0px 6px 9px #606dca",
        }}
      >
        <HeaderNew title={t("header.calendar")} />
      </div>
      <div className="content -mt-24 h-60 flex-1 px-4">
        <div className="panel relative h-[180px] bg-white shadow-md shadow-indigo-400">
          <div className="absolute -top-5 flex w-full items-center justify-end">
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
              inputReadOnly
              className="w-28 rounded-none border-none py-0 font-bold text-indigo-900 shadow-inner shadow-indigo-800 outline-none [&_*::placeholder]:text-gray-200 [&_*]:text-sm [&_*]:font-medium"
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
            onChange={(props) => onCalendarChange(props)}
            activeStartDate={calendarValue}
            value={calendarValue}
            showNavigation={false}
            showWeekNumbers={false}
            defaultValue={calendarValue}
          />
        </div>

        <div className="pt-2">
          <div
            onClick={() => setShowNote(!showNote)}
            className="flex w-full gap-4 py-2 text-left text-[10px] text-xs text-rose-400"
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
        <div className="content-options flex justify-between py-2">
          <div className="option text-2xl font-medium text-indigo-800">
            {t("common.detail")}
          </div>
          <div
            className="option italic text-red-500 underline"
            onClick={() => setIsViewAll(!isViewAll)}
          >
            {isViewAll ? "View One" : "View all"}
          </div>
        </div>
        {selectedDate ? (
          <>
            <div className="content-main grid grid-cols-[60%_40%] gap-4 py-2 pr-2">
              <div
                className={`item rounded-3xl bg-white px-4 py-3 shadow ${dateDetail.of ? "text-rose-600 shadow-pink-300" : "text-indigo-800 shadow-indigo-300"}`}
              >
                <p className="text-sm">
                  {dateDetail.of ? t("work.off") : t("work.timeOut")}
                </p>
                <p
                  className={`p-2 pb-0 text-center ${dateDetail.of ? "text-lg" : "text-3xl"} font-medium`}
                >
                  {dateDetail.of || selectedDate?.time || "No data"}
                </p>
              </div>
              {/* <div className="item rounded-3xl bg-orange-600 px-4 py-3 text-gray-600 shadow shadow-gray-300">
            <p className="text-sm text-white">Nghỉ</p>
            <p className="line-clamp-1 py-2 pb-0 text-center text-3xl font-medium text-white">
              Phép năm
            </p>
          </div> */}
              <div
                style={{
                  animation:
                    "1s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running rightFloatIn",
                }}
                className={`item duration-400 rounded-3xl px-4 py-3 shadow ${Number(selectedDate?.shift) === 2 ? "bg-indigo-700 text-white shadow-blue-200" : "bg-white text-indigo-800 shadow-indigo-400"}`}
              >
                <p className="text-sm">{t("work.shift")}</p>
                <p className={`p-2 pb-0 text-center text-3xl font-bold`}>
                  {Number(selectedDate?.shift) === 2
                    ? t("common.Night")
                    : t("common.Day")}
                </p>
              </div>

              {/* <div className="item rounded-3xl bg-white px-4 py-3 text-white shadow shadow-blue-400">
            <p className="text-sm text-indigo-600">Ca</p>
            <p className="p-2 pb-0 text-center text-3xl font-bold text-indigo-900">
              Ngày
            </p>
          </div> */}
              {/* <div className="item rounded-3xl bg-rose-400  px-4 py-3 text-white shadow shadow-pink-400">
            <p className="text-sm">CN</p>
            <p className="p-2 pb-0 text-center text-3xl font-bold">3</p>
          </div> */}
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="content-sub flex gap-2 rounded-xl bg-white px-2 py-1 shadow shadow-indigo-200">
            <div className="type flex w-16 items-center justify-center rounded-2xl bg-indigo-700 py-4 text-white shadow shadow-indigo-400">
              OT
            </div>
            <div className="content flex flex-1 py-1">
              <div className="w-1/3">
                <div className="title text-xs font-bold text-indigo-300">
                  Tăng ca
                </div>
                <div className="flex items-end gap-1 pt-1 font-medium text-indigo-800">
                  <FaRegHandPointUp className="text-gray-400" size={18} />
                  <p className="-mb-1">2h 30p</p>
                </div>
              </div>
              <div className="w-1/3">
                <div className="title text-xs font-bold text-indigo-300">
                  Ht ăn
                </div>
                <div className="flex items-end gap-1 pt-1.5 font-medium text-indigo-800">
                  <PiBowlFood className="-mb-0.5 text-gray-400" size={18} />
                  <p className="-mb-1">30 phút</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-sub flex gap-2 rounded-xl bg-white px-2 py-1 shadow shadow-[#fe4f6e22]">
            <div className="type flex w-16 items-center justify-center rounded-2xl bg-rose-400 py-4 text-white shadow shadow-pink-400">
              PEN
            </div>
            <div className="content flex flex-1 py-1">
              <div className="w-1/3">
                <div className="title text-xs font-bold text-[#fe4f6e88]">
                  Đi muộn
                </div>
                <div className="flex items-end gap-1 pt-1.5 font-medium text-rose-400">
                  <LuAlarmClockOff
                    className="-mb-0.5 text-gray-400"
                    size={18}
                  />
                  <p className="-mb-1">32 phút</p>
                </div>
              </div>
              <div className="w-1/3">
                <div className="title text-xs font-bold text-[#fe4f6e88]">
                  Về sớm
                </div>
                <div className="flex items-end gap-1 pt-1.5 font-medium text-rose-400">
                  <LiaRunningSolid
                    className="-mb-0.5 text-gray-400"
                    size={18}
                  />
                  <p className="-mb-1">30 phút</p>
                </div>
              </div>
            </div>
          </div> */}
              {/* <div className="divider mt-2"></div> */}
              {dateDetail.ot + dateDetail.eb > 0 ? (
                <>
                  <p className="-mb-2 mt-2 text-sm italic text-blue-500">
                    {t("work.bonus")}
                  </p>
                  <div
                    className="content-sub grid grid-cols-3 gap-3 rounded-xl px-2"
                    style={{
                      animation:
                        "0.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running leftFloatIn",
                    }}
                  >
                    {dateDetail.ot ? (
                      <div className="card-1 flex -skew-x-3 flex-col justify-between rounded-lg p-2 shadow shadow-indigo-600">
                        <div className="flex items-center justify-between px-1 text-blue-400">
                          <FaArrowAltCircleUp className="" size={20} />
                          <p className="title line-clamp-1 text-center text-xs">
                            {t("work.overtime")}
                          </p>
                        </div>
                        <div className="value mt-1 text-center text-lg font-medium text-blue-800">
                          {Math.floor(dateDetail.ot / 60)
                            ? Math.floor(dateDetail.ot / 60) + "H"
                            : ""}{" "}
                          {Math.floor(dateDetail.ot % 60)
                            ? Math.floor(dateDetail.ot % 60) + "M"
                            : ""}
                        </div>
                      </div>
                    ) : null}
                    {dateDetail.eb ? (
                      <div className="card-1 flex -skew-x-3 flex-col justify-between rounded-lg p-2 shadow shadow-indigo-600">
                        <div className="flex items-center justify-between px-1 text-blue-400">
                          <BiSolidBowlRice className="" size={20} />
                          <p className="title line-clamp-1 text-center text-xs">
                            {t("work.eatBonus")}
                          </p>
                        </div>
                        <div className="value mt-1 text-center text-lg font-medium text-blue-800">
                          {Math.floor(dateDetail.eb / 60)
                            ? Math.floor(dateDetail.eb / 60) + "H"
                            : ""}{" "}
                          {Math.floor(dateDetail.eb % 60)
                            ? Math.floor(dateDetail.eb % 60) + "M"
                            : ""}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
              {dateDetail.leaveSoon + dateDetail.comeLate > 0 ? (
                <>
                  <p className="-mb-2 mt-2 text-sm italic text-blue-500">
                    Khấu trừ
                  </p>
                  <div className="content-sub grid grid-cols-3 gap-3 rounded-xl px-2">
                    {dateDetail.comeLate ? (
                      <div className="card-1 flex -skew-x-3 flex-col justify-between rounded-lg p-2 shadow shadow-indigo-600">
                        <div className="flex items-center justify-between px-1 text-blue-400">
                          <PiClockCountdownFill className="" size={20} />
                          <p className="title text-center text-xs">Đi muộn</p>
                        </div>
                        <div className="value mt-1 text-center text-lg font-medium text-blue-800">
                          {Math.floor(dateDetail.comeLate / 60)
                            ? Math.floor(dateDetail.comeLate / 60) + "H"
                            : ""}{" "}
                          {Math.floor(dateDetail.comeLate % 60)
                            ? Math.floor(dateDetail.comeLate % 60) + "M"
                            : ""}
                        </div>
                      </div>
                    ) : null}
                    {dateDetail.leaveSoon ? (
                      <div className="card-1 flex -skew-x-3 flex-col justify-between rounded-lg p-2 shadow shadow-indigo-600">
                        <div className="flex items-center justify-between px-1 text-blue-400">
                          <BiRun className="" size={20} />
                          <p className="title text-center text-xs">Về sớm</p>
                        </div>
                        <div className="value mt-1 text-center text-lg font-medium text-blue-800">
                          {Math.floor(dateDetail.leaveSoon / 60)
                            ? Math.floor(dateDetail.leaveSoon / 60) + "H"
                            : ""}{" "}
                          {Math.floor(dateDetail.leaveSoon % 60)
                            ? Math.floor(dateDetail.leaveSoon % 60) + "M"
                            : ""}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
              {/* <div className="card-1 flex -skew-x-3 flex-col justify-between rounded-lg p-2 shadow shadow-indigo-600">
              <div className="flex items-center justify-between px-1 text-blue-400">
                <FaArrowAltCircleUp className="" size={20} />
                <p className="title text-center text-xs">Tăng ca</p>
              </div>
              <div className="value mt-1 text-center text-lg font-medium text-blue-800">
                2H 30P
              </div>
            </div>
            <div className="card-1 flex -skew-x-3 flex-col gap-1 rounded-lg p-2 shadow shadow-indigo-600">
              <div className="flex items-center justify-between px-1 text-blue-400">
                <BiSolidBowlRice size={20} />
                <p className="title text-center text-xs">Trợ ăn</p>
              </div>
              <div className="value mt-1 text-center text-lg font-medium text-blue-800">
                2H 30P
              </div>
            </div> */}
              {/* <div className="card-1 flex flex-col gap-1 rounded-lg p-2 shadow shadow-indigo-800">
              <div className="flex items-center justify-between px-1">
                <p>ic</p>
                <p className="title text-center text-xs text-indigo-600">
                  Tăng ca
                </p>
              </div>
              <div className="value my-2 text-center text-lg font-medium text-indigo-800">
                2H 30P
              </div>
            </div> */}
            </div>
          </>
        ) : (
          <Empty />
        )}

        <div className="content-sub flex"></div>
        <div className="button"></div>
        <div className="h-1"></div>
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

const CalendarMark = (props: CalendarMarkProps) => {
  const [haveSomething, setHaveSomething] = React.useState(false);
  if (!props.data) return <div></div>;

  return (
    <div className="flex w-full items-center justify-center px-[15%]">
      <div
        className={`h-1 w-full overflow-hidden rounded-lg bg-transparent shadow ${Number(props?.data?.shift) === 2 ? "flex shadow-primary-8" : ""}`}
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
