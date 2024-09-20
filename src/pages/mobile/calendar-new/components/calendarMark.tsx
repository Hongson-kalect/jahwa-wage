import React from "react";
import { WorkType } from "../interface";

type CalendarMarkProps = {
  date: number;
  data?: {
    date: string;
    data: WorkType[];
    shift: string;
  };
};

export const CalendarMark = (props: CalendarMarkProps) => {
  const [haveSomething, setHaveSomething] = React.useState(false);
  if (!props.data) return <div></div>;

  return (
    <div className="flex w-full items-center justify-center px-[15%]">
      <div
        className={`h-[3px] w-full overflow-hidden rounded-lg bg-transparent shadow ${Number(props?.data?.shift) === 2 ? "flex shadow-primary-8" : ""}`}
      >
        {!haveSomething && <div className="h-full flex-1 bg-green-400" />}
        {props.data.data.some((item) => {
          if ([33, 31, 47, 40, 38].includes(Number(item.dilig_cd))) {
            !haveSomething && setHaveSomething(true);
            return true;
          }
        }) && <div className="h-full flex-1 bg-cyan-600" />}
        {
          props.data.data.some((item) => {
            if ([1].includes(Number(item.dilig_cd))) {
              !haveSomething && setHaveSomething(true);
              return true;
            }
          }) && <div className="h-full flex-1 bg-orange-500" /> //phép năm
        }
        {
          props.data.data.some((item) => {
            if ([9].includes(Number(item.dilig_cd))) {
              !haveSomething && setHaveSomething(true);
              return true;
            }
          }) && <div className="h-full flex-1 bg-yellow-500" /> //phép năm
        }
        {props.data.data.some((item) => {
          if ([5, 19, 20].includes(Number(item.dilig_cd))) {
            !haveSomething && setHaveSomething(true);
            return true;
          }
        }) && <div className="h-full flex-1 bg-red-600" />}
        {props.data.data.some((item) => {
          if ([13].includes(Number(item.dilig_cd))) {
            !haveSomething && setHaveSomething(true);
            return true;
          }
        }) && <div className="h-full flex-1 bg-pink-500" />}
        {props.data.data.some((item) => {
          if ([14].includes(Number(item.dilig_cd))) {
            !haveSomething && setHaveSomething(true);
            return true;
          }
        }) && <div className="h-full flex-1 bg-indigo-500" />}
      </div>
    </div>
  );
};
