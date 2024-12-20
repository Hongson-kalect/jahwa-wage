import * as React from "react";
import { useUserInfoStore } from "../../../store/userinfo";
import { useMobileAppStore } from "../../../store/mobile.app";
import { useTranslation } from "react-i18next";
import { getRawCookie } from "../../../lib/utlis";
import { MdWork } from "react-icons/md";
import { LuCalendarSearch } from "react-icons/lu";
import { RiContactsFill } from "react-icons/ri";

export interface IInformationProps {}

export default function Information(props: IInformationProps) {
  const { user } = useUserInfoStore();
  const { t } = useTranslation();
  const { setHeader, entCode } = useMobileAppStore();

  const imgUrl = React.useMemo(() => {
    return (
      "https://gw.jahwa.co.kr/Photo/" +
      decodeURIComponent(getRawCookie("Photo") || "")
    );
  }, []);

  React.useEffect(() => {
    setHeader(t("infomationPage.title"));
  }, [t]);

  const getCompanyName = (code: string) => {
    switch (code) {
      case "VN532":
        return "JAHWA VINA";
        break;
      case "VN538":
        return "NANO VINA";
      case "JV532":
        return "JH VINA";
    }
  };

  const InfoItem = ({ label, value }: { label: string; value?: string }) => (
    <div className="flex flex-col rounded bg-white p-3">
      <span className="mb-1 text-xs text-gray-400">{label}</span>
      <span className="text-sm font-medium text-gray-800">{value || "-"}</span>
    </div>
  );

  return (
    <div className="h-full overflow-auto bg-gray-100">
      {/* Thông tin cơ bản */}
      <div className="mb-4">
        <div className="mb-1 rounded-bl-2xl bg-white p-4 shadow shadow-gray-300">
          <div className="flex justify-between">
            <div>
              <h3 className="mb-2 text-lg font-bold">
                {getCompanyName(entCode)}
              </h3>
              <div className="flex gap-2">
                <span className="bg-gray-50 px-2 py-1 text-sm text-gray-800">
                  {user?.DEPT_NM}
                </span>
                <span className="bg-gray-50 px-2 py-1 text-sm text-gray-800">
                  {user?.EMP_NO}
                </span>
              </div>
            </div>
            <div
              style={{
                background: `url(${imgUrl}) center center / cover no-repeat`,
              }}
              className="h-16 w-20 rounded"
            ></div>
            {/* <img src={imgUrl} alt="avatar" className="h-full w-20 rounded" /> */}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1">
          <InfoItem label={t("infomationPage.name")} value={user?.NAME} />
          <InfoItem
            label={t("infomationPage.krName")}
            value={user?.HANJA_NAME}
          />
          <InfoItem
            label={t("infomationPage.engName")}
            value={user?.ENG_NAME}
          />
          <InfoItem
            label={t("infomationPage.role")}
            value={user?.ROLL_PSTN_NM}
          />
        </div>
      </div>

      {/* Thông tin công việc */}
      <div className="mb-4">
        <h4 className="mb-1 ml-1 flex items-end gap-2 text-sm font-bold">
          <MdWork size={20} className="mb-0.5" />
          {t("infomationPage.carrer")}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <InfoItem
            label={t("infomationPage.role2")}
            value={user?.ROLE_CD_NM}
          />
          <InfoItem
            label={t("infomationPage.job")}
            value={user?.OCPT_TYPE_NM}
          />
          <InfoItem label={t("infomationPage.type")} value={user?.ENTR_CD_NM} />
          <InfoItem
            label={t("infomationPage.wageRank")}
            value={user?.PAY_GRD1_NM + " - " + user?.PAY_GRD2}
          />
        </div>
      </div>

      {/* Thông tin ngày tháng */}
      <div className="mb-4">
        <h4 className="mb-1 ml-1 flex items-end gap-2 text-sm font-bold">
          <LuCalendarSearch size={20} className="mb-0.5" />
          {t("infomationPage.entryDate")}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <InfoItem
            label={t("infomationPage.entryGrDate")}
            value={user?.GROUP_ENTR_DT}
          />
          <InfoItem
            label={t("infomationPage.endDate")}
            value={user?.INTERN_DT}
          />
          <InfoItem
            label={t("infomationPage.quitDate")}
            value={user?.RETIRE_DT}
          />
        </div>
      </div>

      {/* Thông tin liên hệ */}
      <div>
        <h4 className="mb-1 ml-1 flex items-end gap-2 text-sm font-bold">
          <RiContactsFill size={20} className="mb-0.5" />
          {t("infomationPage.contact")}
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <InfoItem label={t("infomationPage.phone")} value={user?.TEL_NO} />
          <InfoItem
            label={t("infomationPage.phoneOffice")}
            value={user?.EM_TEL_NO}
          />
          <InfoItem
            label={t("infomationPage.email")}
            value={user?.EMAIL_ADDR}
          />
          <InfoItem
            label={t("infomationPage.crAddress")}
            value={user?.CURR_ADDR}
          />
          <InfoItem label={t("infomationPage.address")} value={user?.ADDR} />
        </div>
      </div>
    </div>
  );
}
