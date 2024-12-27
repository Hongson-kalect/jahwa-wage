import * as React from "react";
import PayItem from "../components/payItem";
import { useTranslation } from "react-i18next";
import { WorkData } from "../interface";
import { Empty, Skeleton } from "antd";

export interface IDeDuctDetailProps {
  wageData?: WorkData;
  isLoading?: boolean;
}

export default function DeDuctDetail({
  wageData,
  isLoading,
}: IDeDuctDetailProps) {
  const { t } = useTranslation();

  const mergeData = React.useMemo(() => {
    if (!wageData) return [];
    const temp = wageData.Table2?.map((item, index) => {
      const diligItem =
        wageData.Table1.find(
          // (dilig) => dilig.DILIG_CD === mapWorkData?.[item.ALLOW_CD],
          (dilig) => "A" + dilig.DILIG_CD === item.SUB_CD,
        ) || {};
      return { ...item, ...diligItem };
    });

    return temp;
  }, [wageData]);

  return (
    <div className="mt-8">
      <p className="font-medium text-red-700">{t("wage.deductDetail")}</p>
      <div className="mt-4 flex flex-col gap-3">
        {isLoading ? (
          <Skeleton active />
        ) : mergeData?.length ? (
          mergeData?.map((item) => {
            return (
              <PayItem
                isDeDuct
                key={item.SUB_CD}
                name={item.SUB_NM}
                time={`${item?.DILIG_HH ? item?.DILIG_HH + "H" : ""}${item?.DILIG_MM ? item?.DILIG_MM + "M" : ""}`}
                value={item.SUB_AMT}
              />
            );
          })
        ) : (
          <Empty description={t("common.noData")} />
        )}
      </div>
    </div>
  );
}
