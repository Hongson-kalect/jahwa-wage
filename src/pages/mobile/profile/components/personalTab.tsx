import * as React from "react";
import { useUserInfoStore } from "../../../../store/userinfo";
import { UserInfoType } from "../interface";

export interface IPersonalProfileProps {
  user: UserInfoType;
}

export default function PersonalProfile({ user }: IPersonalProfileProps) {
  console.log("user", user);
  return (
    <div>
      <div className="seft-info">
        <p className="header pl-2 text-sm font-medium italic text-gray-600">
          Thông tin cơ bản
        </p>

        <table className="w-full rounded-lg p-2 text-xs shadow-inner shadow-gray-600 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Họ tên:</p>
            </td>
            <td>{user.NAME}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Mã NV:</p>
            </td>
            <td>{user.EMP_NO}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Email:</p>
            </td>
            <td>{user.EMAIL_ADDR}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Ngày sinh:</p>
            </td>
            <td>{user.BIRT}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Nơi sinh:</p>
            </td>
            <td>{user.DOMI}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">
                Thường trú:
              </p>
            </td>
            <td>{user.CURR_ADDR}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">SDT:</p>
            </td>
            <td>{user.TEL_NO}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">CMND:</p>
            </td>
            <td>{user.RES_NO}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Quốc tịch:</p>
            </td>
            <td>{user.NAT_CD}</td>
          </tr>
        </table>

        {/* <div className="content-wrap flex flex-col gap-1 rounded-md p-2 text-sm font-medium shadow-inner shadow-black [&_p]:text-nowrap [&_span]:text-xs [&_span]:font-normal">
          <div className="flex flex-wrap gap-2">
            <p className="w-24">Họ tên:</p> <span> Diệp Hồng Sơn</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <p className="w-24">Mã NV:</p> <span>V22406013</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <p className="w-24">Email:</p> <span>hongson197201@gmail.com</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <p className="w-24">Ngay sinh:</p> <span>01/01/2000</span>
          </div>
          <div className="flex gap-2">
            <div>
              <p className="w-24">Noi sinh:</p>
            </div>
            <span className="line-clamp-2">
              Tổ dân phố Đồng Hội, thị trấn Đại Đình, huyện Tam Đảo, tỉnh Vĩnh
              Phúc
            </span>
          </div>
          <div className="flex gap-2">
            <div>
              <p className="w-24">Thường trú:</p>
            </div>
            <span className="line-clamp-2">
              Tổ dân phố Đồng Hội, thị trấn Đại Đình, huyện Tam Đảo, tỉnh Vĩnh
              Phúc
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            <p className="w-24">SDT:</p> <span>0987654321</span>
          </div>
          <div className="flex flex-wrap gap-2">
            <p className="w-24">CMND:</p> <span>026201004567</span>
            <div className="flex flex-wrap gap-2">
              <p>Quốc tịch:</p> <span>Việt nam</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <p className="w-24">Quốc tịch:</p> <span>Việt Nam</span>
          </div>
        </div> */}
      </div>

      <div className="seft-info mt-4">
        <p className="header pl-2 text-sm font-medium italic text-gray-600">
          Thông tin chi tiết
        </p>
        <table className="w-full rounded-lg p-2 text-xs shadow-inner shadow-gray-600 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Tên Hàn:</p>
            </td>
            <td>{user?.HANJA_NAME}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Tên Anh:</p>
            </td>
            <td>{user.ENG_NAME}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Biệt danh:</p>
            </td>
            <td>{"Ăn đì phai"}</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Hôn nhân:</p>
            </td>
            <td>Chua Di Phai</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Học vấn:</p>
            </td>
            <td>CHua cos nha</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Ngành:</p>
            </td>
            <td>Chua co nha</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Hạng bằng:</p>
            </td>
            <td>Chua co nha</td>
          </tr>
          <tr>
            <td>
              <p className="text-nowrap pr-2 text-sm font-medium">Trường:</p>
            </td>
            <td>Chua co nha</td>
          </tr>
        </table>
      </div>
    </div>
  );
}
