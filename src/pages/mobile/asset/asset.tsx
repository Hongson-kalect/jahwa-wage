import * as React from "react";
import { useMobileAppStore } from "../../../store/mobile.app";
import { BsQrCode } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import QrCodeScanner from "./components/qrCodeScanner";
import { set } from "date-fns";
import { useTranslation } from "react-i18next";

export interface IAssetProps {}

type ActiveTab = "search" | "check" | "dashboard";

export default function Asset(props: IAssetProps) {
  const { setHeader, device } = useMobileAppStore();
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("search");
  const [searchText, setSearchText] = React.useState("");
  const [isShowMenu, setIsShowMenu] = React.useState(false);
  const [showQRCode, setShowQRCode] = React.useState(false);
  const { t } = useTranslation();

  const activeTabList = React.useMemo(() => {
    return {
      search: t("asset.search"),
      check: t("asset.inspect"),
      dashboard: t("asset.dashboard"),
    };
  }, [t]);

  React.useEffect(() => {
    setHeader(t("asset.title"));
  }, [t]);

  const onTabChange = (tab?: ActiveTab) => {
    tab && setActiveTab(tab);
    setIsShowMenu(false);
  };

  const onQRCodeClose = (val?: string) => {
    if (val) setSearchText(val);
    setShowQRCode(false);
  };

  return (
    <div className="w-full">
      <div className="mt-14"></div>
      <div className="mt-4">
        <div className="flex items-start justify-between pt-4">
          <div
            className="ml-2 w-28 rounded-r-full bg-blue-900 px-3 py-2 text-center text-lg text-white"
            onClick={() => setIsShowMenu(true)}
          >
            {activeTabList[activeTab]}
          </div>
          <div>
            <div className="pr-2">
              <input
                className="h-8 w-40 rounded px-2 py-0.5 text-base text-gray-800 outline-none"
                placeholder={t("asset.searchPlaceholder")}
                spellCheck={false}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ border: "1px solid #ccc" }}
              />
            </div>
            <div className="mt-1 flex items-center justify-center gap-2 pr-2">
              <div className="flex h-8 flex-1 items-center justify-center rounded-lg bg-blue-800 text-white">
                {t("common.search")}
              </div>
              <div
                className="h-8 w-8 rounded"
                onClick={() => setShowQRCode(true)}
              >
                <BsQrCode className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {showQRCode && <QrCodeScanner onClose={onQRCodeClose} />}

      <div className="mt-4 px-2">{activeTab === "search" && <AssetInfo />}</div>
      {isShowMenu && (
        <FloatMenu activeTab={activeTab} onClose={(tab) => onTabChange(tab)} />
      )}
    </div>
  );
}

const AssetInfo = () => {
  const [accessId, setAccessId] = React.useState(1);
  const [showInfoDetail, setShowInfoDetail] = React.useState(false);
  const { t } = useTranslation();

  const onAccessClick = () => {
    setAccessId(2);
    setShowInfoDetail(true);
  };
  return (
    <div>
      <p
        className="mb-4 text-gray-400"
        // style={{ borderBottom: "1px solid " }}
      >
        {t("asset.assetInfo")}
      </p>

      <div className="flex flex-col gap-4 px-2">
        <div
          onClick={onAccessClick}
          className="flex h-10 items-center justify-between rounded-lg bg-blue-500 px-2 shadow shadow-blue-400"
        >
          <div className="flex items-center justify-center gap-2">
            <div
              className="pr-2 font-medium text-white"
              style={{ borderRight: "1px solid #ccc" }}
            >
              HCA0014V
            </div>
            <div className="line-clamp-1 text-sm text-gray-200">
              Máy tính ABC DEF GHI Klmn OPQ
            </div>
          </div>
          <div className="text-white">
            <FaCheck />
          </div>
        </div>
        <div
          onClick={onAccessClick}
          className="flex h-10 items-center justify-between rounded-lg px-2 shadow shadow-gray-400"
        >
          <div className="flex items-center justify-center gap-2">
            <div
              className="pr-2 font-medium text-gray-600"
              style={{ borderRight: "1px solid #ccc" }}
            >
              HCA0014V
            </div>
            <div className="line-clamp-1 text-sm text-gray-500">
              Máy tính ABC DEF GHI Klmn OPQ
            </div>
          </div>
        </div>
        <div
          onClick={onAccessClick}
          className="flex h-10 items-center justify-between rounded-lg px-2 shadow shadow-gray-400"
        >
          <div className="flex items-center justify-center gap-2">
            <div
              className="pr-2 font-medium text-gray-600"
              style={{ borderRight: "1px solid #ccc" }}
            >
              HCA0014V
            </div>
            <div className="line-clamp-1 text-sm text-gray-500">
              Máy tính ABC DEF GHI Klmn OPQ
            </div>
          </div>
        </div>
        <div
          onClick={onAccessClick}
          className="flex h-10 items-center justify-between rounded-lg px-2 shadow shadow-gray-400"
        >
          <div className="flex items-center justify-center gap-2">
            <div
              className="pr-2 font-medium text-gray-600"
              style={{ borderRight: "1px solid #ccc" }}
            >
              HCA0014V
            </div>
            <div className="line-clamp-1 text-sm text-gray-500">
              Máy tính ABC DEF GHI Klmn OPQ
            </div>
          </div>
        </div>
      </div>

      {showInfoDetail && (
        <AccessInfoDetail
          info={accessId}
          onClose={() => setShowInfoDetail(false)}
        />
      )}
    </div>
  );
};

const AccessInfoDetail = ({
  info,
  onClose,
}: {
  info: any;
  onClose: () => void;
}) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 z-10">
      <div
        className="overlay h-full w-full bg-[#000000bb]"
        onClick={() => onClose()}
      ></div>
      <div
        className="absolute left-[5%] right-[5%] top-[10%] flex flex-col gap-2 rounded-lg bg-white p-2"
        style={{ maxHeight: "80vh" }}
      >
        <p className="text-sm font-medium italic text-gray-400">
          {t("asset.assetDetailTitle")}
        </p>
        <div className="flex-1 overflow-auto">
          {/* <div className="h-full"> */}
          <div className="item-center absolute right-4 top-1.5 flex gap-4 font-medium">
            HBA0012V
          </div>
          {/* {info || <div>1</div>} */}

          <div className="mb-4 mt-2 flex items-center justify-center">
            {/* <div className="h-40 w-40 rounded-lg bg-red-400 shadow">
              {" "}
              ảnh tài sản
            </div> */}
          </div>
          <div className="mb-4 text-center">
            {/* <p className="w-1/2">tên tài sản</p> */}
            <p className="-mt-2 line-clamp-2 px-2 text-xl">
              Máy tính đẻ e bàn HP280 pro G9 bàn HP280 pro G9 bàn HP280 pro G9
              bàn HP280 pro G9
            </p>
            <p className="sub-name text-sm text-gray-700">
              Tên phụ của tài sản ở đây
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p
              className="mt-2 font-medium text-blue-900"
              style={{ borderBottom: "1px solid #d0c3ff" }}
            >
              {t("asset.usingInfo")}
            </p>

            <div className="flex flex-col gap-2 rounded-t-md px-2 py-1">
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T1")}:
                </div>
                <div className="text-blue-600">
                  330700{" "}
                  <span className="text-sm text-gray-400">
                    - IT ( IT nhưng là Tiếng hàn)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T2")}:
                </div>
                <div className="text-blue-600">
                  VN532{" "}
                  <span className="text-sm text-gray-400">- JAHWA VINA </span>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-nowrap text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T3")}:
                </div>
                <div className="text-blue-600">
                  V22111014{" "}
                  <span className="text-sm text-gray-400">
                    {" "}
                    - Nguyen Trung Quy Nguyen Trung Quy
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T4")}:
                </div>
                <div className="text-blue-600">
                  {" "}
                  JH532 <span className="text-sm text-gray-400">- JH VINA</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T5")}:
                </div>
                <div>Value</div>
              </div>
              <div className="flex items-start gap-2">
                <div className="mt-0.5 text-nowrap text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T6")}:
                </div>
                <div className="text-blue-600">
                  21645{" "}
                  <span className="text-sm text-gray-400">
                    {" "}
                    - Nguyen Trung Quy Nguyen Trung QuyNguyen Trung QuyNguyen
                    Trung
                  </span>
                </div>
              </div>
            </div>

            <p
              className="mb-1 mt-2 font-medium text-blue-900"
              style={{ borderBottom: "1px solid #d0c3ff" }}
            >
              {t("asset.tradeInfo")}
            </p>

            <div className="flex flex-col gap-2 px-2">
              <div
                className="flex rounded shadow-inner shadow-gray-400"
                style={{ border: "1px solid #e7e7e7" }}
              >
                <div className="" style={{ borderRight: "1px solid #ddd" }}>
                  <p
                    className="mb-2 py-1 pl-0.5 pr-2 text-center text-[13px] text-gray-500"
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    {t("asset.assetInfoLabels.T7")}
                  </p>
                  <p className="px-2 text-gray-700">2024-09-04</p>
                  <p className="mt-1 text-center text-[13px] text-gray-400">
                    8:00:00
                  </p>
                </div>
                <div className="flex flex-1 flex-col">
                  <p
                    className="mb-2 py-1 pl-0.5 pr-2 text-center text-[13px] text-gray-500"
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    {t("asset.assetInfoLabels.T8")}
                  </p>
                  <div className="flex flex-1 items-center justify-center">
                    <p className="line-clamp-3">Ngọc Hà</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T9")}
                </div>
                <div className="text-blue-600">12.000.000 đ</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T10")}
                </div>
                <div className="text-blue-600">10.000.000 đ</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T11")}
                </div>
                <div className="text-red-600">1.000.000 đ</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T12")}:
                </div>
                <div>2024-08-21</div>
              </div>
            </div>

            <div className="flex flex-col gap-2 px-2"></div>

            <div
              className="mt-2 flex items-center justify-between font-medium text-gray-700"
              style={{ borderBottom: "1px solid #d0c3ff" }}
            >
              <p className="mt-2 font-medium text-blue-900">
                {t("asset.propsInfo")}
              </p>
              <div>
                <p className="text-green-600">AA</p>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-2">
              <div
                className="mt-2 flex rounded shadow-inner shadow-gray-400"
                style={{ border: "1px solid #e7e7e7" }}
              >
                <div className="" style={{ borderRight: "1px solid #ddd" }}>
                  <p
                    className="mb-2 py-1 pl-0.5 pr-2 text-center text-[13px] text-gray-500"
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    {t("asset.assetInfoLabels.T13")}
                  </p>
                  <p className="px-2 text-sm text-blue-600">I5-10400</p>
                </div>
                <div className="" style={{ borderRight: "1px solid #ddd" }}>
                  <p
                    className="mb-2 py-1 pl-0.5 pr-2 text-center text-[13px] text-gray-500"
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    {t("asset.assetInfoLabels.T14")}
                  </p>
                  <p className="px-2 text-sm text-blue-600">16GB</p>
                </div>
                <div
                  className="flex-1"
                  style={{ borderRight: "1px solid #ddd" }}
                >
                  <p
                    className="mb-2 flex-1 py-1 pl-0.5 pr-2 text-center text-[13px] text-gray-500"
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    {t("asset.assetInfoLabels.T15")}
                  </p>
                  <p className="px-2 text-center text-sm text-blue-600">
                    1TB+250SSD
                  </p>
                </div>
                <div>
                  <p
                    className="mb-2 py-1 pl-0.5 pr-2 text-center text-[13px] text-gray-500"
                    style={{ borderBottom: "1px solid #ddd" }}
                  >
                    {t("asset.assetInfoLabels.T16")}
                  </p>
                  <p className="px-2 text-center text-blue-600">??</p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T17")}:
                </div>
                <div className="text-gray-700">
                  Hangf real, chinh hang, ko di dau dc
                </div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T18")}:
                </div>
                <div className="text-blue-600">Chất rắn, Không màu</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T19")}:
                </div>
                <div>023-0pqeoerôr5pwoeif;s</div>
              </div>

              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T20")}:
                </div>
                <div>AA</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T21")}:
                </div>
                <div>AA</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T22")}:
                </div>
                <div className="text-gray-700">dell</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T23")}:
                </div>
                <div className="text-gray-700">2012-08-21</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-[13px] font-medium">
                  {t("asset.assetInfoLabels.T24")}:
                </div>
                <div className="text-gray-700">La cai j?</div>
              </div>
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
};

// Mã pháp nhân *, tên pháp nhân  *, Mã tài sản **, tên tài sản **, ten tài sản 2 , Mã bộ phận *, Tên bộ phận * , Giá trị mua, Giá trị còn lại, Ngày mua, Quy cách&Model, Tài khoản, Tên tài khoản,
// Nhà sản xuất, Trạng thái *, Nơi lắp đặt (code), Nơi lắp đặt, Nơi thuê, Mã dự án, Nơi mua, Hình thức tài sản, Khấu trừ thuế, Ngày kết thúc khấu trừ thuế, Ngày sản xuất, Serial No
// CPU, RAM, HDD, CD, MONITOR, Mã nhân viên người sử dụng **, Tên người sử dụng **, MAC Address ,out , out ,out ,pit

const FloatMenu = ({
  activeTab,
  onClose,
}: {
  activeTab: ActiveTab;
  onClose: (tab?: ActiveTab) => void;
}) => {
  const { t } = useTranslation();
  return (
    <div className="fixed inset-0 z-10">
      <div
        className="overlay h-full w-full bg-[#000000bb]"
        onClick={() => onClose()}
      ></div>
      <div className="content absolute right-0 top-40 flex flex-col gap-6">
        <div
          onClick={() => onClose("search")}
          className={`float-left w-32 rounded-l-full px-4 py-2 text-lg ${activeTab === "search" ? "sha bg-blue-600 text-white" : "bg-white"}`}
        >
          <p className="text-right font-medium">{t("asset.search")}</p>
        </div>
        <div
          onClick={() => onClose("check")}
          className={`float-left w-32 rounded-l-full px-4 py-2 text-lg ${activeTab === "check" ? "bg-blue-600 text-white" : "bg-white"}`}
        >
          <p className="text-right font-medium">{t("asset.inspect")}</p>
        </div>
        <div
          onClick={() => onClose("dashboard")}
          className={`float-left w-32 rounded-l-full px-4 py-2 text-lg ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "bg-white"}`}
        >
          <p className="text-right font-medium">{t("asset.dashboard")}</p>
        </div>
      </div>
    </div>
  );
};
