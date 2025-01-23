import { useTranslation } from "react-i18next";
import { t } from "i18next";
import { Empty } from "antd";
import { Attendance } from "../../../../interface/attendance";

export const AttendanceItem = ({ item }: { item: Attendance }) => {
  const wordShift = Number(item.STRT_TIME.slice(0, 2)) <= 17 ? "day" : "night";
  const endTimeValue =
    Number(item.END_TIME.slice(0, 2)) * 100 + Number(item.END_TIME.slice(3, 5));
  const startTimeValue =
    Number(item.STRT_TIME.slice(0, 2)) * 100 +
    Number(item.STRT_TIME.slice(3, 5));

  const isLate =
    (wordShift === "day" && startTimeValue > 800) || // 8:00 is time start work
    (wordShift === "night" && (startTimeValue > 2000 || startTimeValue < 500));
  const isQuitSoon =
    (wordShift === "day" && endTimeValue < 1650) || //17:00 is end of day shift
    (wordShift === "night" && endTimeValue < 450); // 5:00 is end of night shift
  const isOT =
    (wordShift === "day" && endTimeValue > 1750) || //+50 minute for overtime
    (wordShift === "night" && endTimeValue > 550);

  const dateArr = item.DATE.split("-");
  const dateVal =
    Number(dateArr?.[0] || 0 * 500) +
    Number(dateArr?.[1] || 0 * 40) +
    Number(dateArr[2]);
  const currentDateArr = new Date().toISOString().slice(0, 10).split("-");
  const currentDateVal =
    Number(currentDateArr[0]) * 500 +
    Number(currentDateArr[1]) * 40 +
    Number(currentDateArr[2]);

  if (currentDateVal < dateVal) {
    return null;
  }
  return (
    <tr className={`${item.END_TIME ? "" : "shadow shadow-gray-100"}`}>
      <td>
        <div className="flex items-center justify-center">
          <div
            className={`flex items-center gap-0.5 ${item.HOLI_TYPE === "H" ? "text-red-300" : "text-gray-600"} h-6 w-12 justify-center`}
          >
            <p className="text-gray-600">{item.DATE.slice(5, 7)}</p>
            <p>{"/"} </p>
            <p>{item.DATE.slice(8, 10)} </p>
          </div>
        </div>
      </td>
      <td className="py-2">
        <div className="flex items-center justify-center">
          <div
            className={`text-gray-400 ${item.WEEK_DAY !== "SUN" ? "shadow-sm shadow-blue-200" : "shadow-sm shadow-red-200"} flex h-6 w-12 items-center justify-center rounded-[50%] text-xs font-bold ${item.HOLI_TYPE === "H" ? "text-gray-600" : "text-gray-600"}`}
          >
            {t("date." + item.WEEK_DAY)}
          </div>
        </div>
      </td>

      <td>
        <p className={`${isLate ? "font-medium" : "text-sm text-gray-500"}`}>
          {item.STRT_TIME}
        </p>
      </td>
      <td
        className={`pr-4 text-end font-medium ${isOT ? "" : isQuitSoon ? "" : "text-sm text-gray-500"}`}
      >
        {item.END_TIME}
      </td>
    </tr>
  );
};

export interface IBangCongProps {
  list?: Attendance[];
}

export default function BangCong({ list }: IBangCongProps) {
  const { t } = useTranslation();

  if (list?.length === 0) return <Empty description={t("common.noData")} />;
  return (
    <div className="rounded-lg bg-white text-center">
      <table className="w-full text-center">
        <tbody className="w-full">
          <tr
            className="rounded-t-xl text-sm text-gray-700"
            style={{ borderBottom: "1px solid red" }}
          >
            <th className="px-2 py-1.5 font-bold">{t("attendantPage.date")}</th>
            <th className="px-2 py-1.5 font-bold">
              {t("attendantPage.weekday")}
            </th>
            <th className="px-2 py-1.5 font-bold">
              {t("attendantPage.start")}
            </th>
            <th className="px-2 py-1.5 font-bold">
              {t("attendantPage.finish")}
            </th>
          </tr>
          {list &&
            list.map((item, index) => {
              return <AttendanceItem key={index} item={item} />;
            })}
        </tbody>
      </table>
    </div>
  );
}
