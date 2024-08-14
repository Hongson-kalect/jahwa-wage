import * as React from "react";
import { Outlet, useParams } from "react-router-dom";
import styled from "styled-components";
import { routerParams } from "../../config/router";
import { FaAngleLeft, FaChevronLeft } from "react-icons/fa";
import { setCookie, setDomainCookie } from "../../lib/utlis";

export interface IMAuthLayoutProps {
  children?: React.ReactNode;
}

const header = {
  [routerParams.auth.signIn]: "Sign in",
  [routerParams.auth.signUp]: "Sign up",
  [routerParams.auth.forgotPassword]: "Forgot password",
  [routerParams.auth.changePassword]: "change password",
};

export default function MAuthLayout(props: IMAuthLayoutProps) {
  const pageName = React.useMemo(() => {
    return window.location.pathname
      .split("?")[0]
      .replace("/m/auth/", "")
      .replace("/auth/", "");
  }, [window.location.pathname]);
  React.useEffect(() => {
    setCookie("nêm", "qq", 12);
    setDomainCookie("domaincc", "qqqq", 1);
  }, []);

  return (
    <div className="main-layout flex h-screen flex-col bg-primary-1">
      {/* <div className="flex h-14 items-end gap-4 pb-4 [&>*]:text-white">
        <FaChevronLeft size={21} className="ml-4 pb-1" />
        <p className="flex text-xl font-semibold text-white">
          {header[pageName] || "Sign in"}
        </p>
      </div> */}

      <Outlet />
      {props.children}
    </div>
  );
}
