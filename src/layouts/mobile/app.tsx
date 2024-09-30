import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MobileAppBottom from "./components/app.bottom";
import { useUserInfoStore } from "../../store/userinfo";
import { httpGet } from "../../api/axios";
import { getCookie, getRawCookie, handleLogout } from "../../lib/utlis";
import { checkCookieNSession } from "./utils";
import { useMobileAppStore } from "../../store/mobile.app";

export interface IMobileAppLayoutProps {}

export default function MobileAppLayout(props: IMobileAppLayoutProps) {
  const { user, setUser } = useUserInfoStore();
  const [authening, setAuthening] = React.useState(false);

  const verifyUser = async () => {
    setAuthening(true);
    const result = checkCookieNSession();
    if (result === false) {
      console.log(result);
      handleLogout();
    }

    await fetchUserData();
    setAuthening(false);
  };

  // const refreshUserInfo = async () => {
  //   console.log("wtf :>> ", "wtf");
  //   if (user.EMP_NO) return
  //   const token = getCookie("auth");
  //   console.log("token :>> ", token);
  //   console.log('getCookie("save") :>> ', !!getCookie("save"));
  //   console.log('getCookie("emp") :>> ', !!getCookie("emp"));
  //   if (getCookie("save") && getCookie("emp") && token) {
  //     console.log("qqqq");
  //     try {
  //       const res = await httpGet("verify");
  //       if (res.data?.[0].EMP_NO === getCookie("emp"))
  //         setUser(
  //           res.data?.[0]
  //             ? {
  //                 ...res.data?.[0],
  //                 avatar: `https://gw.jahwa.co.kr/Photo/VNERP%2F${res.data?.[0].EMP_NO}.JPG`,
  //               }
  //             : {},
  //         );
  //       else {
  //         navigate("/");
  //       }
  //     } catch (error) {
  //       navigate("/");
  //     }
  //   } else {
  //     console.log("đâu rứa?");
  //     navigate("/");
  //   }
  // };

  const fetchUserData = async () => {
    console.log("code", getRawCookie("EmpCode"));
    try {
      const emp = getRawCookie("EmpCode");
      const res = await httpGet("user/" + emp);

      console.log("rés", res);
      const data = res.data;
      setUser(data?.[0]);
    } catch (error) {
      console.log("error", error);
    }
  };

  React.useEffect(() => {
    verifyUser();
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
