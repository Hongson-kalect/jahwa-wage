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

export interface IMobileWageNewProps {}

export default function MobileWageNew(props: IMobileWageNewProps) {
  const [wageType, setWageType] = React.useState<"month" | "year">("month");

  return (
    <div className="relative z-50 flex h-screen w-full flex-col overflow-auto bg-black text-white">
      <Header />
      <div
        className="flex-1 overflow-scroll"
        style={{ height: "calc(100dvh - 40px)", scrollSnapType: "y proximity" }}
      >
        <div className="snap-start px-2 pt-2">
          <div className="flex items-center justify-between">
            <StyledSelect<string>
              className="w-36"
              value={wageType}
              onChange={(val) => setWageType(val)}
              suffixIcon={<RiEdit2Line color="white" size={20} />}
            >
              <Select.Option value="month">Lương tháng</Select.Option>
              <Select.Option value="year">Lương năm</Select.Option>
            </StyledSelect>
            <DatePicker
              picker={wageType}
              className="border-none"
              allowClear={false}
              cellRender={(val) =>
                wageType === "month" ? (
                  <div style={{ textAlign: "center" }}>
                    <p style={{ fontSize: "18px", fontWeight: "600" }}>
                      {dayjs(val).month() + 1}
                    </p>
                    <div
                      style={{
                        fontSize: "11px",
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
        <p className="pr-2 text-right text-xs text-gray-400">
          Chi trả: 10/11/2024
        </p>

        <div className="px-4 pt-4">
          <div className="rounded-lg bg-gradient-to-r from-gray-900 to-purple-950 py-2">
            <table className="mt-2 w-full">
              <tbody>
                <tr className="text-center text-sm text-gray-400">
                  <td>Ngày làm</td>
                  <td>Giờ làm</td>
                  {/* <td>Tăng ca</td> */}
                  <td>Bậc lương</td>
                </tr>
                <tr className="text-center text-lg text-white">
                  <td>28 Ngày</td>
                  <td>238 Giờ</td>
                  {/* <td>Tăng ca</td> */}
                  <td>G4 - E2</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="sumary flex snap-start gap-2 px-2 pt-6">
          <div className="flex-[55] rounded-lg bg-gradient-to-r from-gray-600 to-gray-900 px-2 py-1 text-center">
            <p className="text-left text-sm opacity-80">Chi trả</p>
            <p className="mt-1 text-xl font-medium">
              {numberToCurrency(12987654)}
            </p>
          </div>
          <div className="flex-[45] rounded-lg bg-gradient-to-r from-red-600 to-gray-400 px-2 py-1 text-center shadow shadow-black">
            <p className="text-left text-sm opacity-80">Khấu trừ</p>
            <p className="mt-1 text-xl font-medium">
              {numberToCurrency(12987654)}
            </p>
          </div>
        </div>
        <div className="mt-4 px-2">
          <div className="rounded-lg bg-blue-500 px-2 py-1 text-center text-white shadow shadow-black">
            <p className="mt-1 text-2xl font-medium">
              {numberToCurrency(12987654)}
            </p>
            <p className="text-sm opacity-90">Thực lĩnh</p>
          </div>
        </div>

        <div className="mt-6 snap-start px-2">
          <p className="mb-1 flex items-center gap-2 text-gray-400">
            Chi tiết chi trả <BiDetail size={20} />
          </p>
          {/* <div className="rounded-lg p-2"></div> */}
          <div className="rounded" style={{ border: "1px solid gray" }}>
            <div className="flex flex-col gap-3 p-2 px-1">
              <div
                className="flex w-full items-center justify-between rounded-sm bg-gray-300 px-2 py-1 text-black shadow-inner shadow-white"
                style={{ border: "border 1px solid black" }}
              >
                <div>
                  <p className="line-clamp-1 flex-1 font-medium">
                    PC Tăng ca chủ nhật
                  </p>
                </div>
                <p className="w-14 px-1 pt-1 text-sm text-gray-600">24H30P</p>
                <div className="w-24 px-1 font-medium text-green-600">
                  {numberToCurrency(12345678)}
                </div>
              </div>
              <div
                className="flex w-full items-center justify-between rounded-sm bg-gradient-to-r from-white via-gray-800 via-60% to-black px-2 py-1 text-black shadow-inner shadow-white"
                style={{ border: "border 1px solid black" }}
              >
                <div>
                  <p className="line-clamp-1 flex-1 font-medium">
                    PC Tăng ca chủ nhật
                  </p>
                </div>
                <p className="w-14 px-1 pt-1 text-sm text-gray-600">24H30P</p>
                <div className="w-24 px-1 font-medium text-green-600">
                  {numberToCurrency(12345678)}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 snap-start px-2">
          <p className="mb-2 flex items-center gap-2 text-rose-400">
            Chi tiết khấu trừ
            <BiDetail />
          </p>
          {/* <div className="rounded-lg p-2"></div> */}
          <div>
            <div className="flex flex-col gap-2 px-2 text-rose-400">
              <div className="flex w-full items-center justify-between rounded-xl bg-rose-100 px-4 py-1 text-black shadow-inner shadow-pink-300">
                <div>
                  <p className="font-medium">PC Tăng ca chủ nhật</p>
                  {/* <p className="text-xs text-pink-400">12 Giờ 30 Phút</p> */}
                </div>
                <div>{numberToCurrency(12345678)}</div>
              </div>
              <div className="flex w-full items-center justify-between rounded-xl bg-rose-100 px-4 py-1 text-black shadow-inner shadow-pink-300">
                <div>
                  <p className="font-medium">PC Tăng ca chủ nhật</p>
                  {/* <p className="text-xs text-pink-400">12 Giờ 30 Phút</p> */}
                </div>
                <div>{numberToCurrency(12345678)}</div>
              </div>
              <div className="flex w-full items-center justify-between rounded-xl bg-rose-100 px-4 py-1 text-black shadow-inner shadow-pink-300">
                <div>
                  <p className="font-medium">PC Tăng ca chủ nhật</p>
                  {/* <p className="text-xs text-pink-400">12 Giờ 30 Phút</p> */}
                </div>
                <div>{numberToCurrency(12345678)}</div>
              </div>
              <div className="flex w-full items-center justify-between rounded-xl bg-rose-100 px-4 py-1 text-black shadow-inner shadow-pink-300">
                <div>
                  <p className="font-medium">PC Tăng ca chủ nhật</p>
                  {/* <p className="text-xs text-pink-400">12 Giờ 30 Phút</p> */}
                </div>
                <div>{numberToCurrency(12345678)}</div>
              </div>
              <div className="flex w-full items-center justify-between rounded-xl bg-rose-100 px-4 py-1 text-black shadow-inner shadow-pink-300">
                <div>
                  <p className="font-medium">PC Tăng ca chủ nhật</p>
                  {/* <p className="text-xs text-pink-400">12 Giờ 30 Phút</p> */}
                </div>
                <div>{numberToCurrency(12345678)}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-4"></div>
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <div className="z-[999] flex h-12 w-full items-center justify-between bg-gray-800 px-2 py-1 text-white">
      <SidebarToggle color="white" size={12} />
      <p>Bảng lương</p>
      <LanguageChanger />
    </div>
  );
};

const StyledSelect = styled(Select)`
  background-color: transparent;
  color: white;
  .ant-select-selector {
    font-size: 16px;
    box-shadow: none !important;
    outline: none !important;
    border: none !important;
    width: 100%;
    background-color: transparent !important;
  }
  .ant-select-selection-item {
    color: white !important;
    text-decoration: underline;
  }
`;
