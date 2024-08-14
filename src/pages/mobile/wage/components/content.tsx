import * as React from "react";
import { BiSolidReport } from "react-icons/bi";
import { BsWalletFill } from "react-icons/bs";
import { FaChartLine, FaUsersCog } from "react-icons/fa";
import {
  FaBuildingUser,
  FaMoneyBillTransfer,
  FaPersonDigging,
} from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import {
  MdEditDocument,
  MdMapsHomeWork,
  MdOutlineNewspaper,
} from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import styled from "styled-components";
import { minus, numberToCurrency, payFor } from "../utils";
import { GiReceiveMoney } from "react-icons/gi";
import ContentWrap from "../../../../components/common/contentWrap";
import { Empty, Skeleton } from "antd";
import { t } from "i18next";

export interface IMobileWageContentProps {
  wageType: unknown;
  monthWage: object;
  yearWage: object;
  isLoading: boolean;
}

export default function MobileWageContent(props: IMobileWageContentProps) {
  // if (props.wageType === "year")
  //   return (
  //     <div className="flex flex-1 flex-col gap-4 overflow-auto rounded-t-[40px] bg-[#F5F5F5] p-4">
  //       qq
  //     </div>
  //   );
  console.log(props.isLoading, props.monthWage, props.yearWage);
  if (props.isLoading || !props.monthWage || !props.monthWage?.dedux)
    return (
      <ContentWrap>
        {/* <SumaryInfo></SumaryInfo> */}
        {/* <Menu /> */}
        <div>
          <div className="sumary grid w-full grid-cols-2 justify-evenly gap-3 text-gray-600 dark:text-gray-300">
            <div
              className="rounded-lg px-2 shadow shadow-green-600 dark:!shadow-lg dark:!shadow-gray-500"
              // style={{
              //   boxShadow: "-6px -6px 6px white, 5px 5px 5px rgba(0, 0, 0, 0.1)",
              // }}
            >
              <div className="mb-1 flex gap-1">
                <FaPersonDigging />
                <p className="text-sm font-semibold">{t("wage.totalPay")}</p>
              </div>
              <div className="text-center text-lg font-medium text-green-600 dark:text-success">
                <Skeleton.Input active size="small" />
              </div>
            </div>
            <div className="rounded-lg px-2 shadow shadow-primary-8 dark:!shadow-lg">
              <div className="mb-1 flex gap-1">
                <FaMoneyBillTransfer />
                <p className="text-sm font-semibold">{t("wage.totalDeduct")}</p>
              </div>
              <div className="text-center text-lg font-medium text-primary-8 dark:text-error">
                <Skeleton.Input active size="small" />
              </div>
            </div>
          </div>
          <div
            className="mt-2 w-full rounded-lg px-2 text-gray-600 shadow shadow-primary-4 dark:text-gray-300 dark:!shadow-lg"
            // style={{
            //   boxShadow:
            //     "-12px -12px 12px white, 10px 10px 10px rgba(0, 0, 0, 0.1)",
            // }}
          >
            <div className="mb-1 flex gap-1">
              <GiReceiveMoney />
              <p className="text-sm font-semibold">{t("wage.total")}</p>
            </div>
            <div className="text-center text-lg font-medium text-primary-4 dark:text-blue-400">
              <Skeleton.Input active size="small" />
            </div>
          </div>
        </div>
        <div>
          <div>
            <div>
              <p className="text-sm italic text-blue-600">
                {t("wage.payDetail")}
              </p>
              <div className="ml-1 flex flex-wrap rounded-lg bg-white shadow-inner shadow-blue-800 dark:bg-gray-200">
                {[1, 2].map((pay, index) => {
                  return (
                    <div key={index} className="w-1/2 p-4">
                      <Skeleton active />
                    </div>
                  );
                })}
                <div className="w-full px-2 py-1">
                  <div className="text-base font-bold text-blue-600">
                    <span className="font-bold">{t("wage.totalPay")}:</span>{" "}
                    <span>
                      <Skeleton.Input active size="small" />
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-2 text-sm italic text-red-600">
                {t("wage.deductDetail")}:
              </p>

              <div className="ml-1 flex w-full flex-wrap rounded-lg bg-white shadow-inner shadow-red-800 dark:bg-gray-200">
                <div className="w-1/2 p-4">
                  <Skeleton active />
                </div>

                <div className="w-full px-2 py-1">
                  <div className="text-base font-bold text-red-600">
                    {t("wage.totalDeduct")}
                    <span className="">
                      <Skeleton.Input active size="small" />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentWrap>
    );

  if (
    (props.wageType === "month" && !props?.monthWage?.income.length) ||
    !props.yearWage?.length
  ) {
    return (
      <div className="flex-1 bg-white">
        <Empty />
      </div>
    );
  }

  return (
    <ContentWrap>
      {/* <SumaryInfo></SumaryInfo> */}
      {/* <Menu /> */}

      <div>
        <div className="sumary grid w-full grid-cols-2 justify-evenly gap-3 text-gray-600 dark:text-gray-300">
          <div
            className="rounded-lg px-2 shadow shadow-green-600 dark:!shadow-lg dark:!shadow-gray-500"
            // style={{
            //   boxShadow: "-6px -6px 6px white, 5px 5px 5px rgba(0, 0, 0, 0.1)",
            // }}
          >
            <div className="mb-1 flex gap-1">
              <FaPersonDigging />
              <p className="text-sm font-semibold">{t("wage.totalPay")}</p>
            </div>
            <p className="text-center text-lg font-medium text-green-600 dark:text-success">
              {numberToCurrency(
                props.wageType === "month"
                  ? props.monthWage?.total.pay_tot_amt
                  : props.yearWage?.[0]?.["tongluongchitra"] || 1234,
              )}
            </p>
          </div>
          <div className="rounded-lg px-2 shadow shadow-primary-8 dark:!shadow-lg">
            <div className="mb-1 flex gap-1">
              <FaMoneyBillTransfer />
              <p className="text-sm font-semibold">{t("wage.totalDeduct")}</p>
            </div>
            <p className="text-center text-lg font-medium text-primary-8 dark:text-error">
              {numberToCurrency(
                props.wageType === "month"
                  ? props.monthWage?.total.sub_tot_amt
                  : props.yearWage?.[0]?.["tongluongkhautru"] || 1234,
              )}
            </p>
          </div>
        </div>
        <div
          className="mt-2 w-full rounded-lg px-2 text-gray-600 shadow shadow-primary-4 dark:text-gray-300 dark:!shadow-lg"
          // style={{
          //   boxShadow:
          //     "-12px -12px 12px white, 10px 10px 10px rgba(0, 0, 0, 0.1)",
          // }}
        >
          <div className="mb-1 flex gap-1">
            <GiReceiveMoney />
            <p className="text-sm font-semibold">{t("wage.total")}</p>
          </div>
          <p className="text-center text-lg font-medium text-primary-4 dark:text-blue-400">
            {numberToCurrency(
              props.wageType === "month"
                ? props.monthWage?.total.real_prov_amt
                : props.yearWage?.[0]?.["tongluongthucnhan"] || 1234,
            )}
          </p>
        </div>
      </div>

      {props.wageType === "year" ? (
        props.yearWage?.length ? (
          <div>
            <table
              className="w-full border-collapse bg-white text-center shadow-md shadow-gray-600 dark:bg-gray-200"
              style={{ border: "1px solid gray" }}
            >
              <tbody className="[&_td]:border [&_td]:border-solid [&_td]:border-gray-200 [&_td]:py-1.5 [&_td]:text-xs">
                <tr className="!bg-primary-3 !text-base text-white">
                  <th>{t("common.month")}</th>
                  <th>{t("common.income")}</th>
                  <th>{t("common.realGet")}</th>
                  <th>{t("common.deduct")}</th>
                </tr>
                {props.yearWage?.length &&
                  props.yearWage.map((month, i) => {
                    return (
                      <tr className="!font-semibold text-primary" key={i}>
                        <td className="text-gray-700">{month.pay_yymm}</td>
                        <td className="text-primary-4">
                          {numberToCurrency(month.pay_tot_amt)}
                        </td>
                        <td className="text-primary-8">
                          {numberToCurrency(month.sub_tot_amt)}
                        </td>
                        <td className="text-primary-1">
                          {numberToCurrency(month.real_prov_amt)}
                        </td>
                      </tr>
                    );
                  })}

                <tr className="bg-gray-200 !font-semibold text-primary [&>*]:!text-sm [&_td]:pt-2">
                  <td>{t("common.total")}:</td>
                  <td className="text-primary-4">
                    {numberToCurrency(props.yearWage[1].tongluongchitra)}
                  </td>
                  <td className="text-primary-8">
                    {numberToCurrency(props.yearWage[1].tongluongkhautru)}
                  </td>
                  <td className="text-primary-1">
                    {numberToCurrency(props.yearWage[1].tongluongthucnhan)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex-1">
            <Empty />
          </div>
        )
      ) : (
        <div>
          <div>
            <div>
              <p className="text-sm italic text-blue-600">
                {t("wage.payDetail")}:
              </p>
              <div className="ml-1 flex flex-wrap rounded-lg bg-white shadow-inner shadow-blue-800 dark:bg-gray-200">
                {props.monthWage?.income?.map((pay, index) => {
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
                    <span>
                      {numberToCurrency(props.monthWage?.total.pay_tot_amt)}
                    </span>
                  </div>
                </div>
              </div>

              <p className="mt-2 text-sm italic text-red-600">
                {t("wage.deductDetail")}:
              </p>

              <div className="ml-1 flex w-full flex-wrap rounded-lg bg-white shadow-inner shadow-red-800 dark:bg-gray-200">
                {props.monthWage?.dedux?.map((minusItem, index) => {
                  return (
                    <div key={index} className="w-1/2 px-2 py-1">
                      <Statistic
                        type="error"
                        title={
                          minusItem.allow_nm[0].toUpperCase() +
                          minusItem.allow_nm.slice(1).toLowerCase()
                        }
                        content={<>{numberToCurrency(minusItem.sub_amt)}</>}
                      />
                    </div>
                  );
                })}

                <div className="w-full px-2 py-1">
                  <div className="text-base font-bold text-red-600">
                    {t("wage.totalDeduct")}:
                    <span className="">
                      {numberToCurrency(props.monthWage?.total.sub_tot_amt)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ContentWrap>
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
        className={`title ${
          props.type === "primary"
            ? "from-black to-purple-500"
            : props.type === "error"
              ? "from-purple-800 to-red-800"
              : "from-black to-black"
        } bg-gradient-to-r bg-clip-text font-bold text-transparent`}
      >
        {props.title}
      </div>
      <div className="content px-3 text-sm text-gray-700">{props.content}</div>
    </StyledStatistic>
  );
}
