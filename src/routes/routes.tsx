import { createBrowserRouter } from "react-router-dom";
import { routerParams } from "../config/router";
import MAuthLayout from "../layouts/mobile/auth";
import MobileMainLayout from "../layouts/mobile/main";
import Asset from "../pages/mobile/asset/asset";
import Attendant from "../pages/mobile/attendant/attendant";
import MSignInPage from "../pages/mobile/auth/signIn";
import MobileHomePage from "../pages/mobile/home/home";
import HomePageNew from "../pages/mobile/new-home/onepage";
import MobileProfilePage from "../pages/mobile/profile/profile";
import MobileWage1 from "../pages/mobile/wage-1/home";
import { SpamAlert } from "./blocked_ip";
import WagePage2 from "../pages/mobile/wage2/page";
import Information from "../pages/mobile/infomation/page";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MobileMainLayout />,
    // loader: rootLoader,
    children: [
      {
        path: `/`,
        element: <WagePage2 />,
        // element: <MobileHomePage />,
      },
      {
        path: `/${routerParams.app.wage}`,
        element: <WagePage2 />,
      },
      {
        path: `/attendant`,
        element: <Attendant />,
      },
      {
        path: `/asset`,
        element: <Asset />,
      },
      {
        path: `/infomation`,
        element: <Information />,
      },

      // {
      //   path: `/spam_alert`,
      //   element: (
      //     <MAuthLayout>
      //       <SpamAlert />,
      //     </MAuthLayout>
      //   ),
      // },
    ],
  },
]);
