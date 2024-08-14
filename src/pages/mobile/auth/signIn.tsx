import { TextField } from "@mui/material";
import { useMutation } from "@tanstack/react-query";
import * as React from "react";
import { BsEyeFill, BsEyeSlashFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { handleLogin } from "./utils";
import { AxiosError } from "axios";
import { useUserInfoStore } from "../../../store/userinfo";
import jahwaLogo from "../../../assets/images/icon3.png";
import jahwaBG from "../../../assets/images/jahwa_view.png";
import { Button, Col } from "antd";
import { useTranslation } from "react-i18next";
import { setCookie } from "../../../lib/utlis";
import { httpGet } from "../../../api/axios";

export interface IMSignInPageProps {}

const SinginPage = styled.div``;

export default function MSignInPage(props: IMSignInPageProps) {
  return (
    <SinginPage
      className="flex flex-1 bg-white"

      // style={{ borderTopRightRadius: "40px", borderTopLeftRadius: "40px" }}
    >
      <div
        className="-z-1 fixed h-screen w-screen"
        style={{
          background: `linear-gradient(180deg, rgba(94, 94, 94, 0.6) 0%, rgba(186,179,179,0.8) 70%, rgba(68,68,68,0.9) 100%), url(${jahwaBG})  center center / cover no-repeat`,
        }}
      ></div>
      <div className="flex w-full flex-1 flex-col items-center justify-center pt-6">
        {/* <p className="text-2xl font-semibold text-primary-1">Jahwa Salary</p>
        <p className="text-xs font-bold text-gray-500">
          Hello there, sign in to access app
        </p> */}
        {/* <div
          className="h-1/4 w-2/3"
          style={{
            margin: "auto",
            background:
              "url(https://cms.vietnamreport.net/source/LogoBusiness/jahwa_logo.jpg) center center / contain no-repeat",
          }}
        > */}
        {/* <div className="logo h-full w-full bg-primary-3 py-4"></div> */}
        {/* </div> */}
        <SignInForm />
      </div>
    </SinginPage>
  );
}

const SignInForm = () => {
  const [showPass, setShowPass] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [action, setAction] = React.useState("");
  const { setEmp_no, setUser, setIsLogin } = useUserInfoStore();
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: () => handleLogin(username, password),
    onSuccess: async (res) => {
      await setCookie("auth", res.data.token, 1);
      await setCookie("emp_no", username, 1);
      setIsLogin(true);
      setEmp_no(username);
      navigate("/m/app/home");
    },
    onError: (error: AxiosError) => {
      console.log("asdlkasd", error);
      if (error.response?.status === 404) {
        setAction("Mật khẩu hoặc tài khoản không đúng");
      } else {
        setAction("Có lỗi khi đăng nhập");
      }
    },
  });

  React.useEffect(() => {
    if (action) {
      setAction("");
    }
  }, [username, password]);

  return (
    <div className="container">
      <div className="flex w-full items-center justify-center">
        <Col
          className="relative flex-col items-center rounded-md bg-white p-8 pt-0 text-black shadow-lg shadow-black"
          lg={8}
          md={12}
          sm={16}
          xs={20}
          // style={{ minWidth: "300px" }}
        >
          <div className="mb-2 flex justify-center">
            <div
              className="bg h-16 w-1/2 bg-red-400"
              style={{
                background: `url(${jahwaLogo}) center center / contain no-repeat`,
              }}
            ></div>
          </div>
          <div className="mb-1 text-center text-xl font-bold text-[#1e0e4b]">
            {t("loginPage.welcome")}
          </div>
          <div className="mb-2 text-center text-2xl font-bold text-[#7747ff]">
            Jahwa "Nương"
          </div>
          {loginMutation.isPending ? (
            <p className="h-10 text-center text-gray-500">Loading...</p>
          ) : (
            <p className="h-10 text-center text-error">{action || ""}</p>
          )}
          {/* <div className="mb-4 text-center font-normal text-[#1e0e4b]"> */}
          {/* Đăng nhập */}
          {/* </div> */}
          <form
            className="flex w-full flex-col gap-3"
            onSubmit={(e) => {
              e.preventDefault();
              loginMutation.mutate();
            }}
          >
            <div className="relative block">
              <label
                htmlFor="email"
                className="mb-1 block cursor-text font-normal leading-[140%] text-gray-700"
              >
                {t("loginPage.username")}
              </label>
              <input
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                type="text"
                id="email"
                className="m-0 block h-10 w-full appearance-none rounded border border-gray-300 p-[11px] font-semibold leading-[18px] tracking-[0px] text-black caret-green-600 outline-0 ring-green-600 ring-offset-2 focus:ring-2"
              />
              <p className="mt-1 text-sm text-red-600">
                {/* {validateData.find((item) => item.field === "username")?.message} */}
              </p>
            </div>
            <div className="relative block">
              <label
                htmlFor="password"
                className="mb-1 block cursor-text font-normal leading-[140%] text-gray-700"
              >
                {t("loginPage.password")}
              </label>

              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                id="password"
                className="m-0 block h-10 w-full appearance-none rounded border border-gray-300 p-[11px] font-semibold leading-[18px] tracking-[0px] text-black caret-green-600 outline-0 ring-green-600 ring-offset-2 focus:ring-2"
              />
              <p className="mt-1 text-sm text-red-600">
                {/* {validateData.find((item) => item.field === "password")?.message} */}
              </p>
            </div>

            <div className="flex items-center justify-between gap-2 px-2">
              <div className="flex items-center gap-2">
                <input
                  className="scale-125"
                  type="checkbox"
                  name="remember"
                  id="remember"
                />
                <p className="text-sm italic text-blue-600">
                  {t("loginPage.saveAccount")}
                </p>
              </div>
              <div>
                <a className="text-xs italic text-[#7747ff]" href="#">
                  {t("loginPage.forgotAccount")}
                </a>
              </div>
            </div>
            <Button
              loading={loginMutation.isPending}
              // disabled={loginMutation.isPending}
              size="large"
              type="primary"
              className="m-auto w-full rounded px-6 py-2 text-lg text-white"
              htmlType="submit"
            >
              {t("loginPage.login")}
            </Button>
          </form>
          <div className="mt-[1.6rem] text-center text-sm">
            {t("loginPage.newMember")}{" "}
            <a className="text-sm text-[#7747ff]" href="#">
              {t("loginPage.createPassword")}
            </a>
          </div>
          {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
        </Col>
      </div>
    </div>
    // <form
    //   className="sign-in-form flex w-full flex-1 flex-col"
    //   onSubmit={(e) => {
    //     e.preventDefault();
    //     //validate here
    //     loginMutation.mutate();
    //   }}
    // >
    //   <p className="my-2 h-4 text-center text-sm text-error">{error}</p>
    //   <p className="text-gray-400">Mã nhân viên:</p>
    //   <TextField
    //     name="id"
    //     size="small"
    //     value={username}
    //     onChange={(e) => {
    //       error && setError("");
    //       setUsername(e.target.value);
    //     }}
    //     placeholder="V22..."
    //     spellCheck={false}
    //     className="rounded bg-white placeholder-shown:bg-gray-500 [&_input]:font-semibold"
    //   />
    //   <p className="mt-4 text-gray-400">Mật khẩu:</p>
    //   <div className="relative">
    //     <TextField
    //       // error
    //       // helperText="Password may not correct"
    //       value={password}
    //       onChange={(e) => {
    //         error && setError("");
    //         setPassword(e.target.value);
    //       }}
    //       type={showPass ? "input" : "password"}
    //       size="small"
    //       name="password"
    //       className="w-full bg-white font-bold text-red-600 focus-within:bg-white [&_input]:!pr-12 [&_input]:font-semibold"
    //     />
    //     <div
    //       className="absolute right-4 top-2.5 inline-block"
    //       onClick={() => setShowPass(!showPass)}
    //     >
    //       {!showPass ? (
    //         <BsEyeFill color="gray" size={20} />
    //       ) : (
    //         <BsEyeSlashFill color="gray" size={20} />
    //       )}
    //     </div>
    //   </div>
    //   <Button
    //     variant="contained"
    //     type="submit"
    //     className="text-gray-1 !mt-10 h-12 w-full rounded-2xl bg-primary-3 px-16 text-lg text-white"
    //   >
    //     Đăng nhập
    //   </Button>
    //   <div className="mt-2 flex items-center justify-center gap-2 text-sm italic text-primary">
    //     <p>Quên mật khẩu</p>
    //     <div className="h-3/4" style={{ borderLeft: "1px solid gray" }}></div>
    //     <p>Đổi mật khẩu</p>
    //   </div>
    // </form>
  );
};
