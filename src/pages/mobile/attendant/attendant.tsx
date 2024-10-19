import * as React from "react";
import { useMobileAppStore } from "../../../store/mobile.app";
import ChangeDate from "./components/changeDate";
import Overview from "./components/overview";
import BangCong from "./components/bangcong";
import {
  BiRightArrow,
  BiSolidLeftArrow,
  BiSolidRightArrow,
} from "react-icons/bi";
import { scrollToId } from "../../../lib/utlis";
import { useTranslation } from "react-i18next";

export interface IAttendantProps {}

export default function Attendant(props: IAttendantProps) {
  const { t } = useTranslation();
  const { setHeader, device } = useMobileAppStore();
  const [isYear, setIsYear] = React.useState(false);

  React.useEffect(() => {
    setHeader(t("attendance.workTable"));
  }, []);

  return (
    <div className="h-screen w-screen overflow-scroll">
      <div className="flex snap-x snap-mandatory overflow-auto">
        <div className="h-screen min-w-[100vw] snap-start" id="di-lam">
          <div className="h-14 w-full">Hế lu</div>
          <div>
            {/* <div
              className="mt- px-4 text-right font-medium text-gray-400"
              // style={{ borderBottom: "1px solid #f2f2f2" }}
            >
              Ngày đi làm
            </div> */}

            <div
              className="header mt-1 flex items-center justify-between rounded-xl px-2 pt-4"
              // style={{ borderTop: "1px solid #ddd" }}
            >
              <div className="">
                <p className="font-medium text-gray-700">
                  {t("attendance.dayCount")}
                </p>
                <div className="relative mt-2 text-blue-900">
                  <p className="pr-3 text-4xl font-medium">
                    28 {t("common.day")}
                  </p>
                  {/* <p className="absolute right-0 top-0 font-medium">đ</p> */}
                </div>
                <p className="mt-1 font-light text-gray-400">
                  {t("attendance.hourCount")}: 240 -{" "}
                  {t("attendance.overtimeCount")}: 48
                </p>
              </div>
              <ChangeDate isYear={isYear} setIsYear={setIsYear} />
            </div>

            {/* <div className="mt-6 px-4">
          <p className="pr-4 text-right font-medium text-gray-400">Phép năm</p>
          <Overview />
        </div> */}

            <div className="mt-4 px-4">
              <div className="flex items-end justify-between font-medium text-gray-400">
                {t("attendance.workTable")}
                <div
                  onClick={() => scrollToId("nghi")}
                  className="flex items-center justify-center gap-2 rounded-full bg-blue-600 py-2 pl-4 pr-2 text-sm text-white opacity-80"
                >
                  <p>{t("attendance.off")}</p>
                  <BiSolidRightArrow size={18} />
                </div>
              </div>
              <BangCong />
            </div>
          </div>
        </div>
        <div
          className="h-screen min-w-[100vw] snap-start overflow-auto"
          id="nghi"
        >
          <div className="h-14 w-full">Hế lu</div>
          <div>
            <div className="mt-2 px-4">
              <p className="text-right font-medium text-gray-400">
                {t("dayOff.title")}
              </p>
              <Overview />
            </div>

            {/* <div className="mt-6 px-4">
          <p className="pr-4 text-right font-medium text-gray-400">Phép năm</p>
          <Overview />
        </div> */}

            <div className="mt-8 px-4">
              <div className="flex items-end justify-between font-medium text-gray-400">
                <div
                  onClick={() => scrollToId("di-lam")}
                  className="flex items-center justify-center gap-2 rounded-full bg-blue-600 py-2 pl-2 pr-4 text-sm text-white opacity-80"
                >
                  <BiSolidLeftArrow size={18} />
                  <p>{t("work.goWork")}</p>
                </div>
                {t("dayOff.history")}
              </div>
              <BangCong />
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex w-screen overflow-auto">
      <div className="h-screen w-full">
        <div className="h-14 w-full">Hế lu</div>
        <div>
          <div className="mt-2 px-4">
            <p className="text-right font-medium text-gray-400">Phép năm</p>
            <Overview />
          </div>

          <div
            className="mt-8 px-4 text-right font-medium text-gray-400"
            // style={{ borderBottom: "1px solid #f2f2f2" }}
          >
            Ngày đi làm
          </div>

          <div
            className="header mt-1 flex items-center justify-between rounded-xl px-2 pt-4"
            // style={{ borderTop: "1px solid #ddd" }}
          >
            <div className="">
              <p className="font-medium text-gray-700">Đi làm</p>
              <div className="relative mt-2 text-blue-900">
                <p className="pr-3 text-4xl font-medium">28 ngày</p>
                {/* <p className="absolute right-0 top-0 font-medium">đ</p> */}
              </div>
              <p className="mt-1 font-light text-gray-400">
                Số giờ: 240 - Tăng ca: 48
              </p>
            </div>
            <ChangeDate isYear={isYear} setIsYear={setIsYear} />
          </div>

          {/* <div className="mt-6 px-4">
          <p className="pr-4 text-right font-medium text-gray-400">Phép năm</p>
          <Overview />
        </div> */}

          <div className="mt-8 px-4">
            <p className="pr-4 text-right font-medium text-gray-400">
              Bảng công
            </p>
            <BangCong />
          </div>
        </div>
      </div>
      <div className="h-full w-full">
        <div className="h-14 w-full">Hế lu</div>
        <div>
          <div className="mt-2 px-4">
            <p className="text-right font-medium text-gray-400">Phép năm</p>
            <Overview />
          </div>

          <div
            className="mt-8 px-4 text-right font-medium text-gray-400"
            // style={{ borderBottom: "1px solid #f2f2f2" }}
          >
            Ngày đi làm
          </div>

          <div
            className="header mt-1 flex items-center justify-between rounded-xl px-2 pt-4"
            // style={{ borderTop: "1px solid #ddd" }}
          >
            <div className="">
              <p className="font-medium text-gray-700">Đi làm</p>
              <div className="relative mt-2 text-blue-900">
                <p className="pr-3 text-4xl font-medium">28 ngày</p>
                {/* <p className="absolute right-0 top-0 font-medium">đ</p> */}
              </div>
              <p className="mt-1 font-light text-gray-400">
                Số giờ: 240 - Tăng ca: 48
              </p>
            </div>
            <ChangeDate isYear={isYear} setIsYear={setIsYear} />
          </div>

          {/* <div className="mt-6 px-4">
          <p className="pr-4 text-right font-medium text-gray-400">Phép năm</p>
          <Overview />
        </div> */}

          <div className="mt-8 px-4">
            <p className="pr-4 text-right font-medium text-gray-400">
              Bảng công
            </p>
            <BangCong />
          </div>
        </div>
      </div>
    </div>
  );
}
