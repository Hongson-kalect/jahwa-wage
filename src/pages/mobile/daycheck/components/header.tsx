import * as React from "react";

import jahwaIcon from "../../../../assets/images/icon3.png";
import { DatePicker } from "antd";
import { useTranslation } from "react-i18next";

export interface IMobileDayCheckHeaderProps {}

export default function MobileDayCheckHeader(
  props: IMobileDayCheckHeaderProps,
) {
  const { t, i18n } = useTranslation();

  return (
    <div className="flex items-end gap-4 py-1 [&>*]:text-white">
      <div className="flex w-full items-center px-2">
        <img src={jahwaIcon} alt="jahwa" className="h-8 w-10" />
        <p className="ml-2 line-clamp-1 flex-1 text-sm uppercase text-green-400">
          Ngày công
        </p>
        <DatePicker
          type="month"
          picker="month"
          cellRender={(val) => <div>Tháng {dayjs(val).month() + 1}</div>}
        />

        {/* <Badge badgeContent={4} color="error" className="ml-1">
          <IoNotifications
            size={24}
            style={{
              animation: notify > 0 ? "bellRing 3s linear infinite" : "",
              WebkitTransformOrigin: " 50% 0",
            }}
          />
        </Badge> */}
      </div>

      {/* <Modal
        open={showChangeLang}
        onCancel={() => setChangeLang(false)}
        closable={false}
        footer={null}
      >
        <div div>choi ơi</div>
      </Modal> */}
    </div>
  );
}
