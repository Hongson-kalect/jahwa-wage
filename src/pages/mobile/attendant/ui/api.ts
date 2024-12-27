import axios from "axios";
import dayjs from "dayjs";
import { useMobileAppStore as userInfo } from "../../../../store/mobile.app";

// export const getAttendance = async (year: string, month: string) => {
//   console.log("year,month :>> ", year, month);
//   const { firstDay, lastDay } = getFirstAndLastDayOfMonth(year, month);
//   const res = await axios.post("api/MAttendanceInformation", {
//     FrDate: firstDay,
//     ToDate: lastDay,
//     EntCode: userInfo.getState().entCode,
//     EmpCode: userInfo.getState().empCode,
//   });
//   return res.data;
// };
export const getAttendance = async (firstDay: string, lastDay: string) => {
  // console.log("year,month :>> ", year, month);
  // const { firstDay, lastDay } = getFirstAndLastDayOfMonth(year, month);
  const res = await axios.post("api/MAttendanceInformation", {
    FrDate: firstDay,
    ToDate: lastDay,
    EntCode: userInfo.getState().entCode,
    EmpCode: userInfo.getState().empCode,
  });
  return res.data;
};

export const getDayOff = async (year: string) => {
  const res = await axios.post("api/MAnnualLeaveInformation", {
    YYYY: year,
    EmpCode: userInfo.getState().empCode,
  });

  return res.data;
};

export const getFirstAndLastDayOfMonth = (year, month: string) => {
  const firstDay = dayjs(`${year}-${month}`).format("YYYY-MM-DD");
  const lastDay = dayjs(`${year}-${month}`).endOf("month").format("YYYY-MM-DD");
  return { firstDay, lastDay };
};
