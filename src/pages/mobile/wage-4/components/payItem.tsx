import * as React from "react";
import VNDONG from "../../../../components/common/vnd";

export interface IPayItemProps {
  isDeDuct?: boolean;
  name: string;
  time: string;
  value: string | number;
}

export default function PayItem(props: IPayItemProps) {
  //   const [value] = React.useState(() => {
  //     const text = numberToCurrency(Number(props.value)).toString();
  //     return text.slice(0, text.length - 1);
  //   });
  return (
    <div
      className="flex w-full flex-col items-center justify-between gap-4 rounded-lg bg-white p-2 py-1"
      style={{ boxShadow: "2px 2px 4px #06062b, -1px -1px 2px #ccccd9" }}
    >
      <div className="flex w-full items-center justify-between">
        <p className="text-xl font-medium">4.300.000</p>
        <p
          className={`text-xs font-light italic ${props.isDeDuct ? "text-red-600" : "text-green-600"}`}
        >
          4H30
        </p>
      </div>
      <div
        className="text-center text-sm text-gray-700"
        style={{ lineHeight: "16px" }}
      >
        Lương cơ bản ái ố asd asd ád
      </div>
    </div>
  );
}
