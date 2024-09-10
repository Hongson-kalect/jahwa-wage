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
        <p className="header pl-2 text-sm font-medium italic text-rose-400">
          Thông tin cơ bản
        </p>

        <table className="w-full rounded-lg bg-white p-2 text-xs text-gray-800 shadow shadow-slate-400 [&_td]:border-0 [&_td]:border-b [&_td]:border-solid [&_td]:border-gray-300">
          <tbody>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Họ tên:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.NAME}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Mã NV:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.EMP_NO}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Email:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.EMAIL_ADDR}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Ngày sinh:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.BIRT}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Nơi sinh:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.DOMI}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Thường trú:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.CURR_ADDR}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  SDT:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.TEL_NO}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  CMND:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.RES_NO}
              </td>
            </tr>
            <tr>
              <td>
                <p className="text-nowrap pr-2 text-xs font-light text-gray-700">
                  Quốc tịch:
                </p>
              </td>
              <td className="line-clamp-1 py-0.5 text-xs font-medium">
                {user.NAT_CD}
              </td>
            </tr>
          </tbody>
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
                {user.ENG_NAME}
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
              <td className="py-0.5 font-medium">Chua Di Phai</td>
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
      </div>
    </div>
  );
}
