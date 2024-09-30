import { httpPost } from "../../../api/axios";

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

export function numberToCurrency2(
  input: number | string,
  gap: number = 3,
  symbol: string = ",",
) {
  let result = "";

  const text = input.toString();
  let i = 0;
  while (i < text.length) {
    if (i !== 0 && (text.length - i) % gap === 0) result += symbol + text[i];
    else result += text[i];
    i++;
  }

  return result;
}

export const notificationItems = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  title: `Tin nóng hệ social qwe qwe qwe qwe qwe qwe qwe qwe qwe qwe qwe qwe qwe ${
    i + 1
  }`,
  description:
    "Nội dung này thường chỉ show cho mấy máy màn hình to v beep để có cái nhìn lướt qua về cái tin mới của nó. Còn mấy máy màn hình lỏ lỏ thì mút tay ấy mà đọc?",
  uploader: `Bởi bộ tài nguyên và môi trường, cầm đầu bởi Hùng ${i + 1}`,
  image: `https://wallup.net/wp-content/uploads/2016/01/111509-landscape-nature.jpg?${
    i + 1
  }`,
  content: "JAHWA NƯƠNG",
  date: new Date(Date.now() - i * 1000 * 3600 * 24).toISOString().split("T")[0],
  type: ["social", "company", "temporary", "picture"][
    Math.floor(Math.random() * 4)
  ],
}));

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

export const getWageData = async (id: string, date: string) => {
  try {
    const dateString =
      date.slice(0, 4) == "2000"
        ? undefined
        : date.slice(0, 4) + date.slice(5, 7);
    const [total, income, dedux, workTime] = await Promise.all([
      getTotalWay(id, dateString),
      getIncome(id, dateString),
      getDedux(id, dateString),
      getWorkTime(id, dateString),
    ]);
    return {
      total: total || {},
      income: income || [],
      dedux: dedux || [],
      workTime: workTime || {},
    };
  } catch (error) {
    console.log(error);
  }
};
