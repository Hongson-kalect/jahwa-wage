import { httpPost } from "../../../api/axios";
import {
  HomeDataType,
  WorkBonus,
  WorkDate,
  WorkDeduct,
  WorkShift,
  WorkTime,
} from "./interface";

export const getBonus = async (
  emp_no: string,
  month?: string,
): Promise<WorkBonus[]> => {
  const res = await httpPost("luongthuong", { emp_no, month });
  return res.data;
};

export const getWorkDate = async (
  emp_no: string,
  month?: string,
): Promise<WorkDate[]> => {
  const res = await httpPost("lich", { emp_no, month });
  return res.data;
};

export const getWorkShift = async (
  emp_no: string,
  month?: string,
): Promise<WorkShift[]> => {
  const res = await httpPost("calam", { emp_no, month });
  return res.data;
};

export const getGetDeduct = async (
  emp_no: string,
  month?: string,
): Promise<WorkDeduct[]> => {
  const res = await httpPost("khautru", { emp_no, month });
  return res.data;
};
export const getWorkTime = async (
  emp_no: string,
  month?: string,
): Promise<WorkTime> => {
  const res = await httpPost("ngaydilam", { emp_no, month });
  return res.data;
};

export const getHomeData = async (emp_no: string, month?: string) => {
  if (month?.slice(0, 4) === "2000") month = undefined;

  let data: HomeDataType = {
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
  };

  const [bonus, deduct, workShift, workDate, workTime] = await Promise.all([
    getBonus(emp_no, month),
    getGetDeduct(emp_no, month),
    getWorkShift(emp_no, month),
    getWorkDate(emp_no, month),
    getWorkTime(emp_no, month),
  ]);
  data = { bonus, deduct, workShift, workDate, workTime };

  return data;
  // month = month.slice(0,4)==='2000'?

  const res = await httpPost("lich", { emp_no, month });
  return res.data;
};

export const calDateValue = (date: string) => {
  if (!date) return 0;
  const arr = date.slice(0, 10).split("-");
  return Number(arr[0]) * 500 + Number(arr[1]) * 40 + Number(arr[2]);
};
