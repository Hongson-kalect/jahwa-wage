import { Avatar, Button, Empty, Image, Popover, Tooltip } from "antd";
import { FaBarsStaggered, FaUpLong } from "react-icons/fa6";
import { GoSun } from "react-icons/go";
import { IoMoonOutline } from "react-icons/io5";
import { LiaHandHoldingUsdSolid } from "react-icons/lia";
import LanguageChanger from "../../../components/common/languageChange";
import { useQuery } from "@tanstack/react-query";
import { calDateValue, getHomeData } from "./utils";
import { useUserInfoStore } from "../../../store/userinfo";
import React, { useEffect, useMemo, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import VietnameseDate from "vietnamese-date";
import { WorkType } from "./interface";
import { LuArrowBigUp, LuLogOut } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { removeCookie } from "../../../lib/utlis";
import { HeaderNew } from "../calendar-new/components/header";
import { useTranslation } from "react-i18next";

export interface IMobileHomePage1Props {}

export default function MobileHomePage1(props: IMobileHomePage1Props) {
  const { user } = useUserInfoStore();
  const [date, setDate] = React.useState<Dayjs>(
    dayjs(new Date().toISOString(), "YYYY-MM-DD"),
  );
  const lunarDate = useMemo(() => {
    return new VietnameseDate(new Date());
  }, []);
  const { t } = useTranslation();

  const [homeData, setHomeData] = useState({
    bonus: [],
    deduct: [],
    workShift: [],
    workDate: [],
    workTime: [],
  });
  const [dayData, setDayData] = useState<
    { date: string; shift: string; data: WorkType[] }[]
  >([]);
  const [dayWorkCount, setDayWorkCount] = useState({
    day: 0,
    night: 0,
    sun: 0,
    dayOff: 0,
    fes: 0,
  });
  const [overTime, setOverTime] = useState({ day: 0, night: 0, sun: 0 });
  const [eatBonus, setEatBonus] = useState({ day: 0, night: 0, sun: 0 });
  const [sunday, setSunday] = useState({ day: 0, night: 0 });
  const [fes, setFes] = useState({ day: 0, night: 0 });
  const [other, setOther] = useState([]);

  const homeQuery = useQuery({
    queryKey: [date, "workData"],
    queryFn: () => getHomeData(user?.EMP_NO || "", "2022-12"),
    // getHomeData(user?.EMP_NO || "", new Date().toISOString().slice(0, 7)),
    // getHomeData(user?.EMP_NO || "", `${date.year()}-${date.month()}`),
  });

  const workTime = useMemo(() => {
    if (homeQuery?.data?.workTime?.[0]) {
      return homeQuery.data.workTime[0];
    }
    return {
      emp_no: "",
      tot_day: "",
      wk_time: "",
      work_day: "",
    };
  }, [homeQuery?.data?.workTime]);

  // const workTime  = useMemo(()=>{
  //   if(homeQuery?.data?.workTime){
  //     return homeQuery.data.workTime
  //   }
  //   return {
  //     total: 0,
  //     work: 0,}
  // },[homeQuery?.data?.workTime])

  useEffect(() => {
    if (homeQuery.data) {
      setHomeData(homeQuery.data);
    }
  }, [homeQuery.data]);

  useEffect(() => {
    if (homeData) {
      //Gather day data at one

      const workDates = homeData.workDate;
      const workShifts = homeData.workShift;
      const sortArray: { date: string; shift: string; data: WorkType[] }[] = [];
      const tempOverTime = { day: 0, night: 0, sun: 0 };
      const tempEatBonus = { day: 0, night: 0, sun: 0 };

      const tempOther = [];

      workDates.map((work) => {
        if ([31].includes(Number(work.dilig_cd)))
          tempOverTime.day +=
            Number(work.dilig_hh) * 60 + Number(work.dilig_mm);
        if ([33].includes(Number(work.dilig_cd)))
          tempOverTime.night +=
            Number(work.dilig_hh) * 60 + Number(work.dilig_mm);
        if (
          [33, 31].includes(Number(work.dilig_cd)) &&
          new Date(work.check_date).getDay() === 0
        )
          tempOverTime.sun +=
            Number(work.dilig_hh) * 60 + Number(work.dilig_mm);
        //thiếu cái tăng ca của ngày nghỉ

        if ([55].includes(Number(work.dilig_cd)))
          tempEatBonus.day +=
            Number(work.dilig_hh) * 60 + Number(work.dilig_mm);
        if ([56].includes(Number(work.dilig_cd)))
          tempEatBonus.night +=
            Number(work.dilig_hh) * 60 + Number(work.dilig_mm);
        if (
          [55, 56].includes(Number(work.dilig_cd)) &&
          new Date(work.check_date).getDay() === 0
        )
          tempEatBonus.sun +=
            Number(work.dilig_hh) * 60 + Number(work.dilig_mm);
        //thiếu cái hỗ trợ ăn của ngày nghỉ

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
            shift: workShift,
            data: [],
          };
          sortArray.push(matchDate);
        }
        matchDate.data.push(work);
      });
      setOverTime(tempOverTime);
      setEatBonus(tempEatBonus);

      return setDayData(sortArray);
    }
  }, [homeData]);

  useEffect(() => {
    if (dayData?.length) {
      const tempSunday = { day: 0, night: 0 };
      // const tempFes = {day:0,night:0}

      const tempDayWorkCount = {
        day: 0,
        night: 0,
        sun: 0,
        fes: 0,
        dayOff: 0,
        // fes: 0,
      };
      dayData.map((day) => {
        if (day.data.some((item) => [1].includes(Number(item.dilig_cd)))) {
          tempDayWorkCount.dayOff += 1;
          return;
        } //Trừ mấy ngày nghỉ sẽ ko tính ngày làm
        if (Number(day.shift) === 2) tempDayWorkCount.night += 1;
        else tempDayWorkCount.day += 1;
        if (Number(new Date(day.date).getDay() === 0))
          tempDayWorkCount.sun += 1;

        if (new Date(day.date).getDay() === 0) {
          if (Number(day.shift) === 2) tempSunday.day += 1;
          else tempSunday.night += 1;

          //thiếu cái ngày đêm của ngày nghỉ
        }
      });
      setDayWorkCount(tempDayWorkCount);
      setSunday(tempSunday);
    }
  }, [dayData]);

  return (
    <div
      className="h-full w-full overflow-y-auto overflow-x-hidden bg-slate-50"
      style={{ height: "calc(100dvh - 44px)" }}
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
        className="header h-[165px] rounded-b-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 px-3 py-2 shadow-md shadow-indigo-700"
        style={
          {
            // background: "#5366f1 ",
            // boxShadow:
            //   "inset 10px 10px 10px #2862ff, inset -12px -12px 10px #2862ff , 0px 6px 9px #606dca",
          }
        }
        // style={{
        //   background: `url(https://th.bing.com/th/id/OIP.onJtjFhdkQc9xvZ6EF1zQQHaEo?rs=1&pid=ImgDetMain) center center /cover no-repeat`,
        // }}
      >
        <HeaderNew title={t("common.monthReport")} />
      </div>
      <div className="content -mt-24 h-60 flex-1 px-4">
        <div
          className="panel h-[180px] rounded-3xl bg-white px-[18px] py-[12px] shadow-sm shadow-blue-800"
          style={{
            animation:
              "0.3s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running topFloatIn",
          }}
        >
          <div className="main-panel flex h-2/3 items-center justify-center gap-6">
            {/* <p className="day flex flex-shrink px-2 pb-8 pt-2 font-serif text-4xl font-medium text-indigo-900 shadow-md shadow-gray-300">
              {new Date().getDay()===0?"Chủ nhật":<div>Thứ {new Date().getDay()+1}</div>}
            </p> */}
            <div className="flex w-32 flex-col gap-1 text-center shadow shadow-black">
              <div className="bg-indigo-600 py-0.5 text-xs text-white">
                {new Date().getDay() === 0 ? (
                  "Chủ nhật"
                ) : (
                  <div>{t("common.day" + new Date().getDay())}</div>
                )}
              </div>
              <div
                className={`text-4xl font-medium ${new Date().getDay() === 0 ? "text-white" : new Date().getDay() === 6 ? "text-[#e0793d]" : "text-gray-800"}`}
              >
                {new Date().getDate()}
              </div>
              <div className="py-0.5 text-xs font-light">
                {t("common.month")} {new Date().getMonth() + 1}
              </div>
            </div>
            <div className="">
              <p className="calendar text-base font-medium text-gray-700">
                <span className="text-xs font-normal">
                  {t("common.lunarDate")}:
                </span>{" "}
                {lunarDate.day} - {lunarDate.month}
                <span className="pl-1 text-gray-500">
                  {" "}
                  {lunarDate.celestialStemOfYear}{" "}
                  {lunarDate.terrestrialBranchOfYear}
                </span>
              </p>
              <p className="pt-2 text-xs font-light">
                <span className="text-sm font-medium text-blue-600">
                  {t("common.Hour")} hoàng đạo:{" "}
                </span>{" "}
                {lunarDate.propitiousHours}
              </p>
            </div>
          </div>
          <div className="pt-2">
            <div className="panel-content flex items-center justify-between text-indigo-300">
              <div className="item">
                <p className="pb-1 font-mono text-xs">{t("common.dayCount")}</p>
                <p className="text-center text-lg text-black">
                  {/* {Number(workTime?.tot_day)} */}
                  {Number(dayWorkCount.day + dayWorkCount.night)}
                </p>
              </div>
              <div className="item">
                <p className="pb-1 font-mono text-xs">
                  {t("common.hourCount")}
                </p>
                <p className="text-center text-lg text-black">
                  {Number(workTime.wk_time)}
                </p>
              </div>
              <div className="item">
                <p className="pb-1 font-mono text-xs">
                  {t("common.overTimeCount")}
                </p>
                <p className="text-center text-lg text-black">
                  {Math.round(((overTime.day + overTime.night) * 10) / 60) /
                    10 +
                    " " +
                    t("common.Hour")}
                </p>
              </div>
              <div className="item">
                <p className="pb-1 font-mono text-xs">
                  {t("common.offDayLeft")}
                </p>
                <p className="text-center text-lg text-black">0</p>
              </div>
            </div>
          </div>
        </div>
        <div className="content-options mt-4 flex justify-between py-2">
          <div className="option text-2xl font-medium text-indigo-900">
            {t("common.detail")}
          </div>
          {/* <div className="option text-red-500">View all</div> */}
        </div>
        {dayWorkCount.night + dayWorkCount.day > 0 ? (
          <>
            <div className="content-main grid grid-cols-3 gap-4 py-2">
              <div className="item rounded-3xl border border-solid border-blue-600 bg-white px-4 py-3 text-blue-600 shadow-md shadow-blue-500">
                <p className="text-sm">{t("common.day")}</p>
                <p className="p-2 pb-0 text-center text-3xl font-medium">
                  {dayWorkCount.day}
                </p>
              </div>
              <div
                className={`item rounded-3xl bg-blue-600 px-4 py-3 text-white shadow shadow-indigo-500 ${
                  dayWorkCount.night === 0 ? "opacity-50" : ""
                }`}
                style={{
                  animation:
                    "0.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running rightFloatIn",
                }}
              >
                <p className="text-sm">{t("common.Night")}</p>
                <p className="p-2 pb-0 text-center text-3xl font-bold">
                  {dayWorkCount.night}
                </p>
              </div>
              {dayWorkCount.sun ? (
                <div
                  className="item rounded-3xl border border-solid border-blue-900 bg-indigo-900 px-4 py-3 text-white shadow-md shadow-gray-500"
                  style={{
                    animation:
                      "1s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running rightFloatIn",
                  }}
                >
                  <p className="text-sm">{t("common.sun")}</p>
                  <p className="p-2 pb-0 text-center text-3xl font-bold">
                    {dayWorkCount.sun}
                  </p>
                </div>
              ) : null}
              {dayWorkCount.fes ? (
                <div
                  className="item rounded-3xl bg-white px-4 py-3 text-blue-600 shadow-md shadow-[#fe4f6f88]"
                  style={{
                    animation:
                      "1s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running rightFloatIn",
                  }}
                >
                  <p className="text-sm">{t("common.fes")}</p>
                  <p className="p-2 pb-0 text-center text-3xl font-bold">
                    {dayWorkCount.fes}
                  </p>
                </div>
              ) : null}
            </div>
            <div
              className="mt-3 flex flex-col gap-2"
              style={{
                animation:
                  "0.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running bottomFloatIn",
              }}
            >
              {overTime.night + overTime.day > 0 ? (
                <div className="content-sub flex gap-2 rounded-xl bg-white px-2 py-1 shadow-sm shadow-indigo-400">
                  {/* <div className="type border-right flex w-10 items-center justify-center rounded-2xl font-bold text-blue-600">
                    OT
                  </div> */}
                  <div className="content flex-1 py-1">
                    <div className="title text-xs text-gray-500">
                      {t("common.overtime")}
                    </div>
                    <div className="items mt-1 flex justify-evenly px-2 pr-4 text-sm">
                      <div
                        className={`item flex flex-1 gap-1 ${overTime.day ? "" : "opacity-35"}`}
                      >
                        <GoSun size={16} className="mb-0.5 text-blue-600" />{" "}
                        <p className="font-medium text-gray-600">
                          {Math.round(overTime.day / 6) / 10} {t("common.Hour")}
                        </p>
                      </div>
                      <div
                        className={`item flex flex-1 items-center gap-1 ${overTime.night ? "" : "opacity-35"}`}
                      >
                        <IoMoonOutline
                          size={16}
                          className="mb-0.5 text-blue-600"
                        />{" "}
                        <p className="font-medium text-gray-600">
                          {Math.round(overTime.night / 6) / 10}{" "}
                          {t("common.Hour")}
                        </p>
                      </div>
                      <div
                        className={`item flex flex-1 items-center gap-1 ${overTime.sun ? "" : "opacity-35"}`}
                      >
                        <p className="mb-0.5 rounded-full border border-solid border-indigo-500 px-1 text-xs text-blue-600">
                          CN
                        </p>
                        <p className="font-medium text-gray-600">
                          {Math.round(overTime.sun / 6) / 10} {t("common.Hour")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {eatBonus.night + eatBonus.day > 0 ? (
                <div className="content-sub flex gap-2 rounded-xl bg-white px-2 py-1 shadow-sm shadow-indigo-400">
                  {/* <div className="type flex w-16 items-center justify-center rounded-2xl bg-blue-600 py-4 text-white shadow-md shadow-indigo-400">
                    EB
                  </div> */}
                  <div className="content flex-1 py-1">
                    <div className="title text-xs text-gray-500">
                      {t("common.eatBonus")}
                    </div>
                    <div className="items mt-1 flex justify-between px-2 pr-4 text-sm">
                      <div
                        className={`item flex flex-1 items-center gap-1 ${eatBonus.day ? "" : "opacity-35"}`}
                      >
                        <GoSun size={16} className="mb-0.5 text-blue-600" />{" "}
                        <p className="font-medium text-gray-600">
                          {Math.round(eatBonus.day / 6) / 10} {t("common.Hour")}
                        </p>
                      </div>
                      <div
                        className={`item flex flex-1 items-center gap-1 ${eatBonus.night ? "" : "opacity-35"}`}
                      >
                        <IoMoonOutline
                          size={16}
                          className="mb-0.5 text-blue-600"
                        />{" "}
                        <p className="font-medium text-gray-600">
                          {Math.round(eatBonus.night / 6) / 10}{" "}
                          {t("common.Hour")}
                        </p>
                      </div>
                      <div
                        className={`item flex flex-1 items-center gap-1 ${eatBonus.sun ? "" : "opacity-35"}`}
                      >
                        <p className="mb-0.5 rounded-full border border-solid border-indigo-500 px-1 text-xs text-blue-600">
                          CN
                        </p>
                        <p className="font-medium text-gray-600">
                          {Math.round(eatBonus.sun / 6) / 10} {t("common.Hour")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {sunday.night + sunday.day + overTime.sun > 0 ? (
                <div className="content-sub flex gap-2 rounded-xl bg-white px-2 py-1 shadow-sm shadow-indigo-900">
                  {/* <div className="type flex w-16 items-center justify-center rounded-2xl bg-white py-4 text-blue-600 text-white shadow-md shadow-[#fe4f6f88]">
                    CN
                  </div> */}
                  <div className="content flex-1 py-1">
                    <div className="title text-xs text-indigo-900">
                      {t("common.weekendWork")}
                    </div>
                    <div className="items mt-1 flex justify-between px-2 pr-4 text-sm">
                      <div
                        className={`item flex flex-1 items-center gap-1 ${sunday.day ? "" : "opacity-35"}`}
                      >
                        <GoSun size={16} className="mb-0.5 text-blue-600" />{" "}
                        <p className="font-medium text-gray-600">
                          {sunday.day} {t("common.day")}
                        </p>
                      </div>
                      <div
                        className={`item flex flex-1 items-center gap-1 ${sunday.night ? "" : "opacity-35"}`}
                      >
                        <IoMoonOutline
                          size={16}
                          className="mb-0.5 text-blue-600"
                        />{" "}
                        <p className="font-medium text-gray-600">
                          {sunday.night} {t("common.day")}
                        </p>
                      </div>
                      <div
                        className={`item flex flex-1 items-center gap-1 ${overTime.sun ? "" : "opacity-35"}`}
                      >
                        <LuArrowBigUp size={18} className="text-blue-600" />{" "}
                        <p className="font-medium text-gray-600">
                          {Math.round(overTime.sun / 6) / 10} {t("common.Hour")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : null}
              {/* Thiếu của ngày lễ làm tương tự như chủ nhật */}
            </div>
          </>
        ) : (
          <Empty />
        )}

        {/* <div className="other">
          <p>Khác</p>
          <div>
            <div>
              <p>Ngày nghỉ</p>
              <div>{dayWorkCount.dayOff}</div>
            </div>
          </div>
        </div> */}

        <div className="content-sub flex"></div>
        <div className="button"></div>
        <div className="h-1"></div>
      </div>
    </div>
  );
}
