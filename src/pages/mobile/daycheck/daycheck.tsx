import * as React from "react";
import MobileDayCheckHeader from "./components/header";
import MobileDayCheckContent from "./components/content";
import { MobileAppWrapper } from "../../../components/mobile/appWrapper";

export interface IMobileDayCheckPageProps {}

export default function MobileDayCheckPage(props: IMobileDayCheckPageProps) {
  return (
    <MobileAppWrapper>
      <MobileDayCheckHeader />
      <MobileDayCheckContent />
    </MobileAppWrapper>
  );
}
