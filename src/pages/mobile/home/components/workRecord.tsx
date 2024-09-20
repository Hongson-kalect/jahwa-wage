import * as React from "react";
import { useTranslation } from "react-i18next";

export interface IWorkRecordProps {
  title: string;
  items: {
    label: React.ReactNode;
    value: number;
    prefix?: string;
  }[];
  className?: string;
  type?: "primary" | "outline" | "bold" | "danger";
  revert?: boolean;
}

const wrapperStyled = {
  outline: "shadow-sm shadow-indigo-400 bg-white",
  primary: "bg-blue-600 shadow-indigo-500 ",
  bold: "shadow shadow-indigo-700 bg-white",
  danger: "bg-white shadow shadow-rose-300",
};

const contentStyled = {
  outline: "text-blue-600",
  primary: "text-white",
  bold: "text-indigo-800",
  danger: "text-red-400",
};

export default function WorkRecord(props: IWorkRecordProps) {
  const { t } = useTranslation();

  const wrapperStyle = React.useMemo(() => {
    const style = wrapperStyled[props.type || "outline"];
    return style;
  }, [props.type, props.revert]);

  const contentStyle = React.useMemo(() => {
    const style = contentStyled[props.type || "outline"];
    if (props.revert) {
      style.replace("bg", "temp");
      style.replace("text", "bg");
      style.replace("temp", "text");
    }
    return style;
  }, [props.type, props.revert]);

  return (
    <div
      className={`content-sub flex gap-2 rounded-xl px-2 py-1 shadow-sm ${wrapperStyle} ${props.className}`}
    >
      <div className="content flex-1 py-1">
        <div className="title text-xs text-gray-500">{props.title}</div>
        <div className="items mt-1 flex justify-evenly px-2 pr-4 text-sm">
          {props.items.map(({ label, value, prefix }, index) => {
            return (
              <div
                key={index}
                className={`item flex flex-1 gap-1 ${value ? "" : "opacity-35"}`}
              >
                <div className={`${contentStyle}`}>{label}</div>
                <p className="font-medium text-gray-600">
                  {value} {prefix || t("common.Hour")}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
