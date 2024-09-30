import * as React from "react";
import { FaPersonDigging } from "react-icons/fa6";

export interface IOverviewProps {}

export default function Overview(props: IOverviewProps) {
  return (
    <div className="my-2 flex justify-between">
      <div className="pay">
        <p>Lương thực lĩnh</p>
        <p>12.765.987</p> <span>đ</span>
        <p>Chi trả: 10-06-2024</p>
      </div>
      <div className="time-select">
        <div className="time-type"></div>
      </div>
    </div>
  );
}
