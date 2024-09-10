import * as React from "react";
import { MobileAppWrapper } from "../../../components/mobile/appWrapper";
import MobileDayOffHeader from "./components/header";
import MobileDayOffContent from "./components/content";
import { Empty, Skeleton, Tooltip } from "antd";
import { useTranslation } from "react-i18next";
import { useUserInfoStore } from "../../../store/userinfo";
import { HeaderNew } from "../calendar-new/components/header";
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
      // style={{
      //   background:
      //     "url(https://th.bing.com/th/id/R.3c489fc3d57210d12875d2a31656771a?rik=5PqU%2bhbZl7gzIQ&riu=http%3a%2f%2fwallpapercave.com%2fwp%2fVbCgf6N.jpg&ehk=%2baaoHfTrbbttD9Wd6ERbUuFre%2fPNv62EdEqfvKIScXw%3d&risl=&pid=ImgRaw&r=0) center center /cover no-repeat",
      // }}
      // style={{
      //   background:
      //     "url(https://th.bing.com/th/id/OIP.vSx9a0BaAFmBMbNZEDFaJAHaEK?rs=1&pid=ImgDetMain) center center /cover no-repeat",
      // }}
      // style={{
      //   background:
      //     "url(https://bobthecamper.com/sitebuilder/images/navbarTWObackgroundALT4-254x644.png) center center /cover no-repeat",
      // }}
    >
      <div
        className="header h-[165px] rounded-b-[40px] bg-gradient-to-b from-indigo-900 to-indigo-700 px-3 py-2 shadow-md shadow-indigo-700"
        style={{
          background: "#5366f1 ",
          boxShadow:
            "inset 10px 10px 10px #2862ff, inset -12px -12px 10px #2862ff , 0px 6px 9px #606dca",
        }}
        // style={{
        //   background: `url(https://th.bing.com/th/id/OIP.onJtjFhdkQc9xvZ6EF1zQQHaEo?rs=1&pid=ImgDetMain) center center /cover no-repeat`,
        // }}
      >
        <HeaderNew title={t("common.monthReport")} />
      </div>
      <div className="content -mt-24 flex h-60 flex-1 flex-col px-4">
        <div className="panel h-[180px] rounded-3xl bg-white px-[18px] py-[12px] shadow shadow-indigo-900">
          <div className="main-panel flex h-2/3 items-center justify-center gap-6">
            <div
              className="h-full w-2/5"
              style={{
                background:
                  "url('https://th.bing.com/th/id/OIP.dvNIc5ta8in8ifoRHO9BJAHaEo?rs=1&pid=ImgDetMain') center center / contain no-repeat",
              }}
            />

            <div className="flex-1">
              <p className="calendar line-clamp-1 text-xs font-light text-gray-400">
                {`${user.MINOR_NM} - ${user.DEPT_NM}`}
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
          <div className="panel-content flex items-center justify-between text-indigo-300">
            <div className="item">
              <p className="pb-1 font-mono text-xs">Năm trước</p>
              <p className="text-center text-lg text-gray-700">
                {dayOffQuery.isLoading ? (
                  <Skeleton.Button active />
                ) : (
                  Number(dayOffCount.pre_year)
                )}
              </p>
            </div>
            <div className="item">
              <p className="pb-1 font-mono text-xs">Năm nay</p>
              <p className="text-center text-lg text-gray-700">
                {dayOffQuery.isLoading ? (
                  <Skeleton.Button active />
                ) : (
                  Number(dayOffCount.this_year)
                )}
              </p>
            </div>
            <div className="item">
              <p className="pb-1 font-mono text-xs">X-RAY</p>
              <p className="text-center text-lg text-gray-700">
                {dayOffQuery.isLoading ? (
                  <Skeleton.Button active />
                ) : (
                  Number(dayOffCount.this_xray)
                )}
              </p>
            </div>
            <div className="item">
              <p className="pb-1 font-mono text-xs">Đã dùng</p>
              <p className="text-center text-lg text-gray-700">
                {dayOffQuery.isLoading ? (
                  <Skeleton.Button active />
                ) : (
                  Number(dayOffCount.use_cnt)
                )}
              </p>
            </div>
            <div className="item">
              <p className="pb-1 font-mono text-xs">{t("common.offDayLeft")}</p>
              <p className="text-center text-lg text-gray-700">
                {dayOffQuery.isLoading ? (
                  <Skeleton.Button active />
                ) : (
                  Number(dayOffCount.remain)
                )}
              </p>
            </div>
          </div>
          {/* <div className="pt-2">
                <div className="panel-content flex items-center justify-between text-indigo-300">
                  <div className="item">
                    <p className="pb-1 font-mono text-xs">Ngày làm</p>
                    <p className="text-center text-lg text-gray-700">
                      {monthWorktime.tot_day ? (
                        Number(monthWorktime.tot_day)
                      ) : (
                        <Skeleton.Button size="small" active />
                      )}
                    </p>
                  </div>
                  <div className="item">
                    <p className="pb-1 font-mono text-xs">Số giờ</p>
                    <p className="text-center text-lg text-gray-700">
                      {monthWorktime.tot_day ? (
                        Number(monthWorktime.tot_day)
                      ) : (
                        <Skeleton.Button size="small" active />
                      )}
                    </p>
                  </div>
                  <div className="item">
                    <p className="pb-1 font-mono text-xs">Tăng ca</p>
                    <p className="text-center text-lg text-gray-700">
                      {monthWorktime.tot_day ? (
                        Number(monthWorktime.tot_day) + "H"
                      ) : (
                        <Skeleton.Button size="small" active />
                      )}
                    </p>
                  </div>
                  <div className="item">
                    <p className="pb-1 font-mono text-xs">Bậc lương</p>
                    <p className="text-center text-lg text-gray-700">
                      {" "}
                      {`${user.PAY_GRD1} ${user.PAY_GRD2}`}
                    </p>
                  </div>
                </div>
              </div> */}
        </div>
        <div className="content-options mt-4 flex justify-between py-2">
          <div className="option text-2xl font-medium text-indigo-800">
            {t("common.detail")}
          </div>
          {/* <div className="option text-red-500">View all</div> */}
        </div>
        <div className="flex-1 overflow-auto">
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
                  <th>Ngày nghỉ</th>
                  <th>Loại</th>
                  <th className="py-1.5">Lý do</th>
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

        <div className="h-1"></div>
      </div>
    </div>
  );
}
