import { RouterProvider } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./locales/i18n";
import { router } from "./routes/routes";

export interface IAppProps {}

const queryClient = new QueryClient();

export default function App(props: IAppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer />
    </QueryClientProvider>
    // <BrowserRouter>
    // <Routes>
    //   <Route path="/m/auth" element={<MAuthLayout />}>
    //     <Route index element={<MSignInPage />} />
    //   </Route>
    //   <Route path="*" element={<NotFound />} />
    // </Routes>
    // </BrowserRouter>
  );
}

const NotFound = () => <div>404</div>;
