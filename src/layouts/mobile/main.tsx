import * as React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUserInfoStore } from "../../store/userinfo";
import { setCookie } from "../../lib/utlis";
import { httpGet } from "../../api/axios";

export interface IMobileMainLayoutProps {}

const MainLayout = styled.div`
  height: 100dvh;
  width: 100vw;
  /* border: 1px solid gray; */
  /* margin: -1px; */
  /* border-radius: 20px; */
  overflow: hidden;
`;

export default function MobileMainLayout(props: IMobileMainLayoutProps) {
  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}
