import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import MobileAppBottom from "./components/app.bottom";
import { useUserInfoStore } from "../../store/userinfo";
import { httpGet } from "../../api/axios";
import { getCookie } from "../../lib/utlis";
import { useQuery } from "@tanstack/react-query";

export interface IMobileAppLayoutProps {}

export default function MobileAppLayout(props: IMobileAppLayoutProps) {
  const { isLogin, user, setUser } = useUserInfoStore();
  const navigate = useNavigate();
  const [emp_no] = React.useState(() => getCookie("emp_no"));
  console.log(user);
  console.log("emp_noemp_noemp_noemp_noemp_no", emp_no);
  console.log("emp_noemp_noemp_noemp_noemp_no", getCookie("auth"));

  const fetchData = async () => {
    try {
      const res = await httpGet("user/" + emp_no);
      const data = res.data;
      setUser(data?.[0]);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const verify = useQuery({
    queryFn: fetchData,
    queryKey: [emp_no],
  });

  if (verify.isLoading) return <div>Đang xác thực bạn ây</div>;

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1 overflow-auto">
        <Outlet />
      </div>
      <MobileAppBottom />
    </div>
  );
}
