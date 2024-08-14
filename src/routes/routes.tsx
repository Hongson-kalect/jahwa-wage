import * as React from "react";
import * as ReactDOM from "react-dom";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MobileMainLayout from "../layouts/mobile/main";
import MAuthLayout from "../layouts/mobile/auth";
import MSignInPage from "../pages/mobile/auth/signIn";
import { routerMainPath, routerParams } from "../config/router";
import MobileAppLayout from "../layouts/mobile/app";
import MobileHomePage from "../pages/mobile/home/home";
import MobileWagePage from "../pages/mobile/wage/wage";
import MobileDayOffPage from "../pages/mobile/dayoff/dayOff";
import MobileProfilePage from "../pages/mobile/profile/profile";
import HomePageNew from "../pages/mobile/new-home/onepage";
import MobileDayCheckPage from "../pages/mobile/daycheck/daycheck";

export const router = createBrowserRouter([
  {
    path: "/m",
    element: <MobileMainLayout />,
    // loader: rootLoader,
    children: [
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
            element: <MobileHomePage />,
          },
          {
            path: `/m/${routerMainPath.app}/${routerParams.app.dayCheck}`,
            element: <MobileDayCheckPage />,
          },
          {
            path: `/m/${routerMainPath.app}/${routerParams.app.wage}`,
            element: <MobileWagePage />,
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
