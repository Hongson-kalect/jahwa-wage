import * as React from "react";
import PayItem from "../components/payItem";
import { useTranslation } from "react-i18next";

export interface IDeDuctDetailProps {}

export default function DeDuctDetail(props: IDeDuctDetailProps) {
  const { t } = useTranslation();
  return (
    <div className="mt-8">
      <p className="font-medium text-red-700">{t("wage.deductDetail")}</p>
      <div className="mt-4 flex flex-col gap-3">
        <PayItem isDeDuct name={t("wage.label.T1")} time="8H" value={6300000} />
        <PayItem
          isDeDuct
          name={t("wage.label.T2")}
          time="12H30"
          value={123124}
        />
        <PayItem
          isDeDuct
          name={t("wage.label.T3")}
          time="12H30"
          value={124312354}
        />
        <PayItem
          isDeDuct
          name={t("wage.label.T4")}
          time="12H30"
          value={345345}
        />
        <PayItem
          isDeDuct
          name={t("wage.label.T5")}
          time="12H30"
          value={45645}
        />
        <PayItem
          isDeDuct
          name={t("wage.label.T6")}
          time="12H30"
          value={23423}
        />
      </div>
    </div>
  );
}
