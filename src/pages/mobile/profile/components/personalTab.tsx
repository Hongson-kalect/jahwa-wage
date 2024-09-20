import * as React from "react";
import { useUserInfoStore } from "../../../../store/userinfo";
import { UserInfoType } from "../interface";
import { useTranslation } from "react-i18next";

export interface IPersonalProfileProps {
  user: UserInfoType;
}

export default function PersonalProfile({ user }: IPersonalProfileProps) {
  const { t } = useTranslation();
  return (
    <div>
      <div className="seft-info">
        <p className="header pl-2 text-sm font-medium italic text-rose-400">
          {t("profile.detail.seftInfo.basicInfo")}
        </p>

        <table className="w-full rounded-lg bg-white p-2 text-xs text-gray-800 shadow shadow-slate-400 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tbody>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.seftInfo.name")}:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.NAME}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.seftInfo.koreanName")}:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user?.HANJA_NAME || "Không"}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.seftInfo.englishName")}:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.ENG_NAME || "Không"}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.seftInfo.code")}:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.EMP_NO}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.seftInfo.email")}:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.EMAIL_ADDR}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.seftInfo.dayOfBirth")}:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.BIRT?.slice(0, 10)}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.seftInfo.dayOfBirth")}:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.DOMI}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.seftInfo.address")}::
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.CURR_ADDR}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.seftInfo.phone")}:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.TEL_NO}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.seftInfo.IDNumber")}:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.RES_NO}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  {t("profile.detail.seftInfo.nation")}:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.NAT_CD}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="detail-info mt-4">
        <p className="header pl-2 text-sm font-medium italic text-rose-400">
          {t("profile.detail.otherInfo.healthInfo")}:
        </p>

        <table className="w-full rounded-lg bg-white p-2 text-xs text-gray-800 shadow shadow-gray-600 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tbody>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  {t("profile.detail.otherInfo.height")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.HGT}</td>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  {t("profile.detail.otherInfo.weight")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.WGT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  {t("profile.detail.otherInfo.leftEye")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.EYESGT_LEFT}</td>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  {t("profile.detail.otherInfo.rightEye")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.EYESGT_RIGHT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  {t("profile.detail.otherInfo.bloodType")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">Trắng</td>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  {t("profile.detail.otherInfo.blindEye")}:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.DALT_TYPE}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* <div className="seft-info mt-4">
        <p className="header pl-2 text-sm font-medium italic text-rose-400">
          Thông tin chi tiết
        </p>
        <table className="w-full rounded-lg p-2 text-xs text-gray-800 shadow shadow-slate-400 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tbody>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Tên Hàn:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user?.HANJA_NAME || "Không"}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Tên Anh:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.ENG_NAME || "Không"}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Biệt danh:
                </p>
              </td>
              <td className="py-0.5 font-medium">{"Ăn đì phai"}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Hôn nhân:
                </p>
              </td>
              <td className="py-0.5 font-medium">
                {user.SPOUSE ? "Đã hun" : "Chưa kêt hun"}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Học vấn:
                </p>
              </td>
              <td className="py-0.5 font-medium">CHua cos nha</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Ngành:
                </p>
              </td>
              <td className="py-0.5 font-medium">Chua co nha</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Hạng bằng:
                </p>
              </td>
              <td className="py-0.5 font-medium">Chua co nha</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Trường:
                </p>
              </td>
              <td className="py-0.5 font-medium">Chua co nha</td>
            </tr>
          </tbody>
        </table>
      </div> */}
    </div>
  );
}
