import * as React from "react";
import { useTranslation } from "react-i18next";
import { BsQrCode } from "react-icons/bs";
import { toast } from "react-toastify";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Input } from "antd";

import { AssetCheckType, AssetInfoType } from "../../../interface/asset";
import { getAssetCheck, getAssetInfo } from "../../../services/asset";
import { useMobileAppStore } from "../../../store/mobile.app";
import AssetCheck from "./components/assetCheck";
import AssetInfoModal from "./components/assetModalInfo";
import QrCodeScanner from "./components/qrCodeScanner";

export interface IAssetProps {}

export default function Asset() {
  const { t } = useTranslation();
  const { entCode } = useMobileAppStore();
  const { setHeader, setIsLoading } = useMobileAppStore();
  const [searchText, setSearchText] = React.useState("");
  const [showQRCode, setShowQRCode] = React.useState(false);
  const [assetInfo, setAssetInfo] = React.useState<AssetInfoType | null>(null);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const html = React.useMemo<HTMLHtmlElement | null>(() => {
    return document.querySelector("html");
  }, []);

  const assetChecks = useQuery<AssetCheckType[]>({
    queryKey: ["assetChecks"],
    queryFn: () => getAssetCheck(),
  });

  React.useEffect(() => {
    setHeader(t("assetPage.title"));
  }, [t]);

  const { mutate: assetSearch, isPending } = useMutation<
    AssetInfoType[],
    Error,
    string
  >({
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
          <div className="ml-2 w-24 rounded-r-full bg-blue-900 px-3 py-1 text-center text-lg text-white">
            {entCode}
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
    </div>
  );
}
