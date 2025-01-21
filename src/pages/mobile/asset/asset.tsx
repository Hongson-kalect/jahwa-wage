import * as React from "react";
import { useMobileAppStore } from "../../../store/mobile.app";
import { BsQrCode } from "react-icons/bs";
import { FaCheck } from "react-icons/fa6";
import QrCodeScanner from "./components/qrCodeScanner";
import { set } from "date-fns";
import { useTranslation } from "react-i18next";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAssetCheck, getAssetInfo } from "../../../services/asset";
import { Empty, Input, Skeleton } from "antd";
import AssetCheck, { AssetCheckType } from "./components/assetCheck";
import { toast } from "react-toastify";
import AssetInfoModal from "./components/assetModalInfo";

export interface IAssetProps {}

type ActiveTab = "search" | "check" | "dashboard";

export type AssetInfoType = {
  company: string;
  company_nm: string;
  asst_no: string;
  asst_nm: string;
  v_asst_nm: string;
  dept_cd: string;
  dept_nm: string;
  acq_loc_amt: number;
  res_amt: null | number;
  reg_dt: string;
  spec: string;
  acct_cd: string;
  acct_nm: string;
  maker: string;
  asset_state: string;
  setareacode: null | string | number;
  setarea: string;
  send_bp_nm: null | string;
  project_no: string;
  cust_bp_nm: string;
  asset_type: null | string;
  tax_flg: null | string;
  tax_end_date: null | string;
  manufacturing_date: string;
  serial_no: string;
  cpu: string;
  ram: string;
  hdd: string;
  cd: string;
  monitor: string;
  user_cd: string;
  user_nm: string;
  mac_add: string;
  locEntCode: null | string | number;
};

export default function Asset(props: IAssetProps) {
  const { t } = useTranslation();
  const { setHeader, setIsLoading } = useMobileAppStore();
  const [activeTab, setActiveTab] = React.useState<ActiveTab>("search");
  const [searchText, setSearchText] = React.useState("");
  const [isShowMenu, setIsShowMenu] = React.useState(false);
  const [showQRCode, setShowQRCode] = React.useState(false);
  const [assetInfo, setAssetInfo] = React.useState<AssetInfoType | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const html = React.useMemo<HTMLHtmlElement | null>(() => {
    return document.querySelector("html");
  }, []);

  const activeTabList = React.useMemo(() => {
    return {
      search: t("assetPage.search"),
      check: t("assetPage.inspect"),
      dashboard: t("assetPage.dashboard"),
    };
  }, [t]);

  const assetChecks = useQuery<AssetCheckType[]>({
    queryKey: ["assetChecks"],
    queryFn: () => getAssetCheck(),
  });

  React.useEffect(() => {
    setHeader(t("assetPage.title"));
  }, [t]);

  const onTabChange = (tab?: ActiveTab) => {
    tab && setActiveTab(tab);
    setIsShowMenu(false);
  };

  const {
    mutate: assetSearch,
    error,
    isPending,
  } = useMutation<AssetInfoType[], Error, string>({
    mutationKey: ["assetSearch"],
    mutationFn: async (code) => await getAssetInfo({ code }),
    onSuccess: (data) => {
      if (data[0]) {
        setAssetInfo(data[0]);
        setIsModalOpen(true);
      } else {
        setAssetInfo(null);
        toast.error(t("common.noData"));
      }
    },
    onError: () => {
      toast.error(t("common.badConnect"));
    },
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const onQRCodeClose = (val?: string) => {
    if (val) {
      setSearchText(val);
      assetSearch(val);
    }
    setShowQRCode(false);
  };

  React.useEffect(() => {
    if (html) {
      if (isModalOpen) {
        html.style.maxHeight = "100vh";
        html.style.overflowY = "hidden";
      } else {
        html.style.maxHeight = "unset";
        html.style.overflowY = "unset";
      }
    }
  }, [isModalOpen, html]);

  React.useEffect(() => {
    setIsLoading(isPending);
  }, [isPending]);

  return (
    <div
      className={`relative h-full w-full ${isModalOpen ? "overflow-hidden" : ""}`}
    >
      <div>
        <div className="flex items-start justify-between">
          <div
            className="ml-2 w-28 rounded-r-full bg-blue-900 px-3 py-2 text-center text-lg text-white"
            onClick={() => setIsShowMenu(true)}
          >
            {activeTabList[activeTab]}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!searchText) return toast.error("Vui lòng nhập dữ liệu");
              assetSearch(searchText);
            }}
          >
            <div className="pr-2">
              <Input
                className="h-8 w-40 rounded px-2 py-0.5 text-base text-gray-800 outline-none"
                placeholder={t("assetPage.assetNo")}
                spellCheck={false}
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
                style={{ border: "1px solid #ccc" }}
              />
            </div>
            <div className="mt-1 flex items-center justify-center gap-2 pr-2">
              <button
                type="submit"
                className="flex h-8 flex-1 items-center justify-center rounded-lg border-none bg-blue-800 text-white"
              >
                {t("common.search")}
              </button>
              <div
                className="flex h-8 w-8 items-center justify-center rounded"
                onClick={() => setShowQRCode(true)}
              >
                <BsQrCode size={32} />
              </div>
            </div>
          </form>
        </div>
      </div>

      {showQRCode && <QrCodeScanner onClose={onQRCodeClose} />}
      <AssetInfoModal
        assetInfo={assetInfo}
        setAssetInfo={setAssetInfo}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />

      <div className="mt-4">
        <AssetCheck assets={assetChecks.data} />
      </div>

      {/* <div className="mt-4 px-2">{activeTab === "search" && <AssetInfo />}</div> */}
      {/* <div className="mt-4 px-2">{activeTab === "search" && <AssetInfo />}</div> */}
      {/* <div className="mt-4 px-2">{activeTab === "search" && <AssetInfo />}</div> */}

      {isShowMenu && (
        <FloatMenu activeTab={activeTab} onClose={(tab) => onTabChange(tab)} />
      )}
    </div>
  );
}

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
          <p className="text-right font-medium">{t("assetPage.search")}</p>
        </div>
        <div
          onClick={() => onClose("check")}
          className={`float-left w-32 rounded-l-full px-4 py-2 text-lg ${activeTab === "check" ? "bg-blue-600 text-white" : "bg-white"}`}
        >
          <p className="text-right font-medium">{t("assetPage.inspect")}</p>
        </div>
        <div
          onClick={() => onClose("dashboard")}
          className={`float-left w-32 rounded-l-full px-4 py-2 text-lg ${activeTab === "dashboard" ? "bg-blue-600 text-white" : "bg-white"}`}
        >
          <p className="text-right font-medium">{t("assetPage.dashboard")}</p>
        </div>
      </div>
    </div>
  );
};
