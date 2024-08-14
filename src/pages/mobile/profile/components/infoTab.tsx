import * as React from "react";
import { UserInfoType } from "../interface";

export interface IInfoProfileProps {
  user: UserInfoType;
}

export default function InfoProfile({ user }: IInfoProfileProps) {
  return (
    <div>
      <div className="detail-info">
        <p className="header pl-2 text-sm font-medium italic text-gray-600">
          Nghĩa vụ quân sự
        </p>

        <table className="w-full rounded-lg p-2 text-xs shadow-inner shadow-gray-600 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Phân loại quân sựu:
              </p>
            </td>
            <td>{user.ENTR_DT} nhỡn nó dài v ò</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                thời gian trong quân sự:
              </p>
            </td>
            <td>{user.ENTR_DT}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Nơi đóng... quân:
              </p>
            </td>
            <td>{user.INTERN_DT}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Đơn vị quân sự:
              </p>
            </td>
            <td>Ủa, Ủa dì dợ?</td>
          </tr>

          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Cấp bậc quân sự:
              </p>
            </td>
            <td>Chưa có em ây</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Mã nghĩa vụ:
              </p>
            </td>
            <td>{user.RESENT_PROMOTE_DT}</td>
          </tr>
        </table>
      </div>

      <div className="detail-info mt-4">
        <p className="header pl-2 text-sm font-medium italic text-gray-600">
          Sức khỏe tổng quát
        </p>

        <table className="w-full rounded-lg p-2 text-xs shadow-inner shadow-gray-600 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Chiều cao:</p>
            </td>
            <td>Chưa có</td>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Cân nặng:</p>
            </td>
            <td>Thông tin</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Thị lực trái:
              </p>
            </td>
            <td>{user.EYESGT_LEFT}</td>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Thị lực phải:
              </p>
            </td>
            <td>{user.EYESGT_RIGHT}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Nhóm máu:</p>
            </td>
            <td>Chưa có</td>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Mù màu:</p>
            </td>
            <td>thông tin</td>
          </tr>
        </table>
      </div>

      <div className="detail-info mt-4">
        <p className="header pl-2 text-sm font-medium italic text-gray-600">
          Người giới thiệu
        </p>

        <table className="w-full rounded-lg p-2 text-xs shadow-inner shadow-gray-600 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Họ tên:</p>
            </td>
            <td>Không thấy bất kỳ</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Nơi làm việc:
              </p>
            </td>
            <td>Dữ liệu nào liên quan</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Mối quan hệ:
              </p>
            </td>
            <td>Đến người giới thiệu</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Chức vụ:</p>
            </td>
            <td>Trong API này</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
