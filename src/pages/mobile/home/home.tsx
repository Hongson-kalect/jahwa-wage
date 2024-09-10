import { useQuery } from "@tanstack/react-query";
import dayjs, { Dayjs } from "dayjs";
import * as React from "react";
import { MobileAppWrapper } from "../../../components/mobile/appWrapper";
import { useUserInfoStore } from "../../../store/userinfo";
import Content from "./components/content";
import HomeHeader from "./components/header";
import { WorkList, WorkType } from "./interface";
import { calDateValue, getWorkData } from "./utils";

export interface IMobileHomePageProps {}

export default function MobileHomePage(props: IMobileHomePageProps) {
  const [date, setDate] = React.useState<Dayjs>(
    dayjs(new Date().toISOString(), "YYYY-MM-DD"),
  );
  const { user } = useUserInfoStore();
  const [workData, setWorkData] = React.useState<
    { date: string; data: WorkType[]; shift: string }[]
  >([]);

  const workQuery = useQuery<WorkList>({
    queryFn: () =>
      getWorkData(
        user?.EMP_NO || "",
        date.year() +
          "-" +
          (date.month() < 9
            ? "0" + (date.month() + 1)
            : (date.month() + 1).toString()),
      ),
    queryKey: [date, "workData"],
  });

  React.useEffect(() => {
    if (workQuery.data?.work?.length) {
      const workDates = workQuery.data.work;
      const workShifts = workQuery.data.shift;
      const sortArray: { date: string; shift: string; data: WorkType[] }[] = [];
      workDates.map((work) => {
        //get work shift
        let workShift = "1";
        workShifts.map((shift) => {
          if (calDateValue(shift.chang_dt) <= calDateValue(work.check_date))
            workShift = shift.wk_type;
          else return;
        });

        let matchDate = sortArray.find((item) => {
          return item.date === work.check_date;
        });
        if (!matchDate) {
          matchDate = {
            date: work.check_date,
            shift: workShift,
            data: [],
          };
          sortArray.push(matchDate);
        }
        matchDate.data.push(work);
      });
      return setWorkData(sortArray);
    }
    setWorkData([]);
  }, [workQuery.data]);
  return (
    <div
      className="overflow-auto dark:bg-gray-700"
      style={{ height: "calc(100dvh - 40px)" }}
    >
      {/* {workQuery.isLoading && <HamsterLoading />} */}
      {/* {workQuery.isLoading && <div>Ko cso dũ lieu</div>} */}
      <MobileAppWrapper>
        <HomeHeader />
        <Content date={date} setDate={setDate} workData={workData} />
      </MobileAppWrapper>
    </div>
  );
}
