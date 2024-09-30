import { DatePicker, Select } from "antd";
import dayjs from "dayjs";
import * as React from "react";
import { RiEdit2Line } from "react-icons/ri";
import styled from "styled-components";
import { monthNames } from "../../../../lib/utlis";
import { TimeToggle } from "../components/toggle";

export interface IChangeDateProps {}

export default function ChangeDate(props: IChangeDateProps) {
  const [wageType, setWageType] = React.useState<"month" | "year">("month");
  const [isYear, setIsYear] = React.useState(false);

  return (
    <div className="relative mt-4 rounded-lg text-white">
      <div className="">
        <div className="flex justify-between">
          <div
            className="flex h-10 w-[60%] items-center gap-2 rounded-lg bg-gray-300 px-2 py-1"
            onClick={() => setIsYear(!isYear)}
          >
            <div className="rotate-90">
              <TimeToggle size="6px" check={isYear} />
            </div>
            {isYear ? (
              <p className="text-xl text-blue-600">Bảng lương năm</p>
            ) : (
              <p className="text-xl text-blue-600">Bảng lương tháng</p>
            )}
          </div>

          <DatePicker
            size="large"
            className="h-10 w-[30%] bg-gray-300 px-2 py-1"
            picker={wageType}
            allowClear={false}
            placeholder={isYear ? "Năm" : "Tháng"}
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
  );
}

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
