import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MobileAppBottom from "./components/app.bottom";
import { useUserInfoStore } from "../../store/userinfo";
import { httpGet, httpPost } from "../../api/axios";
import { getCookie, getRawCookie, handleLogout } from "../../lib/utlis";
import { checkCookieNSession } from "./utils";
import { useMobileAppStore } from "../../store/mobile.app";

export interface IMobileAppLayoutProps {}

export default function MobileAppLayout(props: IMobileAppLayoutProps) {
  const { user, setUser } = useUserInfoStore();
  const [authening, setAuthening] = React.useState(false);

  getWageData();

  const verifyUser = async () => {
    setAuthening(true);
    const result = checkCookieNSession();
    if (result === false) {
      handleLogout();
    }

    // await fetchUserData();
    setAuthening(false);
  };

  React.useEffect(() => {
    // verifyUser();
  }, []);

  if (authening) return <div>Cheking cookie</div>;

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-auto">
        <Outlet />
        <div className="bottom-space mt-2"></div>
      </div>
    </div>
  );
}
