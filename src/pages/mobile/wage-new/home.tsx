import * as React from "react";
import { SidebarToggle } from "./components/sidebarToggle";
import { Avatar, DatePicker, Select } from "antd";
import LanguageChanger from "../../../components/common/languageChange";
import styled from "styled-components";
import { RiEdit2Line } from "react-icons/ri";
import dayjs from "dayjs";
import { monthNames } from "../../../lib/utlis";
import { numberToCurrency } from "./utils";
import { BiDetail } from "react-icons/bi";
import Overview from "./ui/overview";
import Payment from "./ui/payment";
import PayDetail from "./ui/payDetail";
import DeDuctDetail from "./ui/deductDetail";

export interface IMobileWageNewProps {}

export default function MobileWageNew(props: IMobileWageNewProps) {
  const [wageType, setWageType] = React.useState<"month" | "year">("month");

  return (
    <div className="flex h-screen w-full flex-col overflow-auto bg-white">
      <Header />
      <div
        className="flex-1 overflow-scroll px-2"
        style={{ height: "calc(100dvh - 40px)", scrollSnapType: "y proximity" }}
      >
        <div className="relative mt-2 py-2">
          <p className="absolute right-0 top-0 text-xs font-light text-gray-600">
            Chi trả: 10/11/2024
          </p>
          <div className="pt-2">
            <div className="flex items-center justify-between">
              <StyledSelect<string>
                className="h-10 w-44"
                value={wageType}
                onChange={(val) => setWageType(val)}
                suffixIcon={<RiEdit2Line color="blue" size={24} />}
              >
                <Select.Option value="month">Lương tháng</Select.Option>
                <Select.Option value="year">Lương năm</Select.Option>
              </StyledSelect>

              <DatePicker
                size="large"
                className="h-10 w-32"
                picker={wageType}
                allowClear={false}
                cellRender={(val) =>
                  wageType === "month" ? (
                    <div style={{ textAlign: "center" }}>
                      <p style={{ fontSize: "20px", fontWeight: "600" }}>
                        {dayjs(val).month() + 1}
                      </p>
                      <div
                        style={{
                          fontSize: "12px",
                          fontWeight: "600",
                          opacity: 0.7,
                        }}
                      >
                        {monthNames[dayjs(val).month()]}
                      </div>
                    </div>
                  ) : (
                    <p style={{ fontSize: "16px", fontWeight: "600" }}>
                      {dayjs(val).year()}
                    </p>
                  )
                }
                inputReadOnly
              />
            </div>
          </div>
        </div>

        <p className="mb-2 ml-2 mt-3 text-lg font-medium">Overview</p>

        <Overview />

        <Payment />

        <p className="ml-2 mt-8 font-semibold text-blue-600">
          Chi tiết chi trả
        </p>

        <PayDetail />

        <p className="ml-2 mt-8 font-semibold text-rose-500">
          Chi tiết khấu trừ
        </p>

        <DeDuctDetail />
      </div>
      <div className="h-4"></div>
    </div>
  );
}

const Header = () => {
  return (
    <div
      className="z-[999] flex h-12 w-full items-center justify-between bg-gradient-to-r from-indigo-600 via-indigo-700 to-indigo-900 px-2 py-1 text-white"
      style={{ borderBottom: "1px solid #c0c0c0" }}
    >
      <SidebarToggle color="white" size={10} />
      <p>Bảng lương</p>
      <LanguageChanger />
    </div>
  );
};

const StyledSelect = styled(Select)`
  background-color: transparent;
  color: #1e67b9;
  .ant-select-selector {
    border: 1px solid #8babcf !important;
    font-size: 18px;
    width: 100%;
    background-color: transparent !important;
  }
  .ant-select-selection-item {
    color: #1e67b9 !important;
    /* text-decoration: underline; */
  }
`;
