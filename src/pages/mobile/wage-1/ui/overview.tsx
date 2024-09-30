import * as React from "react";
import { FaPersonDigging } from "react-icons/fa6";
import { numberToCurrency2 } from "../../wage/utils";

export interface IOverviewProps {}

export default function Overview(props: IOverviewProps) {
  return (
    <div
      className="mt-8 rounded-lg shadow-inner shadow-gray-600"
      style={{ borderBottom: "1px solid #bebebe" }}
    >
      <div className="flex justify-around py-4">
        <div className="flex flex-col items-center justify-center">
          <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-800 text-2xl font-medium text-white">
            28
          </p>
          <p className="mt-1 text-lg text-gray-500">Tổng ngày</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-800 text-2xl font-medium text-white">
            2400
          </p>
          <p className="mt-1 text-lg text-gray-500">Giờ làm</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-800 text-2xl font-medium text-white">
            1200
          </p>
          <p className="mt-1 text-lg text-gray-500">Tăng ca</p>
        </div>
      </div>

      <div className="flex" style={{ borderTop: "1px solid #ddd" }}>
        <div
          className="flex flex-1 flex-col items-center pb-2"
          style={{ borderRight: "1px solid #ddd" }}
        >
          <p className="mt-2 w-full pl-3 text-gray-500">Lương thưởng</p>
          <div className="relative mt-3 pr-3 text-2xl font-medium text-green-700">
            <p>{numberToCurrency2(12345678)}</p>
            <p className="absolute right-0 top-0 text-sm">đ</p>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-center">
          <p className="mt-2 w-full pl-3 text-gray-500">Khấu trừ</p>
          <div className="relative mt-3 pr-3 text-2xl font-medium text-red-700">
            <p>{numberToCurrency2(1234567)}</p>
            <p className="absolute right-0 top-0 text-sm">đ</p>
          </div>
        </div>
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
