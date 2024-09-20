import { Button } from "@mui/material";
import { DatePicker, Image, Select } from "antd";
import { DatePickerType } from "antd/es/date-picker";
import dayjs from "dayjs";
import * as React from "react";
import { BiDownArrow } from "react-icons/bi";
import { IoCaretDown } from "react-icons/io5";
import styled from "styled-components";
import { useUserInfoStore } from "../../../../store/userinfo";
import { t } from "i18next";

export interface IMobileWageHeaderProps {
  wageType: unknown;
  setWageType: React.Dispatch<React.SetStateAction<unknown>>;
  date?: dayjs.Dayjs;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  payDate: string;
}

const StyledSelect = styled(Select)`
  height: 34px !important;
  .ant-select {
    padding: 8px 0 !important;
    padding-right: 4px;
  }
  .ant-select-selector {
    background: transparent !important;
    border: 0.5px solid white !important;

    color: white;
    font-size: 18px;
    span {
      /* text-decoration: underline;
      text-decoration-thickness: 1px; */
    }
  }
`;

export default function MobileWageHeader(props: IMobileWageHeaderProps) {
  const [notify, setNotify] = React.useState(0);
  const { user } = useUserInfoStore();

  return (
    <div className="flex flex-col gap-2 px-2 pb-3 pt-2">
      <div className="flex items-center justify-between">
        <div className="relative">
          <StyledSelect
            className="w-36"
            value={props.wageType}
            suffixIcon={null}
            onChange={(value) => props.setWageType(value)}
          >
            <Select.Option value="month">
              {t("newLang.monthWage")}
            </Select.Option>
            <Select.Option value="year">{t("newLang.yearWage")}</Select.Option>
          </StyledSelect>
          <IoCaretDown color="white" className="absolute bottom-2 right-1" />
        </div>
        {/* <p className="text-2xl text-[#eee] underline">Lương tháng</p> */}
        <DatePicker
          allowClear={false}
          inputReadOnly
          className="[&_*]:!color-gray-600 w-32 [&_*]:!text-base [&_*]:!font-medium"
          placeholder="Chọn tháng"
          picker={props.wageType === "month" ? "month" : "year"}
          value={props.date}
          onChange={(value) => props.setDate(value)}
        />
      </div>
      <div className="panel relative flex-1 rounded-lg bg-white text-center dark:bg-gray-700">
        <div className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
          <Image
            style={{ border: "2px solid gray" }}
            // className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3"
            width={80}
            height={80}
            src={user.avatar}
          />
        </div>
        <div className="info mt-9"></div>
        <p className="font-medium text-gray-800 dark:text-white">{user.NAME}</p>
        <p className="text-xs font-bold text-gray-500 dark:text-gray-300">
          {user.EMP_NO}
        </p>
        <div className="grid grid-cols-3 gap-2 p-2">
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-300">
              {t("profile.seft.duty")}
            </p>
            <p className="mt-1 text-sm font-medium text-primary-4 dark:text-primary-3">
              {user.chucvi}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-300">
              {t("profile.seft.department")}
            </p>
            <p className="mt-1 text-sm font-medium text-primary-4 dark:text-primary-3">
              {user.DEPT_NM}
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-300">
              {t("profile.detail.companyInfo.wageRank")}
            </p>
            <p className="mt-1 text-sm font-medium text-primary-4 dark:text-primary-3">
              {`${user.PAY_GRD1} ${user.PAY_GRD2}`}
            </p>
          </div>
        </div>
        <div className="absolute right-2 top-1 text-xs italic opacity-80 dark:text-gray-300">
          {t("newLang.payAt")}: {props.payDate?.slice(0, 10) || ""}
        </div>
      </div>
    </div>
  );
}
