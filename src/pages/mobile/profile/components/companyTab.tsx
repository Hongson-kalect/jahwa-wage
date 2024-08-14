import * as React from "react";
import { UserInfoType } from "../interface";

export interface ICompanyProfileProps {
  user: UserInfoType;
}

export default function CompanyProfile({ user }: ICompanyProfileProps) {
  return (
    <div>
      <div className="basic-info">
        <p className="header pl-2 text-sm font-medium italic text-gray-600">
          Thông tin cơ bản
        </p>

        <table className="w-full rounded-lg p-2 text-xs shadow-inner shadow-gray-600 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Mã công ty:
              </p>
            </td>
            <td>{user.COMP_CD}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Tên công ty:
              </p>
            </td>
            <td>{user.BIZ_AREA_NM}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Nơi kinh doanh khai báo:
              </p>
            </td>
            <td>Hỏi chấm</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Khu vực làm việc:
              </p>
            </td>
            <td>Chẩm hói</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Nơi làm việc:
              </p>
            </td>
            <td>{user.DOMI}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Mã bộ phận nội bộ:
              </p>
            </td>
            <td>{user.INTERNAL_CD} ??</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Mã bộ phận:
              </p>
            </td>
            <td>
              {user.DEPT_CD} - {user.DEPT_NM}
            </td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Chức vụ:</p>
            </td>
            <td>{user.MINOR_NM}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Chức trách:
              </p>
            </td>
            <td>Hỏi chấm</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Thâm niên:</p>
            </td>
            <td>Chẩm hói</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Bậc lương:</p>
            </td>
            <td>{user.PAY_GRD1}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Hệ số lương:
              </p>
            </td>
            <td>{user.PAY_GRD2}</td>
          </tr>
        </table>
      </div>

      <div className="detail-info mt-4">
        <p className="header pl-2 text-sm font-medium italic text-gray-600">
          Thông tin khác
        </p>

        <table className="w-full rounded-lg p-2 text-xs shadow-inner shadow-gray-600 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Ngày vào tập đoàn:
              </p>
            </td>
            <td>{user.ENTR_DT}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Ngày vào công ty:
              </p>
            </td>
            <td>{user.ENTR_DT}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Ngày kết thúc thử việc:
              </p>
            </td>
            <td>{user.INTERN_DT}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Ngày biến đồng nhân sự:
              </p>
            </td>
            <td>Ủa, Ủa dì dợ?</td>
          </tr>

          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Xác nhận kinh nghiệm:
              </p>
            </td>
            <td>Chưa có em ây</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Ngày thay đổi gần đây:
              </p>
            </td>
            <td>{user.RESENT_PROMOTE_DT}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Ngày thôi việc:
              </p>
            </td>
            <td>Chưa có dữ liệu</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Lý do thôi việc:
              </p>
            </td>
            <td>Vất vãi ò</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
