import { Empty, Skeleton } from "antd";
import * as React from "react";
import AssetCheckItem from "./assetCheckItem";

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
        assets.map((data, index) => (
          <div key={index} className="p-2">
            <AssetCheckItem data={data} />
          </div>
        ))
      )}
    </div>
  );
}
