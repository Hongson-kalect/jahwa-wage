import * as React from "react";
import ContentWrap from "../../../../components/common/contentWrap";
import MobileHomeCalendar from "./calender";

export interface IMobileDayCheckContentProps {}

export default function MobileDayCheckContent(
  props: IMobileDayCheckContentProps,
) {
  return (
    <ContentWrap>
      <MobileHomeCalendar />
    </ContentWrap>
  );
}
