import { Col, DatePicker, Row } from "antd";
import * as React from "react";
import { useTranslation } from "react-i18next";
import {
  getTotalWay,
  getWageData,
  getYearWage,
  minus,
  numberToCurrency,
  payFor,
} from "./utils";
import styled from "styled-components";
import MobileWageContent from "./components/content";
import MobileWageHeader from "./components/header";
import { DatePickerType } from "antd/es/date-picker";
import { parse } from "date-fns";
import dayjs from "dayjs";
import { MobileAppWrapper } from "../../../components/mobile/appWrapper";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useUserInfoStore } from "../../../store/userinfo";

export interface IMobileWageProps {}

export default function MobileWagePage() {
  const { t } = useTranslation();

  const [showType, setShowType] = React.useState<unknown>("month");
  const [date, setDate] = React.useState(dayjs("2000-01-22", "YYYY-MM-DD"));
  const { user } = useUserInfoStore();
  console.log("qqqqqq", user);

  const monthWay = useQuery({
    queryFn: () => {
      if (user.EMP_NO)
        return getWageData(user.EMP_NO, date.format("YYYY-MM-DD"));
      else return { error: "no emp_no found" };
    },
    queryKey: ["monthwage", date, user.EMP_NO || "EMP_NO"],
    // placeholderData: keepPreviousData,
  });

  const yearWay = useQuery({
    queryFn: () => {
      if (user.EMP_NO)
        return getYearWage(user.EMP_NO, date.format("YYYY-MM-DD"));
      else return { error: "no emp_no found" };
    },
    queryKey: ["total-wage", showType, date, user.EMP_NO || "EMP_NO"],
    // placeholderData: keepPreviousData,
  });

  React.useEffect(() => {
    const date = monthWay.data?.total?.pay_yymm;
    console.log("object", date);
    // if (date) setDate(dayjs(`${date.slice(4, 6)}-01-${date.slice(0, 4)}`));

    if (date) {
      console.log(
        "object",
        `${date.slice(0, 4)}-${date.slice(4, 6)}-01`,
        "YYYY-MM-DD",
      );
      setDate(
        dayjs(`${date.slice(0, 4)}-${date.slice(4, 6)}-01`, "YYYY-MM-DD"),
      );
    }
  }, [monthWay.data?.total?.pay_yymm]);

  console.log("monthWay", monthWay);

  return (
    <MobileAppWrapper>
      <MobileWageHeader
        payDate={monthWay.data?.total?.prov_dt || "Chưa có"}
        wageType={showType}
        setWageType={setShowType}
        date={date}
        setDate={setDate}
      />
      <MobileWageContent
        wageType={showType}
        monthWage={monthWay.data}
        yearWage={yearWay.data}
        isLoading={monthWay.isLoading}
      />
      {/* {monthWay.isLoading && <HamsterLoading />} */}
    </MobileAppWrapper>
  );
}

const StyledStatistic = styled.div`
  font-size: 0.625rem;
  .title {
    font-size: 1.4em;
  }
  .content {
    font-size: 1.4em;
  }
  span {
    font-size: 0.9em;
  }
`;

function Statistic(props: IStatisticProps) {
  return (
    <StyledStatistic className={props.className} style={props.style}>
      <div
        className={`title ${
          props.type === "primary"
            ? "from-black to-purple-500"
            : props.type === "error"
              ? "from-purple-800 to-red-800"
              : "from-black to-black"
        } bg-gradient-to-r bg-clip-text font-bold text-transparent`}
      >
        {props.title}
      </div>
      <div className="content px-3 text-sm text-gray-700">{props.content}</div>
    </StyledStatistic>
  );
}
