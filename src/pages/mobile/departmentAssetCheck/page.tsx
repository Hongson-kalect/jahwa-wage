import * as React from "react";
import { useParams } from "react-router-dom";
import { getDepartmentAssetCheckDetail } from "../../../services/asset";
import { useQuery } from "@tanstack/react-query";
import { Empty, Input, Select, Skeleton } from "antd";
import { BiSearch } from "react-icons/bi";
import useDebounce from "../../../hooks/useDebounce";
import DepartmentAssetCheckItem from "./departmentAssetCheckItem";
import { ModelItem } from "./modelItem";
import { useTranslation } from "react-i18next";
import { useMobileAppStore } from "../../../store/mobile.app";

export type DepartmentAssetCheckType = {
  id: number;
  company: string;
  asst_no: string;
  asst_nm: string;
  v_asst_nm: string;
  dept_cd: string;
  dept_nm: string;
  acq_loc_amt: number;
  res_amt: number;
  reg_dt: string;
  spec: string;
  acct_cd: string;
  acct_nm: string;
  maker: string;
  asset_state: string;
  setarea: string;
  send_bp_nm?: string;
  project_no: string;
  cust_bp_nm: string;
  asset_type?: string;
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
  inspection_yn: string;
  updateUserId: string;
  updateUserName: string;
  updateDate: string;
};
export type AssetCheckType = DepartmentAssetCheckType[];

export interface IAssetCheckDetailProps {}

export default function DepartmentAssetCheck(props: IAssetCheckDetailProps) {
  const params = useParams();
  const { t } = useTranslation();
  const { setHeader } = useMobileAppStore();
  const [showPopup, setShowPopup] = React.useState(false);
  const [selectedItem, setSelectedItem] =
    React.useState<null | DepartmentAssetCheckType>(null);

  const masterId = React.useMemo(() => params?.masterId, [params?.masterId]);
  const departmentId = React.useMemo(
    () => params?.departmentId,
    [params?.departmentId],
  );
  const [searchVal, setSearchVal] = React.useState("");
  const [selectFilter, setSelectFilter] = React.useState<
    "all" | "checked" | "notChecked"
  >("all");
  const filtVal = useDebounce({ value: searchVal, delay: 500 }) as string;

  const {
    data: departmentAssetCheck,
    error,
    isLoading,
  } = useQuery<AssetCheckType>({
    queryKey: ["getDepartmentAssetCheckDetail", masterId, departmentId],
    queryFn: () => getDepartmentAssetCheckDetail({ masterId, departmentId }),
  });

  const filtedValue = React.useMemo(() => {
    if (!departmentAssetCheck) return null;
    if (!departmentAssetCheck?.length) return [];
    return departmentAssetCheck?.filter((item) => {
      if (selectFilter === "checked" && item.inspection_yn === "N") {
        return false;
      }

      if (selectFilter === "notChecked" && item.inspection_yn === "Y") {
        return false;
      }

      return (
        item.acct_cd.toUpperCase().includes(filtVal.toUpperCase()) ||
        item.acct_nm.toUpperCase().includes(filtVal.toUpperCase()) ||
        item.asst_no.toUpperCase().includes(filtVal.toUpperCase()) ||
        item.asst_nm.toUpperCase().includes(filtVal.toUpperCase()) ||
        item.v_asst_nm.toUpperCase().includes(filtVal.toUpperCase()) ||
        item.updateUserId.toUpperCase().includes(filtVal.toUpperCase()) ||
        item.updateUserName.toUpperCase().includes(filtVal.toUpperCase()) ||
        item.dept_cd.toUpperCase().includes(filtVal.toUpperCase())
      );
    });
  }, [departmentAssetCheck, filtVal, selectFilter]);

  const handleClosePopup = () => {
    setShowPopup(false), setSelectedItem(null);
  };

  const count = React.useMemo(() => {
    return filtedValue?.length;
  }, [filtedValue]);

  React.useEffect(() => {
    if (selectedItem) setShowPopup(true);
  }, [selectedItem]);

  React.useEffect(() => {
    setHeader(departmentAssetCheck?.[0]?.dept_nm || "---------");
  }, [t, departmentAssetCheck?.[0]?.dept_nm]);

  return (
    <div
      className={showPopup ? "overflow-hidden" : ""}
      style={{ height: showPopup ? "calc( 100dvh - 80px )" : "unset" }}
    >
      <div className="mb-2 flex justify-between p-2">
        <div className="relative overflow-hidden rounded-full">
          <div className="absolute left-0.5 top-0.5 flex h-[80%] w-10 items-center justify-center rounded-l-full bg-blue-500 shadow-inner shadow-gray-600">
            <BiSearch color="white" />
          </div>
          <Input
            prefix={<BiSearch color="blue" />}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            spellCheck={false}
            className="h-8 rounded-full border-none text-sm text-gray-700 shadow-inner shadow-gray-400 focus:shadow-blue-400 focus:outline-blue-800"
            placeholder={t("assetPage.assetNo")}
          />
        </div>
        <div>
          <Select
            className="w-28"
            // defaultValue={"all"}
            value={selectFilter}
            onChange={(val) => setSelectFilter(val)}
          >
            <Select.Option value="all">{t("assetPage.all")}</Select.Option>
            <Select.Option value="checked">
              {t("assetPage.checked")}
            </Select.Option>
            <Select.Option value="notChecked">
              {t("assetPage.notChecked")}
            </Select.Option>
          </Select>
        </div>
      </div>
      <p className="mb-2 ml-2 text-xs text-gray-500">
        {t("assetPage.numberMatch")}:{" "}
        <span className="text-sm font-medium text-gray-700">{count}</span>
      </p>
      <div>
        {!filtedValue ? (
          <div className="p-2">
            <Skeleton active />
          </div>
        ) : !filtedValue?.length ? (
          <Empty />
        ) : (
          <div className="grid grid-cols-2 gap-x-2 gap-y-3 px-2">
            {filtedValue?.map((item, index) => (
              <div key={index}>
                <DepartmentAssetCheckItem
                  setSelectedItem={setSelectedItem}
                  data={item}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedItem && (
        <div
          className="fixed inset-0 z-10 flex !animate-none items-center justify-center bg-black bg-opacity-50"
          onClick={handleClosePopup}
        >
          <div
            className="w-[400px] max-w-[90%] rounded-lg bg-white py-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="mb-4 px-4 text-xl font-bold">
              {t("assetPage.assetInfo")}
            </h2>
            <ModelItem data={selectedItem} />

            {/* <div className="options flex items-center justify-between px-4">
              <button
                className="mt-4 w-24 rounded-lg bg-gray-500 py-2 text-base text-white"
                onClick={handleClosePopup}
              >
                {t("common.close")}
              </button>
              <button
                className="mt-4 w-32 rounded-lg bg-blue-500 py-2 text-base text-white"
                onClick={handleClosePopup}
              >
                {t("common.edit")}
              </button>
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
}
