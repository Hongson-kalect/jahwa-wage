import * as React from "react";
import { WorkData } from "../../../wage-1/interface";
import Heading1 from "../_shared/heading1";
import { useSearch } from "../../../../../hooks/useSearch";
import { Empty, Skeleton } from "antd";
import { useTranslation } from "react-i18next";

const WageItem = ({
  title,
  value,
  isBold,
}: {
  title: React.ReactNode;
  value: React.ReactNode;
  isBold?: boolean;
}) => {
  return (
    <div
      className={`flex items-center justify-between gap-2 py-1.5 text-gray-500 ${isBold ? "font-bold !text-gray-500" : ""}`}
    >
      <div>{title}</div>
      <div>{value}</div>
    </div>
  );
};

export interface IWageProps {
  wage: WorkData;
  month: string;
}

export default function Wage({ wage, month }: IWageProps) {
  const { t } = useTranslation();
  const [paramsObject, setSearchParams] = useSearch();

  return (
    <div onClick={() => setSearchParams({ tab: "wage" })}>
      <div className="flex items-center gap-2">
        <Heading1 title={t("homePage.wage")} />
        <div className="mt-4 text-gray-500">
          {" - " +
            (!month ? "####" : month.slice(4, 6) + "/" + month.slice(0, 4))}
        </div>
      </div>
      <div className="px-5 py-3">
        {!wage ? (
          <Skeleton active />
        ) : !wage.Table3?.length ? (
          <Empty description={t("common.noData")} />
        ) : (
          <>
            <WageItem
              title={t("common.totalPay")}
              value={wage.Table3?.[0]?.PROV_TOT_AMT}
            />
            <WageItem
              title={t("common.totalDeduct")}
              value={wage.Table3?.[0]?.SUB_TOT_AMT}
            />
            <WageItem
              isBold
              title={<p className="font-bold">{t("common.totalPayment")}</p>}
              value={wage.Table3?.[0]?.REAL_PROV_AMT}
            />
          </>
        )}
      </div>
    </div>
  );
}
