import * as React from "react";
import PayItem from "../components/payItem";
import { use } from "i18next";
import { useTranslation } from "react-i18next";

export interface IPayDetailProps {}

export default function PayDetail(props: IPayDetailProps) {
  const { t } = useTranslation();
  return (
    <div className="mt-8">
      <p className="font-medium text-gray-700">{t("wage.payDetail")}</p>
      <div className="mt-4 flex flex-col gap-3">
        <PayItem name={t("wage.label.T1")} time="8H" value={6300000} />
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
        <PayItem name={t("wage.label.T14")} time="12H30" value={4534634} />
      </div>
      {/* <PayItem name="" time="12H30" value={12345678} /> */}
      {/* <PayItem name="P/C tăng ca CN" time="12H30" value={12345678} /> */}
    </div>
  );
}
