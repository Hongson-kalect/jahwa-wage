import * as React from "react";
import { Attendance } from "../../../attendant/ui/interface";
import Heading1 from "../_shared/heading1";
import { Skeleton } from "antd";
import { useSearch } from "../../../../../hooks/useSearch";
import { useTranslation } from "react-i18next";
import { AttendanceItem } from "../../../attendant/components/bangcong";

// const AttendanceItem = ({ item }: { item: Attendance }) => {
//   return (
//     <tr className="">
//       <td className="py-0.5">
//         <p className="flex items-center justify-center rounded-[50%] py-0.5 text-[11px] font-bold text-gray-500 shadow shadow-indigo-50">
//           {item.WEEK_DAY}
//         </p>
//       </td>
//       <td className="py-0.5 text-center text-sm text-gray-500">{item.DATE}</td>
//       <td className="py-0.5 text-center text-sm text-gray-500">
//         {item.STRT_TIME}
//       </td>
//       <td className="py-0.5 text-right font-bold text-gray-700 opacity-80">
//         {item.END_TIME}
//       </td>
//     </tr>
//   );
// };

export interface IAttendancesProps {
  attendance?: { Table: Attendance[] };
}

export default function Attendances({ attendance }: IAttendancesProps) {
  const { t } = useTranslation();
  const [paramsObject, setSearchParams] = useSearch();
  const showItem = React.useMemo(() => {
    if (!attendance?.Table) return undefined;
    let count = 0;
    const tempAttendance: Attendance[] = [];
    [...attendance.Table].map((item) => {
      if (item.END_TIME) {
        if (count < 5) {
          count++;
          tempAttendance.push(item);
        }
      }
    });

    return tempAttendance;
  }, [attendance]);
  return (
    <div className="rounded-xl bg-white p-2">
      <div></div>

      <div className="">
        {!showItem ? (
          <Skeleton active />
        ) : !showItem.length ? (
          <div>Không có lịch chấm công</div>
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
                return <AttendanceItem item={item} key={index} />;
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
