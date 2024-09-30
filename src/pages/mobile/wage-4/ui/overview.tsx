import * as React from "react";
import { FaPersonDigging } from "react-icons/fa6";

export interface IOverviewProps {}

export default function Overview(props: IOverviewProps) {
  return (
    <div className="mt-3 justify-evenly rounded-lg p-2">
      {/* <p className="font text-blue-600">Overview</p> */}

      <div className="mt-2 grid grid-cols-3 gap-y-4 text-center">
        <div className="flex h-16 flex-col justify-between rounded-lg p-2">
          <div className="text-center text-3xl font-medium">28</div>
          <p className="mt-1 text-sm text-gray-600">Tổng ngày</p>
        </div>
        <div className="flex h-16 flex-col justify-between rounded-lg p-2">
          <div className="text-center text-3xl font-medium">240</div>
          <p className="mt-1 text-sm text-gray-600">Giờ làm</p>
        </div>
        <div className="flex h-16 flex-col justify-between rounded-lg p-2">
          <div className="text-center text-3xl font-medium">56.5</div>
          <p className="mt-1 text-sm text-gray-600">Tăng ca</p>
        </div>
        {/* <div className="flex h-16 flex-col justify-between rounded-lg p-2">
          <div className="text-center text-3xl font-medium">12</div>
          <p className="mt-1 text-sm text-gray-600">Ca đêm</p>
        </div>
        <div className="flex h-16 flex-col justify-between rounded-lg p-2">
          <div className="text-center text-3xl font-medium">4</div>
          <p className="mt-1 text-sm text-gray-600">Chủ nhật</p>
        </div>
        <div className="flex h-16 flex-col justify-between rounded-lg p-2">
          <div className="text-center text-3xl font-medium">14.5</div>
          <p className="mt-1 text-sm text-gray-600">Tăng ca đêm</p>
        </div> */}
      </div>
    </div>
  );
}
