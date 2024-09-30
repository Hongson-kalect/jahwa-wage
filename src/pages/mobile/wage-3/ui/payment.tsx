import * as React from "react";
import {
  TbArrowBigDownFilled,
  TbArrowBigUpFilled,
  TbArrowBigUpLine,
} from "react-icons/tb";
export interface IPaymentProps {}

export default function Payment(props: IPaymentProps) {
  return (
    <div
      className="mt-3 justify-evenly rounded-lg bg-white p-2 pb-3 shadow shadow-gray-400"
      style={{ borderBottom: "1px solid #bebebe" }}
    >
      <p className="text-sm font-medium text-blue-600">Payment</p>

      <div className="mt-4 px-4 text-center">
        <div className="text-center text-3xl font-medium">12.500.340</div>
      </div>
      <div className="mt-2 flex">
        <div className="flex h-16 w-1/2 flex-col justify-between gap-1 rounded-lg p-2">
          <p className="flex items-start gap-1 text-sm text-gray-600">
            <p className="pt-1">Làm ra</p>
            <TbArrowBigUpFilled size={20} color="#5dce6c" />
          </p>
          <div className="text-center text-2xl font-medium">12.888.888</div>
        </div>
        <div className="flex h-16 w-1/2 flex-col justify-between gap-1 rounded-lg p-2">
          <p className="flex items-start gap-1 text-sm text-gray-600">
            <p className="pt-1">Khấu trừ</p>
            <TbArrowBigDownFilled size={20} color="#ff5f5f" />
          </p>
          <div className="text-center text-2xl font-medium">8.888.888</div>
        </div>
      </div>
    </div>
  );
}
