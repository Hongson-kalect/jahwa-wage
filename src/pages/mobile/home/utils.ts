import axios from "axios";
import { httpPost } from "../../../api/axios";
import {
  HomeDataType,
  WorkBonus,
  WorkDate,
  WorkDeduct,
  WorkShift,
  WorkTime,
} from "./interface";
import { useMobileAppStore as userInfo } from "../../../store/mobile.app";
import dayjs from "dayjs";

export const getNews = async () => {
  // const res = await httpPost("/api/news/get-news");
  return [
    { title: "New 1", content: "Content 1" },
    { title: "New 1", content: "Content 1" },
    { title: "New 1", content: "Content 1" },
    { title: "New 1", content: "Content 1" },
    { title: "New 1", content: "Content 1" },
    { title: "New 1", content: "Content 1" },
  ];
};

export const getWageTime = async () => {
  const res = await axios.post("/api/MSelectList", {
    DIV: "PAY_YYMM",
    // Data: thang,
    EntCode: userInfo.getState().entCode,
    EmpCode: userInfo.getState().empCode,
  });
  return res.data;
};

export const getWage = async (thangLuong: string, loaiLuong: string) => {
  const dulieuApi = await axios.post("/api/MSalaryInformation", {
    PayYYMM: thangLuong,
    ProvType: loaiLuong,
    EntCode: userInfo.getState().entCode,
    EmpCode: userInfo.getState().empCode,
  });
  return dulieuApi.data;
};

export const getAttendance = async (month: string) => {
  const { firstDay, lastDay } = getFirstAndLastDayOfMonth(
    month.slice(0, 4),
    month.slice(4, 6),
  );
  const res = await axios.post("api/MAttendanceInformation", {
    FrDate: firstDay,
    ToDate: lastDay,
    EntCode: userInfo.getState().entCode,
    EmpCode: userInfo.getState().empCode,
  });
  return res.data;
};

export const getDayOff = async (year: string) => {
  const res = await axios.post("/api/MAnnualLeaveInformation", {
    YYYY: year,
    EmpCode: userInfo.getState().empCode,
  });
  return res.data;
};

export const getFirstAndLastDayOfMonth = (year: string, month: string) => {
  const firstDay = dayjs(`${year}-${month}`).format("YYYY-MM-DD");
  const lastDay = dayjs(`${year}-${month}`).endOf("month").format("YYYY-MM-DD");
  return { firstDay, lastDay };
};
