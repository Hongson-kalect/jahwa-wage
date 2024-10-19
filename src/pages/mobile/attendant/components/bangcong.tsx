import { t } from "i18next";
import * as React from "react";

export interface IBangCongProps {}

export default function BangCong(props: IBangCongProps) {
  return (
    <div className="mt-2 text-center">
      <table className="w-full text-center">
        <tbody className="w-full">
          <tr
            className="rounded-t-xl text-blue-800"
            style={{ borderBottom: "1px solid red" }}
          >
            <th className="px-2 py-1.5 text-sm font-medium italic">
              {t("common.weekDate")}
            </th>
            <th className="px-2 py-1.5 text-sm font-medium italic">
              {t("common.date")}
            </th>
            <th className="px-2 py-1.5 text-sm font-medium italic">
              {t("work.timeIn")}
            </th>
            <th className="px-2 py-1.5 text-sm font-medium italic">
              {t("work.timeOut")}
            </th>
            {/* <th></th> */}
          </tr>

          <tr style={{ borderBottom: "1px solid red" }}>
            <td style={{ borderBottom: "1px solid #eee" }} className="py-1">
              <div className="flex items-center justify-center">
                <div className="flex h-6 w-8 items-center justify-center rounded-full bg-blue-500 text-white">
                  {t("common.d2")}
                </div>
              </div>
            </td>
            <td style={{ borderBottom: "1px solid #eee" }}>
              <div className="flex items-center justify-center">
                <div className="h-6 w-8 text-center">12</div>
              </div>
            </td>
            <td style={{ borderBottom: "1px solid #eee" }}>8:00:00</td>
            <td style={{ borderBottom: "1px solid #eee" }}>17:20:33</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
