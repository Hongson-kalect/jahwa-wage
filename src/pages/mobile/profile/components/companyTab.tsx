import * as React from "react";
import { UserInfoType } from "../interface";

export interface ICompanyProfileProps {
  user: UserInfoType;
}

export default function CompanyProfile({ user }: ICompanyProfileProps) {
  return (
    <div>
      <div className="basic-info">
        <p className="header pl-2 text-sm font-medium italic text-rose-400">
          Thông tin cơ bản
        </p>

        <table className="w-full rounded-lg bg-white p-2 text-xs text-gray-800 shadow shadow-slate-400 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tbody>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Mã công ty:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.COMP_CD}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Tên công ty:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.BIZ_AREA_NM}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Nơi kinh doanh khai báo:
                </p>
              </td>
              <td className="py-0.5 font-medium">Hỏi chấm</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Khu vực làm việc:
                </p>
              </td>
              <td className="py-0.5 font-medium">Chẩm hói</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Nơi làm việc:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.DOMI}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Mã bộ phận nội bộ:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.INTERNAL_CD} ??</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Mã bộ phận:
                </p>
              </td>
              <td className="py-0.5 font-medium">
                {user.DEPT_CD} - {user.DEPT_NM}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Chức vụ:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.MINOR_NM}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Chức trách:
                </p>
              </td>
              <td className="py-0.5 font-medium">Hỏi chấm</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Thâm niên:
                </p>
              </td>
              <td className="py-0.5 font-medium">Chẩm hói</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Bậc lương:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.PAY_GRD1}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Hệ số lương:
                </p>
              </td>
              <td className="py-0.5">{user.PAY_GRD2}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="detail-info mt-4">
        <p className="header pl-2 text-sm font-medium italic text-rose-400">
          Thông tin khác
        </p>

        <table className="w-full rounded-lg bg-white p-2 text-xs text-gray-800 shadow shadow-slate-400 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tbody>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Ngày vào tập đoàn:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.ENTR_DT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Ngày vào công ty:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.ENTR_DT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Ngày kết thúc thử việc:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.INTERN_DT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Ngày biến đồng nhân sự:
                </p>
              </td>
              <td className="py-0.5 font-medium">Ủa, Ủa dì dợ?</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Xác nhận kinh nghiệm:
                </p>
              </td>
              <td className="py-0.5 font-medium">Chưa có em ây</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Ngày thay đổi gần đây:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.RESENT_PROMOTE_DT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Ngày thôi việc:
                </p>
              </td>
              <td className="py-0.5 font-medium">Chưa có dữ liệu</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Lý do thôi việc:
                </p>
              </td>
              <td className="py-0.5 font-medium">Vất vãi ò</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
