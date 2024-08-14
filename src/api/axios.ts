import axios from "axios";
import { getCookie } from "../lib/utlis";

// const backendDomain = process.env.REACT_APP_BACKEND_DOMAIN;
// const backendDomain = "172.16.151.129:5000";

const api = axios.create({
  baseURL: "https://172.16.151.7:5000/api",
  timeout: 5000,
  // headers: {
  //   Authentication: "Bearer " + getCookie("auth"),
  // },
});

api.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    config.headers.Authentication = "Bearer " + getCookie("auth");
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

// Add a response interceptor
api.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    console.log("vào đc đây khum?", error);
    if (error.code === "ERR_NETWORK") {
      if (confirm("Lỗi đường truyên. Kiểm tra kết nối dữ liệu?")) {
        window.location.href = "https://172.16.151.7:5000";
        // window.open("https://172.16.151.7:5000", "_blank");
      }
    }
    if (error?.response?.status == 401) window.location.href = "/";
    return Promise.reject(error);
  },
);

export const httpGet = async (pathname: string, params?: object) => {
  const data = await api.get(pathname, {
    params,
  });
  return data;
};

export const httpPost = async (pathname: string, body?: object) => {
  const data = await api.post(pathname, body);
  return data;
};
