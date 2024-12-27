import * as React from "react";
import PayItem from "../components/payItem";
import { use } from "i18next";
import { useTranslation } from "react-i18next";
import { WorkData } from "../interface";
import { Empty, Skeleton } from "antd";

export interface IPayDetailProps {
  wageData?: WorkData;
  isLoading: boolean;
}

const mapWorkData = {
  A01: "01",
  A21: "21",
  A31: "31",
  A32: "32",
  A55: "55",
  A81: "81",
};

export default function PayDetail({ wageData, isLoading }: IPayDetailProps) {
  const mergeData = React.useMemo(() => {
    if (!wageData) return [];
    const temp = wageData.Table?.map((item, index) => {
      const diligItem =
        wageData.Table1.find(
          // (dilig) => dilig.DILIG_CD === mapWorkData?.[item.ALLOW_CD],
          (dilig) => "A" + dilig.DILIG_CD === item.ALLOW_CD,
        ) || {};
      return { ...item, ...diligItem };
    });

    return temp;
  }, [wageData]);
  const { t } = useTranslation();
  return (
    <div className="mt-8">
      <p className="font-medium text-gray-700">{t("wage.payDetail")}</p>
      <div className="mt-4 flex flex-col gap-3">
        {isLoading ? (
          <Skeleton active />
        ) : mergeData?.length ? (
          mergeData.map((item) => {
            return (
              <PayItem
                key={item.ALLOW_CD}
                name={item.ALLOW_NM}
                time={`${item?.DILIG_HH ? item?.DILIG_HH + "H" : ""}${item?.DILIG_MM ? item?.DILIG_MM + "M" : ""}`}
                value={item.ALLOW}
              />
            );
          })
        ) : (
          <Empty description={t("common.noData")} />
        )}
        {/* <PayItem name={t("wage.label.T1")} time="8H" value={6300000} />
        <PayItem name={t("wage.label.T2")} time="12H30" value={123124} />
        <PayItem name={t("wage.label.T3")} time="12H30" value={124312354} />
        <PayItem name={t("wage.label.T4")} time="12H30" value={345345} />
        <PayItem name={t("wage.label.T5")} time="12H30" value={45645} />
        <PayItem name={t("wage.label.T6")} time="12H30" value={23423} />
        <PayItem name={t("wage.label.T7")} time="12H30" value={43634524} />
        <PayItem name={t("wage.label.T8")} time="12H30" value={234234} />
        <PayItem name={t("wage.label.T9")} time="12H30" value={6767} />
        <PayItem name={t("wage.label.T10")} time="12H30" value={78678} />
        <PayItem name={t("wage.label.T11")} time="12H30" value={90678} />
        <PayItem name={t("wage.label.T12")} time="12H30" value={456456} />
        <PayItem name={t("wage.label.T13")} time="12H30" value={234245324} />
        <PayItem name={t("wage.label.T14")} time="12H30" value={4534634} /> */}
      </div>
      {/* <PayItem name="" time="12H30" value={12345678} /> */}
      {/* <PayItem name="P/C tăng ca CN" time="12H30" value={12345678} /> */}
    </div>
  );
}
