import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MobileAppBottom from "./components/app.bottom";
import { useUserInfoStore } from "../../store/userinfo";
import { httpGet } from "../../api/axios";
import { getCookie } from "../../lib/utlis";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import jwt from "jsonwebtoken";

export interface IMobileAppLayoutProps {}

export default function MobileAppLayout(props: IMobileAppLayoutProps) {
  const { user, setUser } = useUserInfoStore();
  const navigate = useNavigate();

  const refreshUserInfo = async () => {
    console.log("wtf :>> ", "wtf");
    //có thể để thành useQuery
    if (user.EMP_NO) return; //nếu Vừa đăng nhập thì sẽ có dữ liệu, ko xét nữa
    const token = getCookie("auth");
    console.log("token :>> ", token);
    console.log('getCookie("save") :>> ', !!getCookie("save"));
    console.log('getCookie("emp") :>> ', !!getCookie("emp"));
    if (getCookie("save") && getCookie("emp") && token) {
      console.log("qqqq");
      try {
        const res = await httpGet("verify");
        if (res.data?.[0].EMP_NO === getCookie("emp")) setUser(res.data?.[0]);
        else {
          navigate("/");
        }
      } catch (error) {
        navigate("/");
      }
      //nếu có data thì gán cho user
      // nếu ko thì về login
    } else {
      console.log("đâu rứa?");
      navigate("/");
    }
  };

  // const fetchUserData = async () => {
  //   try {
  //     const res = await httpGet("user/" + user.EMP_NO);
  //     const data = res.data;
  //     setUser(data?.[0]);
  //   } catch (error) {
  //   }
  // };

  React.useEffect(() => {
    refreshUserInfo();
  }, []);

  if (!user?.EMP_NO) return <div>Đang xác thực bạn ây</div>;

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-auto">
        <Outlet />
        <div className="bottom-space mt-2"></div>
      </div>
      <MobileAppBottom />
    </div>
  );
}
