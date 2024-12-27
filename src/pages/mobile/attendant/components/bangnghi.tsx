import * as React from "react";
import { OffDate } from "../ui/interface";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";

export interface IBangNghiProps {
  list: OffDate[];
}

export const DayOffItem = (props: { item: OffDate }) => {
  const { item } = props;
  return (
    <tr className={`${item.DILIG_HH < 8 ? "bg-gray-100" : ""}`}>
      <td className="py-2 text-sm">
        <div className="flex items-center justify-center">
          <div
            className={`flex h-6 w-9 items-center justify-center rounded-full text-base text-gray-700`}
          >
            {item.DILIG_DT.slice(8, 10)}
            <span className="text-xs text-gray-300">
              /{item.DILIG_DT.slice(5, 7)}
            </span>
          </div>
        </div>
      </td>

      <td className="font-medium text-gray-600">
        <div className="flex items-center justify-center">
          <div className={`h-6 w-8 text-center`}>
            {item.DILIG_HH}
            <span className="font-normal text-gray-400">H</span>
          </div>
        </div>
      </td>

      <td className="text-sm text-gray-500">{item.REMARK}</td>
    </tr>
  );
};

export default function BangNghi({ list }: IBangNghiProps) {
  const { t } = useTranslation();
  const renderList = React.useMemo(() => {
    return list?.length ? [...list].reverse() : [];
  }, [list]);

  if (list?.length === 0) return <Empty description={t("common.noData")} />;
  return (
    <div className="rounded-lg bg-white text-center">
      <table className="w-full text-center">
        <tbody className="w-full">
          <tr
            className="rounded-t-xl text-gray-700"
            style={{ borderBottom: "1px solid red" }}
          >
            <th className="font-font px-2 py-1.5 text-sm">
              {/* {t("Lo")} */}
              {t("attendantPage.date")}
            </th>
            <th className="font-font px-2 py-1.5 text-sm">
              {t("attendantPage.hour")}
            </th>
            <th className="font-font px-2 py-1.5 text-sm">
              {t("attendantPage.note")}
            </th>
            {/* <th></th> */}
          </tr>
          {renderList?.length &&
            renderList.map((item, index) => {
              return <DayOffItem key={index} item={item} />;
            })}
        </tbody>
      </table>
    </div>
  );
}
