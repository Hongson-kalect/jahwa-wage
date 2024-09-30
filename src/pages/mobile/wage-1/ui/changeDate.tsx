import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { RiEdit2Line } from "react-icons/ri";
import styled from "styled-components";
import { GrPowerCycle } from "react-icons/gr";
import { FaPen } from "react-icons/fa6";

export interface IChangeDateProps {}

export default function ChangeDate(props: IChangeDateProps) {
  const [wageType, setWageType] = React.useState<"month" | "year">("month");
  const [isYear, setIsYear] = React.useState(false);

  return (
    <div className="flex items-end justify-between pt-2">
      <div className="">
        <p className="font-medium text-gray-700">Thực lĩnh</p>
        <div className="relative mt-2 text-blue-900">
          <p className="pr-3 text-4xl font-medium">12.765.987</p>
          <p className="absolute right-0 top-0 font-medium">đ</p>
        </div>
        <p className="font-light text-gray-400">Chi trả: 10-06-2024</p>
      </div>

      <div>
        <TimeTypeChanger />
        <TimeSelect />
      </div>
    </div>
  );
}

const TimeTypeChanger = () => {
  return (
    <div className="relative">
      {/* <div className="h-12 w-24 rounded-full bg-blue-900"></div> */}
      <p className="line-[10px] w-20 rounded-[50%] bg-blue-900 px-4 py-2 text-center text-white">
        Tháng
      </p>
      <div className="icon absolute -top-2 right-[75px]">
        <GrPowerCycle className="text-blue-900" />
      </div>
      <p className="icon absolute -top-1 right-24 -rotate-12 text-gray-300">
        Năm
      </p>
    </div>
  );
};

const TimeSelect = () => {
  return (
    <div className="relative text-blue-900">
      <p className="text-6xl">9</p>
      <div className="icon absolute -left-6 top-0">
        <FaPen className="flip scale-x-[-1]" />
      </div>

      <p className="absolute bottom-2 right-10 text-xl">/</p>
      <p className="text-right text-gray-500">2024</p>
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
