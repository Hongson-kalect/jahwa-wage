import * as React from "react";
import { useUserInfoStore } from "../../../store/userinfo";
import { useMobileAppStore } from "../../../store/mobile.app";
import { useTranslation } from "react-i18next";
import { getRawCookie } from "../../../lib/utlis";

export interface IInformationProps {}

export default function Information(props: IInformationProps) {
  const { user } = useUserInfoStore();
  const { t } = useTranslation();
  const { setHeader, entCode } = useMobileAppStore();

  React.useEffect(() => {
    setHeader(t("infomationPage.title"));
  }, [t]);

  const cookiesInfo = React.useMemo(() => {
    const cookies = getRawCookie("JHInfo");
    return decodeURIComponent(cookies || "").split("♪");
  }, []);

  const Item = ({ title, content }: { title: string; content: string }) => {
    return (
      <div className="flex items-start gap-2 py-2">
        <p className="w-1/3 text-gray-400">{title} </p>
        {/* <p className="mr-4 text-gray-400">:</p> */}
        <p className="w-2/3 text-gray-500"> {content}</p>
      </div>
    );
  };

  return (
    <div className="pl-10 pr-4">
      <Item
        title={t("infomationPage.company")}
        content={cookiesInfo[0] || "-"}
      />
      <Item title={t("infomationPage.role")} content={cookiesInfo[1] || "-"} />
      <Item title={t("infomationPage.emp")} content={user?.EMP_NO || "-"} />
      <Item title={t("infomationPage.name")} content={user?.NAME || "-"} />
      <Item
        title={t("infomationPage.krName")}
        content={user?.HANJA_NAME || "-"}
      />
      <Item
        title={t("infomationPage.engName")}
        content={user?.ENG_NAME || "-"}
      />
      <Item
        title={t("infomationPage.role")}
        content={user?.ROLL_PSTN_NM || "-"}
      />
      <Item
        title={t("infomationPage.role2")}
        content={user?.ROLE_CD_NM || "-"}
      />
      <Item
        title={t("infomationPage.job")}
        content={user?.OCPT_TYPE_NM || "-"}
      />
      <Item
        title={t("infomationPage.type")}
        content={user?.ENTR_CD_NM || "-"}
      />
      <Item
        title={t("infomationPage.wageRank")}
        content={`${user?.PAY_GRD1_NM || "-"} - ${user?.PAY_GRD2 || "-"}`}
      />
      <Item
        title={t("infomationPage.entryGrDate")}
        content={user?.GROUP_ENTR_DT || "-"}
      />
      <Item
        title={t("infomationPage.endDate")}
        content={user?.INTERN_DT || "-"}
      />
      <Item
        title={t("infomationPage.quitDate")}
        content={user?.RETIRE_DT || "-"}
      />
      <Item title={t("infomationPage.phone")} content={user?.TEL_NO || "-"} />
      <Item
        title={t("infomationPage.phoneOffice")}
        content={user?.EM_TEL_NO || "-"}
      />
      <Item
        title={t("infomationPage.email")}
        content={user?.EMAIL_ADDR || "-"}
      />
      <Item
        title={t("infomationPage.crAddress")}
        content={user?.CURR_ADDR || "-"}
      />
      <Item title={t("infomationPage.address")} content={user?.ADDR || "-"} />
    </div>
  );
}