import * as React from "react";
import { useUserInfoStore } from "../../../store/userinfo";
import { useMobileAppStore } from "../../../store/mobile.app";
import { useTranslation } from "react-i18next";

export interface IInformationProps {}

export default function Information(props: IInformationProps) {
  const { user } = useUserInfoStore();
  const { t } = useTranslation();
  const { setHeader, entCode } = useMobileAppStore();

  console.log("user :>> ", user);

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
  return (
    <div className="h-full overflow-auto bg-blue-300 px-4 pb-2 pt-16">
      {/* <h2>Thông tin nhân </h2> */}
      <div className="h-full rounded-lg bg-blue-200 p-4">
        <div className="h-full rounded-lg bg-white p-4">
          <table
            className="h-full"
            style={{
              fontFamily: "none",
              fontSize: "12px",
            }}
          >
            <tbody>
              <tr>
                <td className="">{t("infomationPage.code")}</td>
                <td className="w-8 text-center">:</td>
                <td>{getCompanyName(entCode)}</td>
              </tr>

              <tr>
                <td className="">{t("infomationPage.depart")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.DEPT_NM}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.emp")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.EMP_NO}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.name")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.NAME}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.krName")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.HANJA_NAME}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.engName")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.ENG_NAME}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.role")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.ROLL_PSTN_NM}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.role2")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.ROLE_CD_NM}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.carrer")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.OCPT_TYPE_NM}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.job")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.OCPT_TYPE_NM}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.type")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.ENTR_CD_NM}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.entryGrDate")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.GROUP_ENTR_DT}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.entryDate")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.ENTR_DT}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.endDate")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.INTERN_DT}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.quitDate")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.RETIRE_DT}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.gender")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.SEX_NM}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.zipCode")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.ZIP_CD}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.address")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.ADDR}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.crZipCode")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.CURR_ZIP_CD}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.crAddress")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.CURR_ADDR}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.phone")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.HAND_TEL_NO}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.phoneOffice")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.EM_TEL_NO}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.email")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.EMAIL_ADDR}</td>
              </tr>
              <tr>
                <td className="">{t("infomationPage.phone_no")}</td>
                <td className="w-8 text-center">:</td>
                <td>{user?.TEL_NO}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      {/* {Object.entries(user).map(([key, user.abc], index) => {
        return (
          <div key={index}>
            <div>
              {key}: {user.abc}
            </div>
          </div>
        );
      })} */}
    </div>
  );
}
