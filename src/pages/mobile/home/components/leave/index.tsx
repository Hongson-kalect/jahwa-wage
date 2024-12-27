import * as React from "react";
import { OffDate, OffHour, OffInfo } from "../../../attendant/ui/interface";
import Heading1 from "../_shared/heading1";
import { Empty, Skeleton } from "antd";
import { useSearch } from "../../../../../hooks/useSearch";
import { useTranslation } from "react-i18next";
import { DayOffItem } from "../../../attendant/components/bangnghi";

// const LeaveItem = ({ item }: { item: OffDate }) => {
//   return (
//     <tr className="">
//       <td className="py-0.5">
//         <p className="py-0.5 text-sm text-gray-500">{item.DILIG_DT}</p>
//       </td>
//       {/* <td className="py-0.5 text-center text-sm">{item.DILIG_NM}</td> */}
//       <td className="py-0.5 text-center font-bold text-gray-500 opacity-80">
//         {item.DILIG_HH}
//       </td>
//       <td className="py-0.5 text-right text-sm text-gray-500">{item.REMARK}</td>
//     </tr>
//   );
// };

export interface ILeaveProps {
  leave: {
    Table: [OffInfo];
    Table1: [OffHour];
    Table2: OffDate[];
  };
}

export default function Leave({ leave }: ILeaveProps) {
  const { t } = useTranslation();
  const [paramsObject, setSearchParams] = useSearch();

  const showItem = React.useMemo(() => {
    if (!leave) return undefined;
    let count = 0;
    const tempAttendance: OffDate[] = [];
    leave.Table2.map((item) => {
      if (item.DILIG_DT) {
        if (count < 5) {
          count++;
          tempAttendance.unshift(item);
        }
      }
    });

    return tempAttendance;
  }, [leave]);

  return (
    <div onClick={() => setSearchParams({ tab: "day-off" })}>
      <Heading1 title={t("homePage.dayOff")} />

      <div className="py-3">
        {!showItem ? (
          <Skeleton active />
        ) : !showItem.length ? (
          <Empty description={t("common.noData")} />
        ) : (
          <table className="w-full">
            {/* <thead>
              <tr className="text-left font-normal">
                <th>Ngày</th>
                <th>Giờ vào</th>
                <th>Giờ ra</th>
              </tr>
            </thead> */}
            <tbody className="text-center">
              {showItem.map((item, index) => {
                return <DayOffItem item={item} key={index} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
