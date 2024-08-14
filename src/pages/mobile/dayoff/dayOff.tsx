import * as React from "react";
import { MobileAppWrapper } from "../../../components/mobile/appWrapper";
import MobileDayOffHeader from "./components/header";
import MobileDayOffContent from "./components/content";

export interface IMobileDayOffPageProps {}

export default function MobileDayOffPage(props: IMobileDayOffPageProps) {
  return (
    <MobileAppWrapper>
      <MobileDayOffHeader />
      <MobileDayOffContent />
    </MobileAppWrapper>
  );
}
