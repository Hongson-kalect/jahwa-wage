import * as React from "react";
import { UserInfoType } from "../interface";
import ContentWrap from "../../../../components/common/contentWrap";
import ProfileSelector from "./profileSelector";
import PersonalProfile from "./personalTab";
import CompanyProfile from "./companyTab";
import InfoProfile from "./infoTab";

export interface IMobileProfileContentProps {
  user: UserInfoType;
  activeTab: string;
}

export default function MobileProfileContent({
  // activeTab,
  user,
}: IMobileProfileContentProps) {
  const [activeTab, setActiveTab] = React.useState<
    "personal" | "work" | "info"
  >("personal");

  return (
    <ContentWrap className="!rounded-tl-none !px-2">
      <ProfileSelector activeTab={activeTab} setActiveTab={setActiveTab} />
      <div className="w-full">
        {activeTab === "personal" && <PersonalProfile user={user} />}
        {activeTab === "work" && <CompanyProfile user={user} />}
        {activeTab === "info" && <InfoProfile user={user} />}
      </div>
    </ContentWrap>
  );
}
