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
    <div className="relative mt-2 py-2 text-white">
      <p className="absolute right-0 top-0 text-xs font-light text-gray-300">
        Chi trả: 10/11/2024
      </p>
      <div className="pt-2">
        <div className="flex items-center justify-between">
          <div
            className="flex items-center gap-2"
            onClick={() => setIsYear(!isYear)}
          >
            <TimeToggle size="6px" check={isYear} />
            {isYear ? (
              <p className="text-xl font-bold text-blue-500">Lương năm</p>
            ) : (
              <p className="text-xl font-bold text-red-500">Lương tháng</p>
            )}
          </div>

          <DatePicker
            size="large"
            className="h-8 w-32"
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
