import { httpGet, httpPost } from "../../../api/axios";

export const handleLogin = async (username: string, password: string) => {
  // try {
  return await httpPost("login", { emp_no: username, password });
  // } catch (error) {
  //   alert("mayf cheets looix chiut miaj ma luoon");
  //   throw new e
  // }
};
