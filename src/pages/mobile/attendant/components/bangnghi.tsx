import * as React from "react";
import { OffDate } from "../ui/interface";
import { Empty } from "antd";
import { useTranslation } from "react-i18next";

export interface IBangNghiProps {
  list: OffDate[];
}

export default function BangNghi({ list }: IBangNghiProps) {
  const { t } = useTranslation();
  const renderList = React.useMemo(() => {
    return list?.length ? [...list].reverse() : [];
  }, [list]);

  console.log("renderList :>> ", renderList);

  if (list?.length === 0) return <Empty description={t("common.noData")} />;
  return (
    <div className="mx-2 mt-2 rounded-lg bg-white text-center">
      <table className="w-full text-center">
        <tbody className="w-full">
          <tr
            className="rounded-t-xl text-blue-700"
            style={{ borderBottom: "1px solid red" }}
          >
            <th className="font-font px-2 py-1.5 text-sm">
              {t("attendantPage.index")}
            </th>
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
              return (
                <tr
                  key={index}
                  className={`${item.DILIG_HH < 8 ? "bg-gray-100" : ""}`}
                >
                  <td className="text-xs font-bold text-gray-600">
                    {index + 1}
                  </td>
                  <td className="py-2 text-sm">
                    <div className="flex items-center justify-center">
                      <div
                        className={`flex h-6 w-12 items-center justify-center rounded-full`}
                      >
                        {item.DILIG_DT.slice(5, 10).replaceAll("-", "/")}
                      </div>
                    </div>
                  </td>

                  <td className="font-medium text-gray-800">
                    <div className="flex items-center justify-center">
                      <div className={`h-6 w-8 text-center`}>
                        {item.DILIG_HH}
                      </div>
                    </div>
                  </td>

                  <td className="text-sm">{item.REMARK}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
