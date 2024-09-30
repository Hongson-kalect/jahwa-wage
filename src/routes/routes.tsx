import { createBrowserRouter } from "react-router-dom";
import { routerMainPath, routerParams } from "../config/router";
import MobileAppLayout from "../layouts/mobile/app";
import MAuthLayout from "../layouts/mobile/auth";
import MobileMainLayout from "../layouts/mobile/main";
import MSignInPage from "../pages/mobile/auth/signIn";
import CalendarNew from "../pages/mobile/calendar-new/calendar";
import MobileDayOffPage from "../pages/mobile/dayoff/dayOff";
import MobileHomePage from "../pages/mobile/home/home";
import HomePageNew from "../pages/mobile/new-home/onepage";
import MobileProfilePage from "../pages/mobile/profile/profile";
import MobileWageNew from "../pages/mobile/wage-new/home";
import { SpamAlert } from "./blocked_ip";
import MobileWage1 from "../pages/mobile/wage-1/home";
import MobileWage2 from "../pages/mobile/wage-2/home";
import MobileWage3 from "../pages/mobile/wage-3/home";
import MobileWage4 from "../pages/mobile/wage-4/home";
import MobileWage5 from "../pages/mobile/wage-5/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MobileMainLayout />,
    // loader: rootLoader,
    children: [
      {
        path: `/`,
        element: <MobileHomePage />,
      },
      {
        path: `/${routerParams.app.home}`,
        // element: <MobileHomePage />,
        element: <MobileHomePage />,
      },
      {
        path: `/${routerParams.app.calendar}`,
        // element: <MobileDayCheckPage />,
        element: <CalendarNew />,
      },
      {
        path: `/${routerParams.app.wage}`,
        element: <MobileWageNew />,
      },
      {
        path: `/${routerParams.app.wage}1`,
        element: <MobileWage1 />,
      },
      {
        path: `/${routerParams.app.wage}2`,
        element: <MobileWage2 />,
      },
      {
        path: `/${routerParams.app.wage}3`,
        element: <MobileWage3 />,
      },
      {
        path: `/${routerParams.app.wage}4`,
        element: <MobileWage4 />,
      },
      {
        path: `/${routerParams.app.wage}5`,
        element: <MobileWage5 />,
      },
      {
        path: `/${routerParams.app.dayOff}`,
        element: <MobileDayOffPage />,
      },
      {
        path: `/${routerParams.app.profile}`,
        element: <MobileProfilePage />,
      },
      {
        path: `/spam_alert`,
        element: (
          <MAuthLayout>
            <SpamAlert />,
          </MAuthLayout>
        ),
      },

      {
        path: "test",
        element: <HomePageNew />,
      },
    ],
  },
  {
    path: "/",
    element: (
      <MAuthLayout>
        {" "}
        <MSignInPage />
      </MAuthLayout>
    ),
  },
]);
