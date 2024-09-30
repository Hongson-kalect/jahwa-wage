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
      className="flex h-12 w-full items-center justify-between pt-4"
      style={{ borderBottom: "1px solid #ddd" }}
    >
      <div className="flex-1 text-lg text-gray-200">{props.name}</div>
      <div
        className={`w-12 text-center text-sm italic ${!props.isDeDuct ? "text-cyan-500" : "text-pink-400"} text-whitev`}
      >
        {props.time}
      </div>
      <div
        className={`w-32 text-lg ${!props.isDeDuct ? "text-green-300" : "text-red-400"}`}
      >
        <VNDONG value={props.value} />
      </div>
    </div>
  );
}
