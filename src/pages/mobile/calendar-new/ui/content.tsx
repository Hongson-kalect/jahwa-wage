import { Empty } from "antd";
import * as React from "react";
import { WorkType } from "../interface";
import { Dayjs } from "dayjs";
import { getSelectedDateDetail } from "../utils";
import { useTranslation } from "react-i18next";
import { FaArrowAltCircleUp } from "react-icons/fa";
import { BiRun, BiSolidBowlRice } from "react-icons/bi";
import { PiClockCountdownFill } from "react-icons/pi";

export interface ICalendarContentProps {
  calendarValue: Date;
  workData: { date: string; time?: string; data: WorkType[]; shift: string }[];
  viewAll: boolean;
}

export default function CalendarContent({
  calendarValue,
  workData,
  viewAll,
}: ICalendarContentProps) {
  const { t } = useTranslation();
  const selectedDate = React.useMemo(() => {
    return workData.find((item) => {
      return (
        new Date(item.date).toISOString().slice(0, 10) ===
        calendarValue.toISOString().slice(0, 10)
      );
    });
  }, [calendarValue, workData]);

  const dateDetail = React.useMemo(() => {
    return selectedDate
      ? getSelectedDateDetail(selectedDate)
      : {
          ot: 0,
          eb: 0,
          of: "",
          half: 0,
          comeLate: 0,
          leaveSoon: 0,
        };
  }, [selectedDate]);

  return (
    <div>
      <div className="detail-content flex-1">
        {viewAll ? (
          workData.length ? (
            <table
              className="w-full border-collapse bg-white text-center shadow-md shadow-gray-600 dark:bg-gray-200"
              style={{ border: "1px solid gray" }}
            >
              <tbody className="[&_td]:border [&_td]:border-solid [&_td]:border-gray-200 [&_td]:py-1.5 [&_td]:text-sm">
                <tr className="sticky -top-0.5 !bg-primary-3 !text-sm !font-light text-white">
                  <th className="py-1">Ngày</th>
                  <th>Ca</th>
                  <th>Giờ về</th>
                  <th>Tăng ca</th>
                  <th>Trợ ăn</th>
                </tr>

                {workData.map((item, index) => {
                  const ot = item.data.find((item) =>
                    [33, 31, 47, 40, 38].includes(Number(item.dilig_cd)),
                  );
                  const eb = item.data.find((item) =>
                    [55, 56, 57, 58, 59, 60].includes(Number(item.dilig_cd)),
                  );
                  const off = item.data.find((item) =>
                    [1, 9].includes(Number(item.dilig_cd)),
                  );
                  const day = new Date(item.date).getDay();
                  if (off)
                    return (
                      <tr key={index} className="bg-red-300 text-sm">
                        <td
                          className={`drop-shadow-[0_1.2px_1.2px_rgba(179, 179, 179, 0.2)] py-0.5 ${day === 0 ? "text-base font-bold text-red-600" : day === 6 ? "text-base font-bold text-orange-600" : ""}`}
                        >
                          {item.date.slice(8, 10)}
                        </td>
                        <td>{Number(item.shift) === 2 ? "Đêm" : "Ngày"}</td>
                        <td colSpan={3}>{off.dilig_nm}</td>
                      </tr>
                    );
                  return (
                    <tr key={index} className="text-sm">
                      <td
                        className={`py-0.5 ${day === 0 ? "text-base font-bold text-red-500" : day === 6 ? "text-base font-bold text-orange-500" : ""}`}
                      >
                        {item.date.slice(8, 10)}
                      </td>
                      <td
                        className={`${Number(item.shift) === 2 ? "font-semibold italic" : "font-light"}`}
                      >
                        {Number(item.shift) === 2 ? "Đêm" : "Ngày"}
                      </td>
                      <td>{item.time}</td>
                      <td>
                        {ot
                          ? `${Number(ot.dilig_hh) ? Number(ot.dilig_hh) + "h " : ""}${Number(ot.dilig_mm) ? Number(ot.dilig_mm) + "p" : ""}`
                          : "-"}
                      </td>
                      <td>
                        {eb
                          ? `${Number(eb.dilig_hh) ? Number(eb.dilig_hh) + "h " : ""}${Number(eb.dilig_mm) ? Number(eb.dilig_mm) + "p" : ""}`
                          : "-"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <Empty />
          )
        ) : selectedDate ? (
          <>
            <div className="content-main grid grid-cols-[60%_40%] gap-2 py-2 pr-2">
              <div
                className={`item rounded-xl bg-white px-4 py-3 shadow ${dateDetail.of ? "text-rose-600 shadow-pink-300" : "text-blue-700 shadow-indigo-300"}`}
              >
                <p className="text-sm">
                  {dateDetail.of ? t("work.off") : t("work.timeOut")}
                </p>
                <p
                  className={`p-2 pb-0 text-center ${dateDetail.of ? "text-lg" : "text-3xl"} font-medium`}
                >
                  {dateDetail.of || selectedDate?.time || "No data"}
                </p>
              </div>
              {/* <div className="item rounded-3xl bg-orange-600 px-4 py-3 text-gray-600 shadow shadow-gray-300">
            <p className="text-sm text-white">Nghỉ</p>
            <p className="line-clamp-1 py-2 pb-0 text-center text-3xl font-medium text-white">
              Phép năm
            </p>
          </div> */}
              <div
                style={{
                  animation:
                    "1s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running rightFloatIn",
                }}
                className={`item duration-400 rounded-xl px-4 py-3 shadow ${Number(selectedDate?.shift) === 2 ? "bg-blue-600 text-white shadow-blue-200" : "bg-white text-blue-700 shadow-indigo-400"}`}
              >
                <p className="text-sm">{t("work.shift")}</p>
                <p className={`p-2 pb-0 text-center text-3xl font-bold`}>
                  {Number(selectedDate?.shift) === 2
                    ? t("common.Night")
                    : t("common.Day")}
                </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {/* <div className="content-sub flex gap-2 rounded-xl bg-white px-2 py-1 shadow shadow-indigo-200">
            <div className="type flex w-16 items-center justify-center rounded-2xl bg-indigo-700 py-4 text-white shadow shadow-indigo-400">
              OT
            </div>
            <div className="content flex flex-1 py-1">
              <div className="w-1/3">
                <div className="title text-xs font-bold text-indigo-300">
                  Tăng ca
                </div>
                <div className="flex items-end gap-1 pt-1 font-medium text-indigo-800">
                  <FaRegHandPointUp className="text-gray-400" size={18} />
                  <p className="-mb-1">2h 30p</p>
                </div>
              </div>
              <div className="w-1/3">
                <div className="title text-xs font-bold text-indigo-300">
                  Ht ăn
                </div>
                <div className="flex items-end gap-1 pt-1.5 font-medium text-indigo-800">
                  <PiBowlFood className="-mb-0.5 text-gray-400" size={18} />
                  <p className="-mb-1">30 phút</p>
                </div>
              </div>
            </div>
          </div>
          <div className="content-sub flex gap-2 rounded-xl bg-white px-2 py-1 shadow shadow-[#fe4f6e22]">
            <div className="type flex w-16 items-center justify-center rounded-2xl bg-rose-400 py-4 text-white shadow shadow-pink-400">
              PEN
            </div>
            <div className="content flex flex-1 py-1">
              <div className="w-1/3">
                <div className="title text-xs font-bold text-[#fe4f6e88]">
                  Đi muộn
                </div>
                <div className="flex items-end gap-1 pt-1.5 font-medium text-rose-400">
                  <LuAlarmClockOff
                    className="-mb-0.5 text-gray-400"
                    size={18}
                  />
                  <p className="-mb-1">32 phút</p>
                </div>
              </div>
              <div className="w-1/3">
                <div className="title text-xs font-bold text-[#fe4f6e88]">
                  Về sớm
                </div>
                <div className="flex items-end gap-1 pt-1.5 font-medium text-rose-400">
                  <LiaRunningSolid
                    className="-mb-0.5 text-gray-400"
                    size={18}
                  />
                  <p className="-mb-1">30 phút</p>
                </div>
              </div>
            </div>
          </div> */}
              {/* <div className="divider mt-2"></div> */}
              {dateDetail.ot + dateDetail.eb > 0 ? (
                <>
                  <p className="-mb-2 mt-2 text-sm italic text-blue-500">
                    {t("work.bonus")}
                  </p>
                  <div
                    className="content-sub grid grid-cols-3 gap-3 rounded-xl px-2"
                    style={{
                      animation:
                        "0.5s cubic-bezier(0.22, 0.61, 0.36, 1) 0s 1 normal none running leftFloatIn",
                    }}
                  >
                    {dateDetail.ot ? (
                      <div className="card-1 flex -skew-x-3 flex-col justify-between rounded-lg bg-white p-2 shadow shadow-indigo-600">
                        <div className="flex items-center justify-between px-1 text-blue-400">
                          <FaArrowAltCircleUp className="" size={20} />
                          <p className="title line-clamp-1 text-center text-xs">
                            {t("work.overtime")}
                          </p>
                        </div>
                        <div className="value mt-1 text-center text-lg font-medium text-blue-800">
                          {Math.floor(dateDetail.ot / 60)
                            ? Math.floor(dateDetail.ot / 60) + "H"
                            : ""}{" "}
                          {Math.floor(dateDetail.ot % 60)
                            ? Math.floor(dateDetail.ot % 60) + "M"
                            : ""}
                        </div>
                      </div>
                    ) : null}
                    {dateDetail.eb ? (
                      <div className="card-1 flex -skew-x-3 flex-col justify-between rounded-lg bg-white p-2 shadow shadow-indigo-600">
                        <div className="flex items-center justify-between px-1 text-blue-400">
                          <BiSolidBowlRice className="" size={20} />
                          <p className="title line-clamp-1 text-center text-xs">
                            {t("work.eatBonus")}
                          </p>
                        </div>
                        <div className="value mt-1 text-center text-lg font-medium text-blue-800">
                          {Math.floor(dateDetail.eb / 60)
                            ? Math.floor(dateDetail.eb / 60) + "H"
                            : ""}{" "}
                          {Math.floor(dateDetail.eb % 60)
                            ? Math.floor(dateDetail.eb % 60) + "M"
                            : ""}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
              {dateDetail.leaveSoon + dateDetail.comeLate > 0 ? (
                <>
                  <p className="-mb-2 mt-2 text-sm italic text-blue-500">
                    Khấu trừ
                  </p>
                  <div className="content-sub grid grid-cols-3 gap-3 rounded-xl px-2">
                    {dateDetail.comeLate ? (
                      <div className="card-1 flex -skew-x-3 flex-col justify-between rounded-lg p-2 shadow shadow-indigo-600">
                        <div className="flex items-center justify-between px-1 text-blue-400">
                          <PiClockCountdownFill className="" size={20} />
                          <p className="title text-center text-xs">Đi muộn</p>
                        </div>
                        <div className="value mt-1 text-center text-lg font-medium text-blue-800">
                          {Math.floor(dateDetail.comeLate / 60)
                            ? Math.floor(dateDetail.comeLate / 60) + "H"
                            : ""}{" "}
                          {Math.floor(dateDetail.comeLate % 60)
                            ? Math.floor(dateDetail.comeLate % 60) + "M"
                            : ""}
                        </div>
                      </div>
                    ) : null}
                    {dateDetail.leaveSoon ? (
                      <div className="card-1 flex -skew-x-3 flex-col justify-between rounded-lg p-2 shadow shadow-indigo-600">
                        <div className="flex items-center justify-between px-1 text-blue-400">
                          <BiRun className="" size={20} />
                          <p className="title text-center text-xs">Về sớm</p>
                        </div>
                        <div className="value mt-1 text-center text-lg font-medium text-blue-800">
                          {Math.floor(dateDetail.leaveSoon / 60)
                            ? Math.floor(dateDetail.leaveSoon / 60) + "H"
                            : ""}{" "}
                          {Math.floor(dateDetail.leaveSoon % 60)
                            ? Math.floor(dateDetail.leaveSoon % 60) + "M"
                            : ""}
                        </div>
                      </div>
                    ) : null}
                  </div>
                </>
              ) : null}
            </div>
          </>
        ) : (
          <Empty />
        )}
      </div>

      <div className="content-sub flex"></div>
      <div className="button"></div>
      <div className="h-1"></div>
    </div>
  );
}
