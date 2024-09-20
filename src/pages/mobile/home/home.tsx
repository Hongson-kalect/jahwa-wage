import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUserInfoStore } from "../../../store/userinfo";
import HomeContent from "./ui/content";
import HomeHeader from "./ui/header";
import { HomeDataType, WorkType } from "./interface";
import { calDateValue, getHomeData } from "./utils";

export default function MobileHomePage() {
  const { user } = useUserInfoStore();
  const [date] = React.useState<Dayjs>(
    dayjs(new Date().toISOString(), "YYYY-MM-DD"),
  );

  const { t } = useTranslation();

  const [homeData, setHomeData] = useState<HomeDataType>({
    bonus: [],
    deduct: [],
    workShift: [],
    workDate: [],
    workTime: {
      emp_no: "Loading...",
      tot_day: "0.0",
      wk_time: "0.0",
      work_day: "0.0",
    },
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
  // const [fes, setFes] = useState({ day: 0, night: 0 });
  // const [other, setOther] = useState([]);

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
    >
      <HomeHeader
        dayWorkCount={dayWorkCount}
        workTime={workTime}
        overTime={overTime}
      />
      <div className="content-wrap px-2">
        <div className="content-options mt-4 flex justify-between py-2">
          <div className="option text-2xl font-medium text-indigo-900">
            {t("common.detail")}
          </div>
        </div>
        <HomeContent
          dayWorkCount={dayWorkCount}
          eatBonus={eatBonus}
          overTime={overTime}
          sunday={sunday}
        />
      </div>
    </div>
  );
}
