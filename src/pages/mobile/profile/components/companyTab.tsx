import * as React from "react";
import { UserInfoType } from "../interface";
import { useTranslation } from "react-i18next";

export interface ICompanyProfileProps {
  user: UserInfoType;
}

export default function CompanyProfile({ user }: ICompanyProfileProps) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="basic-info">
        <p className="header pl-2 text-sm font-medium italic text-rose-400">
          {t("profile.detail.seftInfo.basicInfo")}
        </p>

        <table className="w-full rounded-lg bg-white p-2 text-xs text-gray-800 shadow shadow-slate-400 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tbody>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.companyCode")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.COMP_CD}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.companyName")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.BIZ_AREA_NM}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.placeOfBusiness")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.BIZ_AREA_NM}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.workingArea")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.WK_AREA_CD}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.workingPlace")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.DOMI}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.internalDepartmentCode")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.INTERNAL_CD}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.departmentCode")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">
                {user.DEPT_CD} - {user.DEPT_NM}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.position")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.chucvu}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.responsibility")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.chuctrach}</td>
            </tr>
            {/* <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Thâm niên:
                </p>
              </td>
              <td className="py-0.5 font-medium">Chẩm hói</td>
            </tr> */}
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.wageRank")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.PAY_GRD1}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.wageScale")}:
                </p>
              </td>
              <td className="py-0.5">{user.PAY_GRD2}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="detail-info mt-4">
        <p className="header pl-2 text-sm font-medium italic text-rose-400">
          {t("profile.detail.companyInfo.title")}:
        </p>

        <table className="w-full rounded-lg bg-white p-2 text-xs text-gray-800 shadow shadow-slate-400 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tbody>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.joinGroupDate")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.ENTR_DT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.joinCompanyDate")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.ENTR_DT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.trialEndDate")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.INTERN_DT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.changeToFullTimeDate")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.ORDER_CHANGE_DT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.confirmExperience")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.CAREER_MM}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.companyInfo.lastChangeDate")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.RESENT_PROMOTE_DT}</td>
            </tr>
            {/* <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Ngày thôi việc:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.RESENT_PROMOTE_DT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Lý do thôi việc:
                </p>
              </td>
              <td className="py-0.5 font-medium">Vất vãi ò</td>
            </tr> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
