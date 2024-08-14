import { DatePicker, Image } from "antd";
import * as React from "react";
import { useUserInfoStore } from "../../../../store/userinfo";

export interface IMobileDayOffHeaderProps {}

export default function MobileDayOffHeader(props: IMobileDayOffHeaderProps) {
  const { user } = useUserInfoStore();

  return (
    <div className="flex flex-col gap-2 px-2 pb-3 pt-2">
      <p className="h-[34px] px-2 pt-2 text-lg text-white">Phép năm</p>
      <div className="panel relative flex-1 rounded-lg bg-white text-center dark:bg-gray-700">
        <div className="absolute left-1/2 top-0 h-16 w-16 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full">
          <Image
            style={{ border: "2px solid gray" }}
            // className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/3"
            width={80}
            height={80}
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
          />
        </div>
        <div className="info mt-9"></div>
        <p className="font-medium text-gray-800 dark:text-white">{user.NAME}</p>
        <p className="text-xs font-bold text-gray-500 dark:text-gray-300">
          {user.EMP_NO}
        </p>
        <div className="grid grid-cols-4 gap-2 p-2">
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-300">
              Tổng
            </p>
            <p className="mt-1 text-sm font-medium text-primary-4 dark:text-blue-400">
              20
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-300">
              X-RAY
            </p>
            <p className="mt-1 text-sm font-medium text-primary-4 dark:text-blue-400">
              0
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-300">
              Đã dùng
            </p>
            <p className="mt-1 text-sm font-medium text-primary-8 dark:text-error">
              20
            </p>
          </div>
          <div>
            <p className="text-xs font-bold text-gray-500 dark:text-gray-300">
              Còn
            </p>
            <p className="mt-1 text-sm font-medium text-primary-1 dark:text-success">
              cái nịt
            </p>
          </div>
        </div>
        {/* <div className="absolute bottom-1 right-2 text-xs italic opacity-80">
          Chi trả: 26/07/014
        </div> */}
      </div>
    </div>
  );
}
