import { t } from "i18next";
import * as React from "react";
import { Attendance } from "../ui/interface";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";

export interface IBangCongProps {
  list: Attendance[];
}

export default function BangCong({ list }: IBangCongProps) {
  const { t } = useTranslation();

  if (list?.length === 0) return <Empty description={t("common.noData")} />;
  return (
    <div className="mx-2 mt-2 rounded-lg bg-white text-center">
      <table className="w-full text-center">
        <tbody className="w-full">
          <tr
            className="rounded-t-xl text-blue-800"
            style={{ borderBottom: "1px solid red" }}
          >
            <th className="px-2 py-1.5 font-medium text-gray-800">
              {t("attendantPage.weekday")}
            </th>
            <th className="px-2 py-1.5 font-medium text-gray-800">
              {t("attendantPage.date")}
            </th>
            <th className="px-2 py-1.5 font-medium text-gray-800">
              {t("attendantPage.start")}
            </th>
            <th className="px-2 py-1.5 font-medium text-gray-800">
              {t("attendantPage.finish")}
            </th>
            {/* <th></th> */}
          </tr>
          {list &&
            list.map((item, index) => {
              const wordShift =
                Number(item.STRT_TIME.slice(0, 2)) <= 17 ? "day" : "night";
              const endTimeValue =
                Number(item.END_TIME.slice(0, 2)) * 100 +
                Number(item.END_TIME.slice(3, 5));
              const startTimeValue =
                Number(item.STRT_TIME.slice(0, 2)) * 100 +
                Number(item.STRT_TIME.slice(3, 5));

              const isLate =
                (wordShift === "day" && startTimeValue > 800) || // 8:00 is time start work
                (wordShift === "night" &&
                  (startTimeValue > 2000 || startTimeValue < 500));
              const isQuitSoon =
                (wordShift === "day" && endTimeValue < 1700) || //17:00 is end of day shift
                (wordShift === "night" && endTimeValue < 500); // 5:00 is end of night shift
              const isOT =
                (wordShift === "day" && endTimeValue > 1750) || //+50 minute for overtime
                (wordShift === "night" && endTimeValue > 550);

              const dateArr = item.DATE.split("-");
              const dateVal =
                Number(dateArr[0] * 500) +
                Number(dateArr[1] * 40) +
                Number(dateArr[2]);
              const currentDateArr = new Date()
                .toISOString()
                .slice(0, 10)
                .split("-");
              const currentDateVal =
                Number(currentDateArr[0]) * 500 +
                Number(currentDateArr[1]) * 40 +
                Number(currentDateArr[2]);

              if (currentDateVal <= dateVal) {
                return null;
              }
              return (
                <tr
                  key={index}
                  className={`${item.END_TIME ? "" : "bg-gray-100"}`}
                >
                  <td
                    style={{ borderBottom: "1px solid #eee" }}
                    className="py-2"
                  >
                    <div className="flex items-center justify-center">
                      <div
                        className={`flex h-6 w-12 items-center justify-center rounded-[50%] bg-blue-500 text-xs font-medium ${item.HOLI_TYPE === "H" ? "text-white" : "text-white"}`}
                      >
                        {t("date." + item.WEEK_DAY)}
                      </div>
                    </div>
                  </td>
                  <td style={{ borderBottom: "1px solid #eee" }}>
                    <div className="flex items-center justify-center">
                      <div
                        className={`${item.HOLI_TYPE === "H" ? "text-red-500" : ""} h-6 w-8 text-center`}
                      >
                        {item.DATE.slice(8, 10)}
                      </div>
                    </div>
                  </td>
                  <td style={{ borderBottom: "1px solid #eee" }}>
                    <p
                      className={`${isLate ? "font-medium" : "text-sm opacity-60"}`}
                    >
                      {item.STRT_TIME}
                    </p>
                  </td>
                  <td
                    style={{ borderBottom: "1px solid #eee" }}
                    className={`${isOT ? "" : isQuitSoon ? "" : "text-sm"}`}
                  >
                    {item.END_TIME}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
