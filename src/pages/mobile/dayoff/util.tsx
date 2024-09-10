import { httpPost } from "../../../api/axios";

export const getDayOffCount = async (id: string) => {
  try {
    const res = await httpPost("phepnam", {
      emp_no: id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDayOffHistory = async (id: string) => {
  try {
    const res = await httpPost("ngaynghi", {
      emp_no: id,
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const getDayOff = async (id: string) => {
  try {
    const [dayCount, history] = await Promise.all([
      getDayOffCount(id),
      getDayOffHistory(id),
    ]);
    return {
      dayCount: dayCount?.[0] || {},
      history: history || [],
    };
  } catch (error) {
    console.log(error);
  }
};
