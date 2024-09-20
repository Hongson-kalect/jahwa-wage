import { useQuery } from "@tanstack/react-query";
import { DatePicker, Empty, Skeleton } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { HiOutlineSwitchVertical } from "react-icons/hi";
import styled from "styled-components";
import { useUserInfoStore } from "../../../store/userinfo";
import { HeaderNew } from "../calendar-new/ui/header";
import { numberToCurrency } from "../wage/utils";
import { getWageData, getYearWage } from "./utils";

export default function MobileWageNew() {
  const { t } = useTranslation();

  const [isMonthWage, setIsMonthWage] = React.useState<unknown>(true);
  const [date, setDate] = React.useState(
    dayjs(new Date().toISOString().slice(0, 10), "YYYY-MM-DD"),
  );
  const { user } = useUserInfoStore();

  const monthWage = useQuery({
    queryFn: () => {
      return getWageData(date.format("YYYY-MM-DD"), user?.EMP_NO);
    },
    queryKey: ["monthwage", date, user.EMP_NO || "EMP_NO"],
    // placeholderData: keepPreviousData,
  });

  const [monthTotalPay, monthIncome, monthDeduct, monthWorktime] =
    React.useMemo(() => {
      return [
        monthWage.data?.total || {},
        monthWage.data?.income || {},
        monthWage.data?.dedux || {},
        monthWage.data?.workTime?.[0] || {},
      ];
    }, [monthWage?.data]);

  const yearWage = useQuery({
    queryFn: () => {
      if (user.EMP_NO)
        return getYearWage(user.EMP_NO, date.format("YYYY-MM-DD"));
      else return { error: "no emp_no found" };
    },
    queryKey: ["total-wage", date, user.EMP_NO || "EMP_NO"],
    // placeholderData: keepPreviousData,
  });

  console.log("yearWage :>> ", yearWage);

  const yearWageTotal = React.useMemo(() => yearWage.data, [yearWage]);

  React.useEffect(() => {
    const date = monthWage.data?.total?.pay_yymm;
    console.log("object", date);
    // if (date) setDate(dayjs(`${date.slice(4, 6)}-01-${date.slice(0, 4)}`));

    if (date) {
      console.log(
        "object",
        `${date.slice(0, 4)}-${date.slice(4, 6)}-01`,
        "YYYY-MM-DD",
      );
      setDate(
        dayjs(`${date.slice(0, 4)}-${date.slice(4, 6)}-01`, "YYYY-MM-DD"),
      );
    }
  }, [monthWage.data?.total?.pay_yymm]);

  console.log("user", user);

  if (!isMonthWage)
    return (
      <div
        className="w-full overflow-auto bg-slate-50"
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
          className="header rounded-b-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 px-3 py-2 shadow-sm shadow-indigo-700"

          // style={{
          //   background: `url(https://th.bing.com/th/id/OIP.onJtjFhdkQc9xvZ6EF1zQQHaEo?rs=1&pid=ImgDetMain) center center /cover no-repeat`,
          // }}
        >
          <HeaderNew
            title={
              <>
                <div className="page-name flex flex-1 items-center justify-center gap-2 pr-4 text-center text-sm text-gray-50">
                  <div className="ml-12 flex-1">Bảng lương năm</div>
                  <div className="flex items-center justify-center rounded-full bg-white px-1 py-0.5">
                    <HiOutlineSwitchVertical
                      size={16}
                      color="#f34b4b"
                      onClick={() => setIsMonthWage(!isMonthWage)}
                    />
                  </div>
                </div>
              </>
            }
          />
        </div>
        <div className="content relative mt-8 h-60 flex-1 px-4">
          <div className="absolute -top-5 left-0 right-0 flex w-full items-center justify-end pr-5">
            <DatePicker
              picker="year"
              value={date}
              onCalendarChange={(val) => setDate(val)}
              allowClear={false}
              inputReadOnly
              style={{
                boxShadow: "#5244d9 -1px -1px 1px, #081150 1px -1px 1px",
              }}
              className="w-28 rounded-none border-none py-0 font-bold text-indigo-900 outline-none [&_*::placeholder]:text-gray-200 [&_*]:text-sm [&_*]:font-medium"
            />
            {/* <p className="text-xs text-white">
              Chi trả:{" "}
              {monthTotalPay?.prov_dt?.slice(0, 10) || (
                <Skeleton.Input size="small" active />
              )}
            </p> */}
          </div>
          <div
            className="panel h-[120px] rounded-lg bg-white px-[5%] pb-[4%] shadow-md shadow-blue-400"
            style={{ border: "1px solid #4917d3" }}
          >
            <div className="main-panel flex h-full items-center justify-center gap-6">
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

          <div className="content-main mt-2 grid grid-cols-[52%_45%] gap-4 py-2">
            <div className="item rounded-3xl bg-blue-500 px-4 pt-3 text-white shadow shadow-blue-300">
              <p className="text-xs">Chi trả</p>
              <div className="py-2 text-center text-xl font-medium">
                {yearWageTotal?.[0]?.tongluongchitra ? (
                  numberToCurrency(Number(yearWageTotal?.[0].tongluongchitra))
                ) : (
                  <Skeleton.Input size="small" active />
                )}
              </div>
            </div>
            <div className="item rounded-3xl bg-rose-400 px-4 pt-3 text-white shadow-md shadow-[#fe4f6f88]">
              <p className="text-xs">Khấu trừ</p>
              <div className="py-2 text-center text-xl font-medium">
                {yearWageTotal?.[0]?.tongluongkhautru ? (
                  numberToCurrency(Number(yearWageTotal?.[0].tongluongkhautru))
                ) : (
                  <Skeleton.Input size="small" active />
                )}
              </div>
            </div>

            {/* <div className="item rounded-3xl bg-rose-400 px-4 pt-3 text-white shadow-md shadow-[#fe4f6f88]">
        <p className="text-xs">CN</p>
        <p className="py-2 text-center text-xl font-bold">3</p>
      </div> */}
          </div>
          <div className="content-main gap-4 py-2">
            <div className="item rounded-3xl bg-indigo-700 px-4 pt-3 text-white shadow shadow-indigo-400">
              <p className="text-sm">Chi trả thực tế</p>
              <div className="py-2 text-center text-2xl font-bold">
                {yearWageTotal?.[0]?.tongluongthucnhan ? (
                  numberToCurrency(Number(yearWageTotal?.[0].tongluongthucnhan))
                ) : (
                  <Skeleton.Input size="small" active />
                )}
              </div>
            </div>
          </div>

          <div className="content-options mt-2 flex justify-between pt-2">
            <div className="option text-sm font-medium text-indigo-800">
              Chi tiết
            </div>
            {/* <div className="option text-red-500">View all</div> */}
          </div>

          <div className="ml-1 mt-2 flex flex-wrap bg-white py-1">
            {yearWage.isLoading ? (
              <>
                <Skeleton.Input active />
                <Skeleton.Input active />
                <Skeleton.Input active />
                <Skeleton.Input active />
                <Skeleton.Input active />
                <Skeleton.Input active />
              </>
            ) : yearWageTotal?.length ? (
              <div className="flex w-full flex-wrap">
                {yearWageTotal.length ? (
                  <table
                    className="w-full border-collapse bg-white text-center shadow-md shadow-gray-600 dark:bg-gray-200"
                    style={{ border: "1px solid gray" }}
                  >
                    <tbody className="[&_td]:border [&_td]:border-solid [&_td]:border-gray-200 [&_td]:py-1.5 [&_td]:text-xs">
                      <tr className="!bg-primary-3 !text-sm !font-light text-white">
                        <td className="py-1">Tháng</td>
                        <td>Chi trả</td>
                        <td>Khấu trừ</td>
                        <td>Thực lĩnh</td>
                      </tr>
                      {yearWageTotal.map((pay, index) => {
                        return (
                          <tr
                            key={index}
                            className="text-center text-sm font-medium"
                          >
                            <td className="py-0.5 text-xs font-normal">
                              {pay.pay_yymm}
                            </td>
                            <td className="text-gray-600">
                              <div className="line-clamp-1">
                                {numberToCurrency(Number(pay.pay_tot_amt))}
                              </div>
                            </td>
                            <td className="text-rose-400">
                              <div className="line-clamp-1">
                                {numberToCurrency(Number(pay.sub_tot_amt))}
                              </div>
                            </td>
                            <td className="text-indigo-600">
                              <div className="line-clamp-1">
                                {numberToCurrency(Number(pay.real_prov_amt))}
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="w-full text-center">
                    <Empty />
                  </div>
                )}
                {/* <div className="w-full px-2 py-1">
                  <div className="text-base font-bold text-blue-600">
                    <span className="font-bold">{t("wage.totalPay")}:</span>{" "}
                    <span>{numberToCurrency(monthTotalPay?.pay_tot_amt)}</span>
                  </div>
                </div> */}
              </div>
            ) : (
              <div className="w-full text-center">
                <Empty />
              </div>
            )}
          </div>
          <div className="content-sub flex"></div>
          <div className="button"></div>
        </div>
      </div>
    );

  return (
    <div
      className="w-full overflow-auto bg-slate-50"
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
        className="header rounded-b-xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 px-3 py-2 shadow-sm shadow-indigo-700"
        // style={{
        //   background: "#5366f1 ",
        //   boxShadow:
        //     "inset 10px 10px 10px #2862ff, inset -12px -12px 10px #2862ff , 0px 6px 9px #606dca",
        // }}
        // style={{
        //   background: `url(https://th.bing.com/th/id/OIP.onJtjFhdkQc9xvZ6EF1zQQHaEo?rs=1&pid=ImgDetMain) center center /cover no-repeat`,
        // }}
      >
        <HeaderNew
          title={
            <>
              <div className="page-name flex flex-1 items-center justify-center gap-2 pr-4 text-center text-sm text-gray-50">
                <div className="ml-12 flex-1">{t("newLang.monthWage")}</div>
                <div className="flex items-center justify-center rounded-full bg-white px-1 py-0.5">
                  <HiOutlineSwitchVertical
                    size={16}
                    color="#f34b4b"
                    onClick={() => setIsMonthWage(!isMonthWage)}
                  />
                </div>
              </div>
            </>
          }
        />
      </div>
      <div className="content relative mt-8 h-60 flex-1 px-4">
        <div className="absolute -top-5 left-0 right-0 m-0 flex w-full items-center justify-between px-5">
          <div className="text-xs italic text-indigo-900">
            {t("newLang.payAt")}:{" "}
            {monthTotalPay?.prov_dt?.slice(0, 10) || (
              <Skeleton.Input size="small" active />
            )}
          </div>
          <DatePicker
            cellRender={(val) => (
              <div>
                {t("common.month")} {dayjs(val).month() + 1}
              </div>
            )}
            style={{
              boxShadow: "#5244d9 -1px -1px 1px, #081150 1px -1px 1px",
            }}
            picker="month"
            value={date}
            onCalendarChange={(val) => setDate(val)}
            allowClear={false}
            inputReadOnly
            className="w-28 rounded-none border-none py-0 font-bold text-indigo-900 outline-none [&_*::placeholder]:text-gray-200 [&_*]:text-sm [&_*]:font-medium"
          />
        </div>
        <div
          className="panel h-[180px] rounded-lg bg-white px-[5%] pb-[4%] shadow-md shadow-blue-400"
          style={{ border: "1px solid #4917d3" }}
        >
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
          <div className="pt-2">
            <div className="panel-content flex items-center justify-between text-indigo-300">
              <div className="item">
                <p className="pb-1 font-mono text-xs">{t("common.dayCount")}</p>
                <div className="text-center text-lg text-gray-700">
                  {monthWorktime.tot_day ? (
                    Number(monthWorktime.tot_day)
                  ) : (
                    <Skeleton.Button size="small" active />
                  )}
                </div>
              </div>
              <div className="item">
                <p className="pb-1 font-mono text-xs">
                  {t("common.hourCount")}
                </p>
                <div className="text-center text-lg text-gray-700">
                  {monthWorktime.tot_day ? (
                    Number(monthWorktime.tot_day)
                  ) : (
                    <Skeleton.Button size="small" active />
                  )}
                </div>
              </div>
              <div className="item">
                <p className="pb-1 font-mono text-xs">
                  {t("common.overTimeCount")}
                </p>
                <div className="text-center text-lg text-gray-700">
                  {monthWorktime.tot_day ? (
                    Number(monthWorktime.tot_day) + "H"
                  ) : (
                    <Skeleton.Button size="small" active />
                  )}
                </div>
              </div>
              <div className="item">
                <p className="pb-1 font-mono text-xs">{t("work.salaryRank")}</p>
                <p className="text-center text-lg text-gray-700">
                  {" "}
                  {`${user.PAY_GRD1} ${user.PAY_GRD2}`}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-main mt-2 grid grid-cols-[52%_45%] gap-4 py-2">
          <div className="item rounded-3xl bg-blue-500 px-4 pt-3 text-white shadow shadow-blue-300">
            <p className="text-xs">{t("common.income")}</p>
            <div className="py-2 text-center text-xl font-medium">
              {monthTotalPay?.pay_tot_amt ? (
                numberToCurrency(Number(monthTotalPay.pay_tot_amt))
              ) : (
                <Skeleton.Input size="small" active />
              )}
            </div>
          </div>
          <div className="item rounded-3xl bg-rose-400 px-4 pt-3 text-white shadow-md shadow-[#fe4f6f88]">
            <p className="text-xs">{t("common.deduct")}</p>
            <div className="py-2 text-center text-xl font-medium">
              {monthTotalPay?.sub_tot_amt ? (
                numberToCurrency(Number(monthTotalPay.sub_tot_amt))
              ) : (
                <Skeleton.Input size="small" active />
              )}
            </div>
          </div>

          {/* <div className="item rounded-3xl bg-rose-400 px-4 pt-3 text-white shadow-md shadow-[#fe4f6f88]">
            <p className="text-xs">CN</p>
            <p className="py-2 text-center text-xl font-bold">3</p>
          </div> */}
        </div>
        <div className="content-main gap-4 py-2">
          <div className="item rounded-3xl bg-indigo-700 px-4 pt-3 text-white shadow shadow-indigo-400">
            <p className="text-sm">{t("common.realGet")}</p>
            <div className="py-2 text-center text-2xl font-bold">
              {monthTotalPay?.real_prov_amt ? (
                numberToCurrency(Number(monthTotalPay.real_prov_amt))
              ) : (
                <Skeleton.Input size="small" active />
              )}
            </div>
          </div>
        </div>

        <div className="content-options mt-2 flex justify-between pt-2">
          <div className="option text-sm font-medium text-indigo-800">
            {t("wage.payDetail")}
          </div>
          {/* <div className="option text-red-500">View all</div> */}
        </div>

        <div className="ml-1 mt-2 flex flex-wrap rounded-lg bg-white py-1 shadow-inner shadow-indigo-300">
          {monthWage.isLoading ? (
            <Skeleton active />
          ) : monthIncome?.length ? (
            <div className="flex w-full flex-wrap">
              {monthIncome.map((pay, index) => {
                return (
                  <div key={index} className="w-1/2 px-2 py-1">
                    <Statistic
                      type="primary"
                      title={
                        pay.allow_nm[0].toUpperCase() +
                        pay.allow_nm.slice(1).toLowerCase()
                      }
                      content={
                        <>
                          {numberToCurrency(pay.allow)}
                          <span className="text-xs italic text-green-600">
                            {" "}
                            {(Number(pay.dilig_hh) !== 0 ||
                              Number(pay.dilig_mm) !== 0) &&
                              `(${Number(pay.dilig_hh) ? Number(pay.dilig_hh) + "h" : ""}${
                                Number(pay.dilig_mm)
                                  ? " " + Number(pay.dilig_mm) + "m"
                                  : ""
                              })`}
                          </span>
                        </>
                      }
                    />
                  </div>
                );
              })}
              <div className="w-full px-2 py-1">
                <div className="text-base font-bold text-blue-600">
                  <span className="font-bold">{t("wage.totalPay")}:</span>{" "}
                  <span>{numberToCurrency(monthTotalPay?.pay_tot_amt)}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full text-center">
              <Empty />
            </div>
          )}
        </div>

        <div className="content-options mt-2 flex justify-between pt-2">
          <div className="option text-sm font-medium text-[#f84f4f]">
            {t("wage.deductDetail")}
          </div>
          {/* <div className="option text-red-500">View all</div> */}
        </div>

        <div className="ml-1 mt-2 flex flex-wrap rounded-lg bg-white py-1 shadow-inner shadow-[#ff8f8f]">
          {monthWage.isLoading ? (
            <Skeleton active />
          ) : monthDeduct?.length ? (
            <>
              {monthDeduct.map((sub, index: string) => {
                return (
                  <div key={index} className="w-1/2 px-2 py-1">
                    <Statistic
                      type="primary"
                      title={
                        sub.allow_nm[0].toUpperCase() +
                        sub.allow_nm.slice(1).toLowerCase()
                      }
                      content={<>{numberToCurrency(sub.sub_amt)}</>}
                    />
                  </div>
                );
              })}
              <div className="w-full px-2 py-1">
                <div className="text-base font-bold text-blue-600">
                  <span className="font-bold">{t("wage.totalDeduct")}:</span>{" "}
                  <span>
                    {numberToCurrency(Number(monthTotalPay?.sub_tot_amt))}
                  </span>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full text-center">
              <Empty />
            </div>
          )}
        </div>

        <div className="content-sub flex"></div>
        <div className="button"></div>
        <div className="h-1"></div>
      </div>
    </div>
  );
}

const StyledStatistic = styled.div`
  font-size: 0.625rem;
  .title {
    font-size: 1.4em;
  }
  .content {
    font-size: 1.4em;
  }
  span {
    font-size: 0.9em;
  }
`;

function Statistic(props: IStatisticProps) {
  return (
    <StyledStatistic className={props.className} style={props.style}>
      <div
        className={`title text-xs ${
          props.type === "primary"
            ? "from-black to-indigo-500"
            : props.type === "error"
              ? "from-indigo-800 to-red-800"
              : "from-black to-black"
        } bg-gradient-to-r bg-clip-text text-transparent`}
      >
        {props.title}
      </div>
      <div className="content mt-0.5 pl-3 text-sm font-bold text-gray-700">
        {props.content}
      </div>
    </StyledStatistic>
  );
}
