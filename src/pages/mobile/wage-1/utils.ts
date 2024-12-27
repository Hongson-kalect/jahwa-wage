import axios from "axios";
import { httpPost } from "../../../api/axios";
import { toast } from "react-toastify";

import { useMobileAppStore as userInfo } from "../../../store/mobile.app";
import { WorkMonth, WorkType } from "./interface";

export const getWageMonth = async () => {
  try {
    const res = await httpPost("api/MSelectList", {
      DIV: "PAY_YYMM",
      Data: "",
      EntCode: userInfo.getState().entCode,
      EmpCode: userInfo.getState().empCode,
    });
    return res.data;
  } catch (error) {
    toast.error("Failed to get database");
    return {};
  }

};
export const getWageType = async (month: string) => {
  try {
    const res = await httpPost("api/MSelectList", {
      DIV: "PROV_TYPE",
      Data: month, //"202406",
      EntCode: userInfo.getState().entCode,
      EmpCode: userInfo.getState().empCode,
    });
    return res.data;
  } catch (error) {
    toast.error("Failed to get database");
    return {};
  }
};
export const getWageData = async (month: string) => {
  try {
    const res = await httpPost("api/MSalaryInformation", {
      PayYYMM: month, //"202406",
      ProvType: "1",
      EntCode: userInfo.getState().entCode,
      EmpCode: userInfo.getState().empCode,
    });
    return res.data;
  } catch (error) {
    toast.error("Failed to get database");
    return {};
  }
};

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

export const payFor = [
  {
    payFor: "LCB ngày làm việc",
    amount: 5855000,
    hour: 0,
    munite: 0,
  },
  {
    payFor: "Thưởng làm đêm",
    amount: 150000,
    hour: 15,
    munite: 0,
  },
  {
    payFor: "PC Sinh hoạt",
    amount: 358158,
    hour: 0,
    munite: 0,
  },
  {
    payFor: "Thưởng chuyên cần",
    amount: 100000,
    hour: 1,
    munite: 0,
  },
  {
    payFor: "PC Ca đêm_K(30%)",
    amount: 811947,
    hour: 90,
    munite: 0,
  },
  {
    payFor: "PC tăng ca (150%)",
    amount: 969825,
    hour: 21,
    munite: 30,
  },
  {
    payFor: "PC tăng ca đêm (200%)",
    amount: 842020,
    hour: 14,
    munite: 0,
  },
  {
    payFor: "PC làm cn (200%)",
    amount: 481154,
    hour: 8,
    munite: 0,
  },
  {
    payFor: "PC tăng ca CN (200%)",
    amount: 60144,
    hour: 1,
    munite: 0,
  },
  {
    payFor: "PC tăng thêm (150%)",
    amount: 225541,
    hour: 5,
    munite: 0,
  },
  {
    payFor: "Hỗ trợ ăn (150%)",
    amount: 251803,
    hour: 5,
    munite: 0,
  },
  {
    payFor: "Hỗ trợ ăn (200%)",
    amount: 751803,
    hour: 12,
    munite: 0,
  },
  {
    payFor: "HỖ TRỢ LÀM ĐÊM (150%)",
    amount: 112770,
    hour: 2,
    munite: 30,
  },
];

export const minus = [
  {
    payFor: "LCB NGÀY LÀM VIỆC",
    amount: 5855000,
    hour: 0,
    munite: 0,
  },
  {
    payFor: "THƯỞNG LÀM ĐÊM",
    amount: 150000,
    hour: 15,
    munite: 0,
  },
  {
    payFor: "PC SINH HOẠT",
    amount: 358158,
    hour: 0,
    munite: 0,
  },
  {
    payFor: "THƯỞNG CHUYÊN CẦN",
    amount: 100000,
    hour: 1,
    munite: 0,
  },
  {
    payFor: "PHC CA ĐÊM_K(30%)",
    amount: 811947,
    hour: 90,
    munite: 0,
  },
];

export function numberToCurrency(number: number) {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(number);
}

export const getTotalWay = async (id: string, date?: string) => {
  try {
    const res = await httpPost("luongchinh", { emp_no: id, pay_yymm: date });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getIncome = async (id: string, date?: string) => {
  try {
    const res = await httpPost("luongthuong", { emp_no: id, pay_yymm: date });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getDedux = async (id: string, date?: string) => {
  try {
    const res = await httpPost("khautru", { emp_no: id, pay_yymm: date });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
export const getWorkTime = async (id: string, date?: string) => {
  try {
    const res = await httpPost("ngaydilam", { emp_no: id, pay_yymm: date });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getYearWage = async (id: string, year: string) => {
  try {
    const dateString =
      year.slice(0, 4) == "2000" ? undefined : year.slice(0, 4);

    const res = await httpPost("tongluong", {
      emp_no: id,
      pay_yymm: dateString,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
