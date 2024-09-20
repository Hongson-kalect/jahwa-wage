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

export const router = createBrowserRouter([
  {
    path: "/m",
    element: <MobileMainLayout />,
    // loader: rootLoader,
    children: [
      {
        path: `/m/spam_alert`,
        element: (
          <MAuthLayout>
            <SpamAlert />,
          </MAuthLayout>
        ),
      },
      {
        path: `/m`,
        element: (
          <MAuthLayout>
            <MSignInPage />,
          </MAuthLayout>
        ),
      },
      {
        path: "test",
        element: <HomePageNew />,
      },
      {
        path: `/m/${routerMainPath.auth}`,
        element: <MAuthLayout />,
        // loader: teamLoader,
        children: [
          {
            path: `/m/${routerMainPath.auth}`,
            element: <MSignInPage />,
          },
          {
            path: `/m/${routerMainPath.auth}/${routerParams.auth.signIn}`,
            element: <MSignInPage />,
          },
        ],
      },
      {
        path: `/m/${routerMainPath.app}`,
        element: <MobileAppLayout />,
        // loader: teamLoader,
        children: [
          {
            path: `/m/${routerMainPath.app}`,
            element: <MobileHomePage />,
          },
          {
            path: `/m/${routerMainPath.app}/${routerParams.app.home}`,
            // element: <MobileHomePage />,
            element: <MobileHomePage />,
          },
          {
            path: `/m/app/home1`,
            element: <MobileHomePage />,
          },
          {
            path: `/m/app/calendar1`,
            element: <CalendarNew />,
          },
          {
            path: `/m/app/wage1`,
            element: <MobileWageNew />,
          },
          {
            path: `/m/${routerMainPath.app}/${routerParams.app.calendar}`,
            // element: <MobileDayCheckPage />,
            element: <CalendarNew />,
          },
          {
            path: `/m/${routerMainPath.app}/${routerParams.app.wage}`,
            // element: <MobileWagePage />,
            element: <MobileWageNew />,
          },
          {
            path: `/m/${routerMainPath.app}/${routerParams.app.dayOff}`,
            element: <MobileDayOffPage />,
          },
          {
            path: `/m/${routerMainPath.app}/${routerParams.app.profile}`,
            element: <MobileProfilePage />,
          },
        ],
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
