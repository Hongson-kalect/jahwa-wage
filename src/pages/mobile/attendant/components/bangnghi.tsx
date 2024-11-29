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
            className="rounded-t-xl text-blue-800"
            style={{ borderBottom: "1px solid red" }}
          >
            <th className="px-2 py-1.5 text-sm font-medium italic">Stt</th>
            <th className="px-2 py-1.5 text-sm font-medium italic">
              {/* {t("Lo")} */}
              {t("common.date")}
            </th>
            <th className="px-2 py-1.5 text-sm font-medium italic">Giờ</th>
            <th className="px-2 py-1.5 text-sm font-medium italic">
              {/* {t("work.timeOut")} */}
              Ghi chú
            </th>
            {/* <th></th> */}
          </tr>
          {renderList?.length &&
            renderList.map((item, index) => {
              return (
                <tr
                  key={index}
                  className={`${item.DILIG_HH < 8 ? "bg-red-200" : ""}`}
                >
                  <td className="text-xs font-bold italic text-gray-600">
                    {index + 1}
                  </td>
                  <td
                    style={{ borderBottom: "1px solid #eee" }}
                    className="py-2 text-sm"
                  >
                    <div className="flex items-center justify-center">
                      <div
                        className={`flex h-6 w-12 items-center justify-center rounded-full`}
                      >
                        {item.DILIG_DT.slice(5, 10).replaceAll("-", "/")}
                      </div>
                    </div>
                  </td>
                  {/* <td style={{ borderBottom: "1px solid #eee" }}>
                    <div className="flex items-center justify-center">
                      <div className={`h-6 w-8 text-center`}>
                        {item.DILIG_NM}
                      </div>
                    </div>
                  </td> */}
                  <td
                    style={{ borderBottom: "1px solid #eee" }}
                    className="font-semibold text-red-400"
                  >
                    <div className="flex items-center justify-center">
                      <div className={`h-6 w-8 text-center`}>
                        {item.DILIG_HH}
                      </div>
                    </div>
                  </td>

                  <td
                    style={{ borderBottom: "1px solid #eee" }}
                    className="text-sm"
                  >
                    {item.REMARK}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
