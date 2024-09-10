import * as React from "react";
import { UserInfoType } from "../interface";

export interface IInfoProfileProps {
  user: UserInfoType;
}

export default function InfoProfile({ user }: IInfoProfileProps) {
  return (
    <div>
      <div className="detail-info">
        <p className="header pl-2 text-sm font-medium italic text-rose-400">
          Nghĩa vụ quân sự
        </p>

        <table className="w-full rounded-lg bg-white p-2 text-xs text-gray-800 shadow shadow-gray-600 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tbody>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  Phân loại quân sựu:
                </p>
              </td>
              <td className="py-0.5 font-medium">
                {user.ENTR_DT} nhỡn nó dài v ò
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  thời gian trong quân sự:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.ENTR_DT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  Nơi đóng... quân:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.INTERN_DT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  Đơn vị quân sự:
                </p>
              </td>
              <td className="py-0.5 font-medium">Ủa, Ủa dì dợ?</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  Cấp bậc quân sự:
                </p>
              </td>
              <td className="py-0.5 font-medium">Chưa có em ây</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  Mã nghĩa vụ:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.RESENT_PROMOTE_DT}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="detail-info mt-4">
        <p className="header pl-2 text-sm font-medium italic text-rose-400">
          Sức khỏe tổng quát
        </p>

        <table className="w-full rounded-lg bg-white p-2 text-xs text-gray-800 shadow shadow-gray-600 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tbody>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  Chiều cao:
                </p>
              </td>
              <td className="py-0.5 font-medium">Chưa có</td>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">Cân nặng:</p>
              </td>
              <td className="py-0.5 font-medium">Thông tin</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  Thị lực trái:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.EYESGT_LEFT}</td>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  Thị lực phải:
                </p>
              </td>
              <td className="py-0.5 font-medium">{user.EYESGT_RIGHT}</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">Nhóm máu:</p>
              </td>
              <td className="py-0.5 font-medium">Chưa có</td>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">Mù màu:</p>
              </td>
              <td className="py-0.5 font-medium">thông tin</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="detail-info mt-4">
        <p className="header pl-2 text-sm font-medium italic text-rose-400">
          Người giới thiệu
        </p>

        <table className="w-full rounded-lg bg-white p-2 text-xs text-gray-800 shadow shadow-gray-600 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tbody>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">Họ tên:</p>
              </td>
              <td className="py-0.5 font-medium">Không thấy bất kỳ</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  Nơi làm việc:
                </p>
              </td>
              <td className="py-0.5 font-medium">Dữ liệu nào liên quan</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">
                  Mối quan hệ:
                </p>
              </td>
              <td className="py-0.5 font-medium">Đến người giới thiệu</td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light">Chức vụ:</p>
              </td>
              <td className="py-0.5 font-medium">Trong API này</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
