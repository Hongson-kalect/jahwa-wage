import * as React from "react";
import { FaPersonDigging } from "react-icons/fa6";

export interface IOverviewProps {}

export default function Overview(props: IOverviewProps) {
  return (
    <div
      className="mx-4 flex justify-evenly border-gray-400 bg-white py-2"
      style={{ borderBottom: "1px solid #bebebe" }}
    >
      <div className="flex h-20 w-1/4 flex-col justify-between rounded-lg bg-cyan-400 p-2">
        <p className="text-xs text-gray-950">Tổng ngày</p>
        <div className="text-center text-3xl font-medium text-white">28</div>
      </div>
      <div className="flex h-20 w-1/4 flex-col justify-between rounded-lg bg-cyan-400 p-2">
        <p className="text-xs text-gray-950">Giờ làm</p>
        <div className="text-center text-3xl font-medium text-white">240</div>
      </div>
      <div className="flex h-20 w-1/4 flex-col justify-between rounded-lg bg-cyan-400 p-2">
        <p className="text-xs text-gray-950">Tăng ca</p>
        <div className="text-center text-3xl font-medium text-white">56.5</div>
      </div>

      {/* <div className="w-full text-gray-600">
        <div className="flex items-center gap-2">
          <FaPersonDigging size={20} />
          Số ngày <span className="text-lg font-medium text-sky-600">28</span>
        </div>

        <div className="mt-2.5 flex justify-between text-gray-600 [&>div]:flex-1">
          <div className="text-sm">
            Tổng giờ <span className="ml-1 text-gray-500">240</span>
          </div>
          <div className="text-sm">
            Giờ tăng ca <span className="ml-1 text-gray-500">55</span>
          </div>
        </div>
      </div> */}
    </div>
  );
}
