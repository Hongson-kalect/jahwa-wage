import * as React from "react";
import { MobileAppWrapper } from "../../../components/mobile/appWrapper";
import MobileProfileHeader from "./components/header";
import MobileProfileContent from "./components/content";
import { UserInfoType } from "./interface";
import "./profile.css";
import { useUserInfoStore } from "../../../store/userinfo";

export interface IMobileProfilePageProps {}

export default function MobileProfilePage(props: IMobileProfilePageProps) {
  const [activeTab, setActiveTab] = React.useState<
    "personal" | "work" | "info"
  >("personal");

  const { user } = useUserInfoStore();

  // React.useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(
  //         "http://172.16.151.129:5000/api/user/v22111014",
  //       );
  //       const data = await response.json();
  //       setUser(data);
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //     }
  //   };

  //   fetchData();
  // }, []);
  return (
    <MobileAppWrapper className="profile-page">
      <MobileProfileHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      <MobileProfileContent
        user={user}
        activeTab={activeTab}
        // setActiveTab={setActiveTab}
      />
    </MobileAppWrapper>
  );
}
