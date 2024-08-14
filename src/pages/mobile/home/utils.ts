import { httpPost } from "../../../api/axios";

export const getWorkData = async (emp_no: string, month?: string) => {
  if (month?.slice(0, 4) === "2000") month = undefined;

  let data = {
    work: [],
    shift: [],
  };

  const [work, shift] = await Promise.all([
    getWorkDate(emp_no, month),
    getWorkShift(emp_no, month),
  ]);
  data = { work, shift };

  return data;
  // month = month.slice(0,4)==='2000'?

  const res = await httpPost("lich", { emp_no, month });
  return res.data;
};
export const getWorkDate = async (emp_no: string, month?: string) => {
  // month = month.slice(0,4)==='2000'?
  if (month?.slice(0, 4) === "2000") month = undefined;
  const res = await httpPost("lich", { emp_no, month });
  return res.data;
};
export const getWorkShift = async (emp_no: string, month?: string) => {
  // month = month.slice(0,4)==='2000'?
  if (month?.slice(0, 4) === "2000") month = undefined;
  const res = await httpPost("calam", { emp_no, month });
  return res.data;
};

export const calDateValue = (date: string) => {
  if (!date) return 0;
  const arr = date.slice(0, 10).split("-");
  return Number(arr[0]) * 500 + Number(arr[1]) * 40 + Number(arr[2]);
};
