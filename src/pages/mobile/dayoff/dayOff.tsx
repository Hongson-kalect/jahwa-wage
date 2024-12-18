import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useMobileAppStore } from "../../../store/mobile.app";
import DayOff from "../attendant/ui/dayOff";

export interface IDayOffPageProps {}

export default function DayOffPage(props: IDayOffPageProps) {
  const { t } = useTranslation();
  const { setHeader } = useMobileAppStore();

  React.useEffect(() => {
    setHeader(t("attendantPage.title2"));
  }, []);

  return (
    <div className="h-full w-full">
      <div className="flex h-full overflow-auto">
        <DayOff />
      </div>
    </div>
  );
}
