import * as React from "react";
import { UnderLineSelect } from "../../../../components/common/select";
import { FaCalendar } from "react-icons/fa";
import { Button, DatePicker } from "antd";
import { MdOutlineContentPasteSearch } from "react-icons/md";
import { useTranslation } from "react-i18next";
import styled from "styled-components";
import Calendar from "react-calendar";
import { WorkType } from "../../home/interface";
import { getWorkData } from "../../home/utils";

export interface IMobileHomeCalendarProps {
  workData: { date: string; data: WorkType[]; shift: string }[];
}

const DayDetailTable = styled.table`
  margin-top: 4px;
  td {
    /* color: #5e5e5e; */
    padding: 0px 4px;
    font-size: 14px;

    &:first-child {
      font-weight: bold;
    }
  }
`;

const StyledCalendar = styled(Calendar)`
  /* margin-top: 8px; */
  border-radius: 20px;
  outline: none !important;
  overflow: hidden;
  width: 100%;
  border: 1px solid #828282;
  padding: 2px 0px;
  .react-calendar__month-view__weekdays__weekday {
    padding: 8px 0;
    background-color: #c1eaff;
    text-align: center;
    & * {
      text-decoration: none;

      font-size: 14px !important;
    }
    &:first-child {
      border-top-left-radius: 20px;
    }
    &:nth-child(6) {
      /* color: #e2850b;
      background-color: #ffe9c0; */
    }
    &:last-child {
      /* color: red;
      background-color: #f3d294; */
      border-top-right-radius: 20px;
    }
  }

  .react-calendar__viewContainer {
    margin-top: -2px;
    flex: 1;
    .react-calendar__month-view {
      height: 100%;

      & > div:last-child {
        height: 100%;
        & > div:last-child {
          height: 100%;
          display: flex;
          flex-direction: column;
          & > div:last-child {
            flex: 1;
            button {
              padding: 6px 4px !important;
              font-size: 14px;
              border: 0.5px solid #e6e6e6;
              background-color: transparent;
              transition: all 0.3s linear;
              &.react-calendar__month-view__days__day--weekend {
                background-color: #ffe9c0;
                color: #e2850b;
                /* background-color: red; */
              }
              &.react-calendar__tile--active {
                border-radius: 4px;
                background-color: #487acb !important;
                color: white !important;
              }
            }
          }
        }
      }
    }
  }

  /* height: 250px; */
  .react-calendar__month-view__weekNumbers {
    /* hide week number */
    display: none !important;
  }
  .react-calendar__tile {
    padding: 2px !important;
  }
  .react-calendar__navigation {
    margin: 0;
    height: 16%;
  }
`;

export default function MobileHomeCalendar(props: IMobileHomeCalendarProps) {
  const { t } = useTranslation();
  const [calendarValue, setCalendarValue] = React.useState(new Date()); //calendarValue
  const [bonus, setBonus] = React.useState<
    { id: number; name: string; time: number }[]
  >([]);

  const onCalendarChange = (date: Date | null) => {
    console.log("date", date);
    date && setCalendarValue(date);
  };

  React.useEffect(() => {
    if (props.workData.length && props.workData[0]?.date) {
      console.log(
        "qqqq",
        props.workData[0]?.date,
        calendarValue,
        new Date(props.workData[0]?.date),
      );
      setCalendarValue(new Date(props.workData[0]?.date));
    }
  }, [props.workData]);

  // React.useEffect(() => {

  //   const tempBonus: { date:string, id: number[]; name: string; time: number }[] = [];
  //   props.workData?.map((work) => {

  //     work.data.map((dayDetail) => {
  //       if (dayDetail.dilig_cd) {
  //         let matchBonus = tempBonus.find(
  //           (item) => item.id === Number(dayDetail.dilig_cd),
  //         );
  //         if (!matchBonus) {
  //           matchBonus = {
  //             id: Number(dayDetail.dilig_cd),
  //             name: dayDetail.dilig_nm || "unknown",
  //             time: 0,
  //           };
  //           tempBonus.push(matchBonus);
  //         }
  //         matchBonus.time +=
  //           Number(dayDetail.dilig_hh) * 60 + Number(dayDetail.dilig_mm);
  //       }
  //     });
  //   });
  //   setBonus(tempBonus);
  // }, [props.workData]);

  console.log("calendar list", props.workData);
  return (
    <div>
      <p className="text-sm font-medium">Bảng công</p>
      <div className="flex flex-col items-center px-2 py-1">
        <StyledCalendar
          className="shadow-md shadow-gray-500 dark:[&_*]:text-gray-100"
          showNeighboringMonth={false}
          tileClassName={({ date }) => {
            console.log(date);
            if (date.getDay() === 0) return "bg-orange-200 text-error";
          }}
          // calendarType="islamic"
          tileContent={({ date, view }: { date: Date; view: string }) => {
            const day = date.getDate();
            return (
              <CalendarMark
                date={day}
                data={props.workData.find(
                  (item) => new Date(item.date).getDate() === day,
                )}
              />
            );
          }}
          onChange={(props) => onCalendarChange(props)}
          activeStartDate={calendarValue}
          showNavigation={false}
          showWeekNumbers={false}
          value={calendarValue}
        />
        <p className="mt-4 w-full pb-1 text-left text-xs text-gray-500 underline">
          Chú thích
        </p>
        <div className="flex w-full flex-wrap items-center gap-y-1">
          <div className="flex w-1/3 flex-col items-center justify-center px-2 text-center">
            <div className="h-1 w-6 bg-green-400"></div>
            <p style={{ fontSize: "10px" }} className="mb-1 text-green-400">
              {t("work.normal")}
            </p>
          </div>

          <div className="flex w-1/3 flex-col items-center justify-center px-2 text-center">
            {" "}
            <div className="h-1 w-6 bg-cyan-600"></div>
            <p style={{ fontSize: "10px" }} className="mb-1 text-cyan-600">
              {t("work.overtime")}
            </p>
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center px-2 text-center">
            {" "}
            <div className="h-1 w-6 bg-red-600"></div>
            <p style={{ fontSize: "10px" }} className="mb-1 text-red-600">
              {t("work.offNoP")}
            </p>
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center px-2 text-center">
            {" "}
            <div className="h-1 w-6 bg-orange-500"></div>
            <p style={{ fontSize: "10px" }} className="mb-1 text-orange-500">
              {t("work.offP")}
            </p>
          </div>

          <div className="flex w-1/3 flex-col items-center justify-center px-2 text-center">
            {" "}
            <div className="h-1 w-6 bg-yellow-500"></div>
            <p style={{ fontSize: "10px" }} className="mb-1 text-yellow-500">
              {t("work.offhalf")}
            </p>
          </div>

          <div className="flex w-1/3 flex-col items-center justify-center px-2 text-center">
            <div className="h-1 w-6 bg-pink-500"></div>
            <p style={{ fontSize: "10px" }} className="mb-1 text-pink-500">
              {t("work.comeLate")}
            </p>
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center px-2 text-center">
            {" "}
            <div className="h-1 w-6 bg-purple-500"></div>
            <p style={{ fontSize: "10px" }} className="mb-1 text-purple-500">
              {t("work.leaveSoon")}
            </p>
          </div>
          <div className="flex w-1/3 flex-col items-center justify-center px-2 text-center">
            {" "}
            <div className="h-1 w-6 bg-transparent shadow shadow-primary-8"></div>
            <p style={{ fontSize: "10px" }} className="text-xs text-primary-8">
              {t("work.nightShift")}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-2 flex-1 rounded-xl bg-[#fff6b2] py-1 shadow shadow-gray-400">
        <div className="border px-2 py-1">
          <p className="text-xs dark:text-gray-300">{t("work.dayDetail")}:</p>
          <div className="flex flex-col gap-2.5 p-2 font-[auto] [&_.col]:-mb-0.5">
            <DayDetail
              date={calendarValue.getDate()}
              data={props.workData.find(
                (item) =>
                  new Date(item.date).getDate() === calendarValue.getDate(),
              )}
            />
          </div>

          {/* <div className="px-1">
            <DayDetailTable className="text-gray-700 dark:text-gray-300">
              <tbody>
                <tr>
                  <td>{t("work.start")}:</td>
                  <td>8:14:16</td>
                </tr>
                <tr>
                  <td>{t("work.finish")}:</td>
                  <td>17:51:14</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </DayDetailTable>
          </div> */}
        </div>
      </div>
    </div>
  );
}

type CalendarMarkProps = {
  date: number;
  data?: {
    date: string;
    data: WorkType[];
    shift: string;
  };
};

const CalendarMark = (props: CalendarMarkProps) => {
  const [haveSomething, setHaveSomething] = React.useState(false);
  if (!props.data) return <div></div>;

  return (
    <div className="flex w-full items-center justify-center">
      <div
        className={`h-1 w-full bg-transparent shadow ${Number(props?.data?.shift) === 2 ? "flex shadow-primary-8" : ""}`}
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
          if ([5].includes(Number(item.dilig_cd))) {
            !haveSomething && setHaveSomething(true);
            return true;
          }
        }) && <div className="h-full flex-1 bg-red-600" />}
      </div>
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
      }) && <div className="h-full flex-1 bg-purple-500" />}
    </div>
  );
};

type DayDetailProps = {
  date: number;
  data?: {
    date: string;
    data: WorkType[];
    shift: string;
  };
};

const DayDetail = (props: DayDetailProps) => {
  const [haveSomething, setHaveSomething] = React.useState(false);
  // if (!props.data) return <div></div>;

  return (
    <div className="flex w-full items-center justify-center">
      {props.data?.data?.length ? (
        <div className="w-full">
          <div className="row flex" style={{ borderBottom: "1px solid gray" }}>
            <div className="col w-1/2 px-1 text-sm">
              Ca làm: {Number(props.data.shift) === 2 ? "Đêm" : "Ngày"}
            </div>
            <div className="col w-1/2 px-1 text-sm">
              Giờ về: {props.data.data?.[0]?.check_time || "Không rõ"}
            </div>
          </div>
          {props.data.data.map((item, index, arr) => {
            if (item.dilig_cd)
              return (
                <div
                  key={index}
                  className="row flex pt-1"
                  style={{ borderBottom: "1px solid gray" }}
                >
                  <div className="col w-full px-1 text-sm">
                    {item.dilig_nm + ": "}
                    {Number(item.dilig_hh)
                      ? Number(item.dilig_hh) + " giờ "
                      : ""}
                    {Number(item.dilig_mm)
                      ? Number(item.dilig_mm) + " phút"
                      : ""}
                  </div>
                  {/* <div className="col w-1/2 px-1 text-sm">
                    {arr[index + 1] && item.dilig_nm}:{" "}
                    {Number(arr[index + 1].dilig_hh)
                      ? Number(arr[index + 1].dilig_hh) + " giờ "
                      : ""}
                    {Number(arr[index + 1].dilig_mm)
                      ? Number(arr[index + 1].dilig_mm) + " phút"
                      : ""}
                  </div> */}
                </div>
              );
            return;
          })}
        </div>
      ) : (
        <div
          className="row flex w-full"
          style={{ borderBottom: "1px solid gray" }}
        >
          <div className="col w-full px-1 text-sm">
            Không có thông tin gì đặc sắc
          </div>
        </div>
        // <div></div>
      )}
    </div>
  );
};
