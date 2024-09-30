import * as React from "react";
import { FaPersonDigging } from "react-icons/fa6";

export interface IOverviewProps {}

export default function Overview(props: IOverviewProps) {
  return (
    <div
      className="mt-3 justify-evenly rounded-lg bg-white p-2 shadow shadow-gray-400"
      style={{ borderBottom: "1px solid #bebebe" }}
    >
      <p className="text-sm font-medium text-blue-600">Overview</p>

      <div className="mt-2 flex">
        <div className="flex h-16 w-1/3 flex-col justify-between rounded-lg p-2">
          <p className="text-sm text-gray-600">Tổng ngày</p>
          <div className="text-center text-2xl font-medium">28</div>
        </div>
        <div className="flex h-16 w-1/3 flex-col justify-between rounded-lg p-2">
          <p className="text-sm text-gray-600">Giờ làm</p>
          <div className="text-center text-2xl font-medium">240</div>
        </div>
        <div className="flex h-16 w-1/3 flex-col justify-between rounded-lg p-2">
          <p className="text-sm text-gray-600">Tăng ca</p>
          <div className="text-center text-2xl font-medium">56.5</div>
        </div>
      </div>
    </div>
  );
}
