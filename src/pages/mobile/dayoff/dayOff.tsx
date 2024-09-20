import * as React from "react";
import { MobileAppWrapper } from "../../../components/mobile/appWrapper";
import MobileDayOffHeader from "./components/header";
import MobileDayOffContent from "./components/content";
import { Empty, Skeleton, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useUserInfoStore } from "../../../store/userinfo";
import { HeaderNew } from "../calendar-new/ui/header";
import { useQuery } from "@tanstack/react-query";
import { getDayOff } from "./util";

export interface IMobileDayOffPageProps {}

export default function MobileDayOffPage(props: IMobileDayOffPageProps) {
  const { t } = useTranslation();
  const { user } = useUserInfoStore();

  const dayOffQuery = useQuery({
    queryFn: () => {
      if (user.EMP_NO) return getDayOff(user.EMP_NO);
      else return { error: "no emp_no found" };
    },
    queryKey: ["monthwage", user.EMP_NO || "EMP_NO"],
    // placeholderData: keepPreviousData,
  });

  const dayOffCount = React.useMemo(() => {
    return dayOffQuery.data?.dayCount;
  }, [dayOffQuery.data?.dayCount]);
  const dayOffHistory = React.useMemo(() => {
    return dayOffQuery.data?.history;
  }, [dayOffQuery.data?.history]);

  React.useEffect(() => {
    console.log("dayOffHistory", dayOffHistory);
  }, [dayOffQuery.data]);

  return (
    <div
      className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden bg-slate-50"
      style={{ height: "calc(100dvh - 44px)" }}
    >
      <div className="header rounded-b-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 px-3 py-2 shadow-sm shadow-indigo-900">
        <HeaderNew title={t("common.monthReport")} />
      </div>
      <div className="content mt-3 flex flex-1 flex-col px-4">
        <div className="panel h-[150px] rounded-lg bg-white px-[5%] pb-[4%] pt-[2%] shadow-md shadow-blue-900">
          <div className="main-panel flex h-2/3 items-center justify-center gap-6">
            <div
              className="h-full w-2/5"
              style={{
                background: `url('${user.avatar}') center center / contain no-repeat`,
              }}
            />

            <div className="flex-1">
              <p className="calendar line-clamp-1 text-xs font-light text-gray-400">
                {`${user.chucvi} - ${user.DEPT_NM}`}
              </p>
              <p className="calendar line-clamp-1 text-lg font-medium text-gray-600">
                {user.NAME}
              </p>
              <p className="calendar font-mono text-sm text-gray-600">
                {user.EMP_NO}
              </p>
              <p className="calendar text-xs font-medium text-gray-400">
                {user.EMAIL_ADDR}
              </p>
            </div>
          </div>
          <div className="panel-content mt-1.5 flex items-center justify-between text-indigo-300">
            <div className="item">
              <p className="pb-1 font-mono text-xs">{t("dayOff.lastYear")}</p>
              <p className="text-center text-gray-700">
                {dayOffQuery.isLoading ? (
                  <Skeleton.Button active />
                ) : (
                  Number(dayOffCount.pre_year)
                )}
              </p>
            </div>
            <div className="item">
              <p className="pb-1 font-mono text-xs">{t("dayOff.thisYear")}</p>
              <p className="text-center text-gray-700">
                {dayOffQuery.isLoading ? (
                  <Skeleton.Button active />
                ) : (
                  Number(dayOffCount.this_year)
                )}
              </p>
            </div>
            <div className="item">
              <p className="pb-1 font-mono text-xs">X-RAY</p>
              <p className="text-center text-gray-700">
                {dayOffQuery.isLoading ? (
                  <Skeleton.Button active />
                ) : (
                  Number(dayOffCount.this_xray)
                )}
              </p>
            </div>
            <div className="item">
              <p className="pb-1 font-mono text-xs">{t("dayOff.used")}</p>
              <p className="text-center text-gray-700">
                {dayOffQuery.isLoading ? (
                  <Skeleton.Button active />
                ) : (
                  Number(dayOffCount.use_cnt)
                )}
              </p>
            </div>
            <div className="item">
              <p className="pb-1 font-mono text-xs">{t("common.offDayLeft")}</p>
              <p className="text-center text-gray-700">
                {dayOffQuery.isLoading ? (
                  <Skeleton.Button active />
                ) : (
                  Number(dayOffCount.remain)
                )}
              </p>
            </div>
          </div>
        </div>

        <div className="h-1"></div>
      </div>
      <div className="px-4">
        <div className="content-options mt-4 flex justify-between py-2">
          <div className="option text-2xl font-medium text-indigo-800">
            {t("common.detail")}
          </div>
          {/* <div className="option text-red-500">View all</div> */}
        </div>
        <div className="flex-1">
          {dayOffQuery.isLoading ? (
            <Skeleton active />
          ) : dayOffHistory?.length ? (
            <table
              className="w-full border-collapse bg-white text-center shadow-md shadow-gray-600 dark:bg-gray-200"
              style={{ border: "1px solid gray" }}
            >
              <tbody className="[&_td]:border [&_td]:border-solid [&_td]:border-gray-200 [&_td]:py-1.5 [&_td]:text-xs">
                <tr className="sticky -top-0.5 !bg-primary-3 !text-sm !font-light text-white">
                  <th></th>
                  <th>{t("dayOff.dayOff")}</th>
                  <th>{t("dayOff.type")}</th>
                  <th className="py-1.5">{t("dayOff.reason")}</th>
                </tr>

                {dayOffHistory.map((item, index) => {
                  return (
                    <tr className="!font-semibold text-primary">
                      <td className="px-1 text-gray-700">
                        <div className="w-full text-center">{index + 1}</div>
                      </td>
                      <td className="text-gray-700">
                        {item.dilig_dt.slice(0, 10)}
                      </td>
                      <td className="text-primary-4">{item.n_dilig_cd}</td>
                      <td className="line-clamp-1 text-gray-700">
                        <Tooltip title={item.remark || ""}></Tooltip>
                        {item.remark}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <>
              <table
                className="w-full border-collapse bg-white text-center shadow-md shadow-gray-600 dark:bg-gray-200"
                style={{ border: "1px solid gray" }}
              >
                <tbody className="[&_td]:border [&_td]:border-solid [&_td]:border-gray-200 [&_td]:py-1.5 [&_td]:text-xs">
                  <tr className="!bg-primary-3 !text-sm !font-light text-white">
                    <th>Ngày nghỉ</th>
                    <th>Loại</th>
                    <th>Lý do</th>
                  </tr>
                </tbody>
              </table>
              <div className="mt-5">
                <Empty />
              </div>
            </>
          )}

          <div className="content-sub flex"></div>
          <div className="button"></div>
        </div>
      </div>
    </div>
  );
}
