import { useQuery } from "@tanstack/react-query";
import { Empty, Skeleton } from "antd";
import axios from "axios";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { FaChartPie, FaCodeBranch } from "react-icons/fa";
import { FaUserTie } from "react-icons/fa6";
import {
  MdCalendarMonth,
  MdOutlineCreditCard,
  MdOutlineCreditCardOff,
} from "react-icons/md";
import { useMobileAppStore } from "../../../store/mobile.app";
import { useUserInfoStore } from "../../../store/userinfo";
import { WorkData, WorkMonth, WorkType } from "../wage-1/interface";
import { getRawCookie } from "../../../lib/utlis";
import { LuCalendarClock } from "react-icons/lu";
import { HiCash } from "react-icons/hi";

export interface ILuongProps {}

export default function WagePage2(props: ILuongProps) {
  const { user } = useUserInfoStore();
  const [loaiLuong, setLoaiLuong] = React.useState("1");
  const [thangLuong, setThangLuong] = React.useState(
    new Date().getFullYear().toString() + new Date().getMonth() || 12,
  );

  const imgUrl = React.useMemo(() => {
    return (
      "https://gw.jahwa.co.kr/Photo/" +
      decodeURIComponent(getRawCookie("Photo") || "")
    );
  }, []);

  const { setHeader, entCode, empCode } = useMobileAppStore();
  const { t } = useTranslation();

  const phanLoaiLuong = async () => {
    const dulieuApi = await axios.post("/api/MSelectList", {
      DIV: "PROV_TYPE",
      Data: thangLuong,
      EntCode: entCode,
      EmpCode: empCode,
    });

    return dulieuApi.data;
  };

  const chiTietChiTra = async () => {
    const dulieuApi = await axios.post("/api/MSalaryInformation", {
      PayYYMM: thangLuong,
      ProvType: loaiLuong,
      EntCode: entCode,
      EmpCode: empCode,
    });
    return dulieuApi.data;
  };

  const thangluongQuery = useQuery<WorkMonth>({
    queryKey: ["thangluong"],
    queryFn: () => thangluong(),
  });
  const phanloaiQuery = useQuery<WorkType>({
    queryKey: ["phanLoaiLuong"],
    queryFn: () => phanLoaiLuong(),
  });
  const chitietQuery = useQuery<WorkData>({
    queryKey: ["chi tiet", thangLuong, loaiLuong],
    queryFn: () => chiTietChiTra(),
  });
  const thangluong = async () => {
    const dulieuapi = await axios.post("/api/MSelectList", {
      DIV: "PAY_YYMM",
      Data: thangLuong,
      EntCode: entCode,
      EmpCode: empCode,
    });
    if (
      !dulieuapi?.data?.Table?.find(
        (item: { Code: string; Name: string }) => item.Code === thangLuong,
      )
    ) {
      dulieuapi.data.Table = [
        { Code: thangLuong, Name: thangLuong },
        ...dulieuapi.data.Table,
      ];
    }
    return dulieuapi.data;
  };

  React.useEffect(() => {
    phanLoaiLuong();

    thangluong();
  }, []);

  React.useEffect(() => {
    chiTietChiTra();
  }, [thangLuong, loaiLuong]);

  React.useEffect(() => {
    setHeader(t("wagePage.title"));
  }, [t]);

  return (
    <>
      <div className="w-full bg-blue-200 p-2">
        <div>
          <div className="rounded-xl bg-blue-100 p-3">
            <div className="rounded-xl bg-white p-2 shadow-inner shadow-gray-800">
              <div className="flex items-end gap-4"></div>
              <div className="flex items-center justify-between">
                <div className="flex h-10 items-center justify-start gap-2">
                  {/* <p className="w-12">{t("wagePage.payRollMonth")}:</p> */}
                  <LuCalendarClock size={24} className="text-gray-500" />
                  {!thangluongQuery?.data?.Table ? (
                    <Skeleton.Input active />
                  ) : (
                    <select
                      className="h-7 w-24 border-none px-1 font-bold text-gray-600 shadow-none outline-none duration-200"
                      value={thangLuong}
                      onChange={(event) => setThangLuong(event.target.value)}
                    >
                      {thangluongQuery?.data?.Table?.map((item, viTri) => {
                        return (
                          <option
                            key={viTri}
                            value={item.Code}
                            className="pl-2 text-sm font-medium text-gray-700"
                          >
                            {item.Name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
                <div className="flex h-10 items-center gap-2">
                  <FaCodeBranch size={24} className="text-gray-500" />
                  {/* <p>{t("wagePage.payRollType")}:</p> */}
                  {!phanloaiQuery.data?.Table ? (
                    <Skeleton.Input active />
                  ) : (
                    <select
                      className="h-7 w-32 border-none px-1 font-bold text-gray-600 shadow-none outline-none duration-200"
                      value={loaiLuong}
                      onChange={(event) => setLoaiLuong(event.target.value)}
                    >
                      {phanloaiQuery.data?.Table?.map((item, viTri) => {
                        return (
                          <option
                            key={viTri}
                            value={item.Code}
                            className="text-sm text-gray-700"
                          >
                            {item.Name}
                          </option>
                        );
                      })}
                    </select>
                  )}
                </div>
              </div>
            </div>
          </div>

          {chitietQuery.isLoading ? (
            <div className="mt-2 rounded-xl bg-blue-100 p-2">
              <div className="rounded-xl bg-white">
                <Skeleton active />
                <Skeleton className="mt-4" active />
              </div>
            </div>
          ) : !chitietQuery?.data?.Table?.length ? (
            <div className="mt-8 flex h-full flex-1 flex-col items-center justify-center rounded-lg bg-blue-100 pb-6 pt-4">
              <Empty description={t("common.noData")} />
            </div>
          ) : (
            <>
              <div className="mt-4 rounded-xl bg-blue-100 p-3">
                <div className="rounded-xl bg-white p-2">
                  <div className="ml-2 flex items-center gap-2 py-1">
                    <HiCash size={24} className="mt-[1px]" />
                    <p className="font-bold text-gray-900">
                      {t("wagePage.payRollDetail")}
                    </p>
                  </div>
                  <div className="ml-3 bg-white pt-2 text-gray-500">
                    <table className="w-full px-2">
                      <tbody>
                        {chitietQuery?.data?.Table?.map((luong, vitri) => (
                          <tr key={vitri}>
                            <td
                              // style={{ borderBottom: "1px solid #eaeaea" }}
                              className="py-1.5 text-gray-500"
                            >
                              {t("wage." + luong.ALLOW_CD)}
                            </td>
                            <td
                              // style={{ borderBottom: "1px solid #eaeaea" }}
                              className="text-right text-gray-500"
                            >
                              {luong.ALLOW}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-blue-100 p-3">
                <div className="rounded-xl bg-white p-2">
                  <div className="ml-2 flex items-center gap-2 py-1">
                    <MdCalendarMonth size={24} className="mt-[1px]" />
                    <p className="font-bold text-gray-900">
                      {t("wagePage.timeCheckDetail")}
                    </p>
                  </div>
                  <div className="rounded-md"></div>
                  <div className="ml-3 bg-white pb-2 pt-2">
                    <table className="w-full px-2">
                      <tbody className="">
                        <tr className="border-b text-sm font-medium text-blue-500">
                          <td></td>
                          <td className="pl-2 text-right"></td>
                        </tr>
                        {chitietQuery?.data?.Table1?.map((item, vitri) => {
                          return (
                            <tr key={vitri}>
                              <td className="py-1.5 text-gray-500">
                                {t("deduct." + item.DILIG_CD)}
                              </td>
                              <td className="pr-1 text-right text-gray-500">
                                {item.DILIG_HH ? item.DILIG_HH + ":" : ""}
                                {item.DILIG_MM.toString().padStart(2, "0")}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-blue-100 p-3">
                <div className="rounded-xl bg-white p-2">
                  <div className="ml-2 flex items-center gap-2 py-1">
                    <MdOutlineCreditCardOff size={24} className="mt-[1px]" />
                    <p className="font-bold text-gray-900">
                      {t("wagePage.deductDetail")}
                    </p>
                  </div>
                  <div className="rounded-md"></div>
                  <div className="ml-3 rounded-md bg-white pt-2">
                    <table className="w-full">
                      <tbody className="">
                        {chitietQuery?.data?.Table2?.map((item, vitri) => {
                          return (
                            <tr key={vitri}>
                              <td className="py-1.5 text-gray-500">
                                {t("wage." + item.SUB_CD)}
                              </td>
                              <td className="text-right text-gray-500">
                                {item.SUB_AMT}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-blue-100 p-3">
                <div className="rounded-xl bg-white p-2">
                  {/* <div className="ml-2 flex items-center gap-2 py-1">
                    <FaChartPie size={28} className="mt-[1px]" />
                    <p className="text-lg font-bold uppercase text-gray-900">
                      {t("wagePage.sumary")}
                    </p>
                  </div> */}
                  <div className="rounded-md"></div>
                  <div className="ml-3 rounded-md bg-white pb-4 pt-2">
                    <table className="w-full">
                      <tbody className="font-bold">
                        <tr>
                          <td className="pt-0.5 font-medium uppercase text-gray-700">
                            {t("common.totalPay")}
                          </td>
                          <td className="text-right">
                            {chitietQuery?.data?.Table3?.[0]?.PROV_TOT_AMT}
                          </td>
                        </tr>
                        <tr>
                          <td className="pt-0.5 font-medium uppercase text-gray-700">
                            {t("common.totalDeduct")}
                          </td>
                          <td className="text-right">
                            {chitietQuery?.data?.Table3?.[0]?.SUB_TOT_AMT}
                          </td>
                        </tr>
                        <tr>
                          <td className="pt-0.5 font-medium uppercase text-gray-700">
                            {t("common.totalPayment")}
                          </td>
                          <td className="text-right">
                            {chitietQuery?.data?.Table3?.[0]?.REAL_PROV_AMT}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
