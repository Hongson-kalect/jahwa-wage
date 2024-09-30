import * as React from "react";
import PayItem from "../components/payItem";

export interface IDeDuctDetailProps {}

export default function DeDuctDetail(props: IDeDuctDetailProps) {
  return (
    <div className="mt-3 rounded-lg bg-white p-2 shadow shadow-gray-400">
      <p className="text-base font-medium text-blue-600">Chi tiết khấu trừ</p>
      <div className="mt-2 grid w-full grid-cols-2 gap-5 p-2">
        <PayItem isDeDuct name="P/C tăng ca CN" time="12H30" value={12345678} />
        <PayItem isDeDuct name="P/C tăng ca CN" time="12H30" value={12345678} />
        <PayItem isDeDuct name="P/C tăng ca CN" time="12H30" value={12345678} />
        <PayItem isDeDuct name="P/C tăng ca CN" time="12H30" value={12345678} />
        <PayItem isDeDuct name="P/C tăng ca CN" time="12H30" value={12345678} />
      </div>
    </div>
  );
}
