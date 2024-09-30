import * as React from "react";
import { numberToCurrency } from "../utils";
import BoxWrap from "../components/boxWrap";
import { PiMoneyWavyFill } from "react-icons/pi";
import VNDONG from "../../../../components/common/vnd";

export interface IPaymentProps {}

export default function Payment(props: IPaymentProps) {
  return (
    <div
      className="mx-4 mt-2 border-gray-400 py-2"
      style={{ borderBottom: "1px solid #bebebe" }}
    >
      <div className="py-2">
        <div className="flex items-center gap-4 text-xl text-white">
          <div className="flex gap-2 pl-2">
            <PiMoneyWavyFill size={24} />
            Thực lĩnh
          </div>
          <span className="text-2xl font-bold">
            {numberToCurrency(12345678)}
          </span>
        </div>

        <div className="mt-4 flex justify-between px-2 text-gray-300 [&>div]:flex-1">
          <div className="flex flex-col gap-2">
            <p className="w-20 text-lg">Chi trả</p>
            <span className="flex justify-center text-xl font-medium text-green-300">
              <VNDONG value={12345678} />
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <p className="w-20 text-lg">Khấu trừ</p>
            <span className="flex justify-center text-xl font-medium text-red-400">
              <VNDONG value={12345678} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
