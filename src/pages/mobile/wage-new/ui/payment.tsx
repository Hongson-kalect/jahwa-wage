import * as React from "react";
import { numberToCurrency } from "../utils";
import BoxWrap from "../components/boxWrap";
import { PiMoneyWavyFill } from "react-icons/pi";
import VNDONG from "../../../../components/common/vnd";

export interface IPaymentProps {}

export default function Payment(props: IPaymentProps) {
  return (
    <BoxWrap>
      <div className="py-2 text-gray-600">
        <div className="flex items-center gap-2 text-xl text-sky-800">
          <PiMoneyWavyFill size={24} />
          Thực lĩnh:{" "}
          <span className="text-2xl font-bold">
            {numberToCurrency(12345678)}
          </span>
        </div>

        <div className="mt-3 flex flex-col justify-between text-gray-500 [&>div]:flex-1">
          <div className="flex items-center gap-2">
            <p className="w-20 text-lg">Chi trả</p>
            <span className="text-xl font-medium text-teal-600">
              <VNDONG value={12345678} />
            </span>
          </div>
          <div className="flex gap-2 text-lg">
            <div className="w-20">Khấu trừ</div>
            <span className="text-xl font-medium text-rose-600">
              <VNDONG value={1234567} />
            </span>
          </div>
        </div>
      </div>
    </BoxWrap>
  );
}
