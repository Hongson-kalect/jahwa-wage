import { t } from "i18next";
import * as React from "react";
import { AiFillPicture } from "react-icons/ai";
import { FaBorderAll, FaBuilding } from "react-icons/fa6";
import { IoIosFlash } from "react-icons/io";
import { IoShareSocial } from "react-icons/io5";
import styled from "styled-components";
import { notificationItems } from "../../wage/utils";

export interface IMobileHomeProps {}

const NotifyHeader = styled.div`
  .radio {
    div {
      text-align: center;
      padding: 8px 8px 2px;
      color: white;
      font-size: 18px;
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
      transition: all 0.3s linear;
      width: 100%;
      flex: 1;
      overflow: hidden;

      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;

      p {
        font-size: 0px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      &.active {
        font-weight: bold;
        background-color: white;
        color: #6a6af1;
        /* width: 60%; */
        flex: 4;
        p {
          font-size: 16px;
          display: block;
        }
      }

      p {
        display: none;
      }
    }
  }
`;

export default function MobileNews() {
  const [activeTab, setActiveTab] = React.useState<
    "all" | "social" | "company" | "temporary" | "picture"
  >("all");
  return (
    <div className="">
      <NotifyHeader className="header mt-2 rounded-t-lg bg-primary-2 p-2">
        <div className="radio relative z-10 flex w-full justify-center gap-2">
          <div
            onClick={() => setActiveTab("all")}
            className={`${activeTab === "all" && "active"}`}
          >
            <FaBorderAll />
            <p>{t("selfNotify.all")}</p>
          </div>
          <div
            onClick={() => setActiveTab("social")}
            className={`${activeTab === "social" && "active"}`}
          >
            <IoShareSocial />
            <p>{t("selfNotify.social")}</p>
          </div>
          <div
            onClick={() => setActiveTab("company")}
            className={`${activeTab === "company" && "active"}`}
          >
            <FaBuilding />
            <p>{t("selfNotify.company")}</p>
          </div>
          <div
            onClick={() => setActiveTab("temporary")}
            className={`${activeTab === "temporary" && "active"}`}
          >
            <IoIosFlash />
            <p>{t("selfNotify.temporary")}</p>
          </div>
          <div
            onClick={() => setActiveTab("picture")}
            className={`${activeTab === "picture" && "active"}`}
          >
            <AiFillPicture />
            <p>{t("selfNotify.picture")}</p>
          </div>
        </div>
      </NotifyHeader>
      <div className="tab">
        <div>
          <div className="h-[60vh] w-full overflow-auto dark:bg-gray-700">
            {notificationItems.map((newItem, index) => {
              if (activeTab === "all" || activeTab === newItem.type)
                return <NewMenu key={index} newItem={newItem} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const NewItems = styled.div``;
type NewItemProps = {
  newItem: {
    id: number;
    title: string;
    description: string;
    uploader: string;
    image: string;
    content: string;
    date: string;
    type: string;
  };
};

export const NewMenu = ({ newItem }: NewItemProps) => {
  return (
    <NewItems>
      <div className="my-2 flex gap-4 bg-white p-0.5 dark:bg-gray-800">
        <div className="h-20 w-1/3 max-w-xs">
          <div
            className="h-20 w-full"
            style={{
              background: `url(${newItem.image}) center center /cover no-repeat`,
            }}
          />
        </div>
        <div className="content flex flex-1 flex-col justify-between">
          <p
            className="line-clamp-1 text-base font-bold dark:text-gray-300"
            style={{ lineHeight: "16px" }}
          >
            {newItem.title}
          </p>
          <p
            className="mb-1 line-clamp-2 px-1 dark:text-gray-400"
            style={{ lineHeight: "16px" }}
          >
            {newItem.description}
          </p>
          <div
            className="creator flex justify-between px-1"
            style={{ fontSize: "11px" }}
          >
            <p className="mr-6 line-clamp-1 flex-1 font-bold text-slate-500">
              {newItem.uploader}
            </p>
            <p className="text-slate-500">{newItem.date}</p>
          </div>
        </div>
      </div>
    </NewItems>
  );
};
