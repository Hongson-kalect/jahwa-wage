import { Empty, Skeleton } from "antd";
import * as React from "react";
import AssetCheckItem from "./assetCheckItem";
import { useUserInfoStore } from "../../../../../store/userinfo";
import { useMobileAppStore } from "../../../../../store/mobile.app";

export type CheckMasterType = {
  id: number;
  company: string;
  subject: string;
  description: string;
  startDate: string;
  endDate: string;
  state: boolean;
  insertUserId: string;
  insertDate: string;
  insertUserName: string;
  updateUserId: string;
  updateUserName: string;
  updateDate: string;
  facility: boolean;
  subsidy: boolean;
};

export type AssetCheckType = {
  id: number;
  total_count: number;
  completed_count: number;
  masterId: number;
  master: CheckMasterType;
};

export interface IAssetCheckProps {
  assets?: AssetCheckType[];
}

export default function AssetCheck(props: IAssetCheckProps) {
  const { entCode } = useMobileAppStore();

  const assets = React.useMemo(() => {
    if (!props.assets) return null;
    if (!props.assets.length) return [];
    return [...props.assets].reverse();
  }, [props.assets]);
  return (
    <div>
      {!assets ? (
        <div className="p-2">
          <Skeleton active />
        </div>
      ) : !assets?.length ? (
        <Empty />
      ) : (
        assets.map((data, index) => {
          if (data.master.company === entCode)
            return (
              <div key={index} className="p-2">
                <AssetCheckItem data={data} />
              </div>
            );
        })
      )}
    </div>
  );
}
