import { httpGet, httpPost } from "../../../api/axios";

export const handleLogin = async (username: string, password: string) => {
  console.log("object", username, password);
  // try {
  return await httpPost("login", { emp_no: username, password });
  // } catch (error) {
  //   alert("mayf cheets looix chiut miaj ma luoon");
  //   throw new e
  // }
};
