import axios from "axios";
import * as React from "react";
import { CgCalendar } from "react-icons/cg";
import { FaCalendarCheck, FaChartPie } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { useMobileAppStore } from "../../../store/mobile.app";
import { useTranslation } from "react-i18next";
import {
  MdCalendarMonth,
  MdOutlineCreditCard,
  MdOutlineCreditCardOff,
} from "react-icons/md";
import { Empty } from "antd";

export interface ILuongProps {}

export default function WagePage2(props: ILuongProps) {
  const [phanLoaiLuongData, setphanLoaiLuongData] = React.useState({});
  const [loaiLuong, setLoaiLuong] = React.useState("1");
  const [thangLuong, setThangLuong] = React.useState(
    new Date().getFullYear().toString() + new Date().getMonth() || 12,
  );
  const [chitietLuong, setChiTietLuong] = React.useState({});
  const [chitietthangluong, setchitietthangluong] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);

  const { setHeader, entCode, empCode } = useMobileAppStore();
  const { t } = useTranslation();

  const phanLoaiLuong = async () => {
    const dulieuApi = await axios.post("/api/MSelectList", {
      DIV: "PROV_TYPE",
      Data: loaiLuong,
      EntCode: entCode,
      EmpCode: empCode,
    });

    setphanLoaiLuongData(dulieuApi.data);
  };

  const chiTietChiTra = async () => {
    setIsLoading(true);
    const dulieuApi = await axios.post("/api/MSalaryInformation", {
      PayYYMM: thangLuong,
      ProvType: loaiLuong,
      EntCode: entCode,
      EmpCode: empCode,
    });
    setChiTietLuong(dulieuApi.data);
    setIsLoading(false);
  };
  const thangluong = async () => {
    const dulieuapi = await axios.post("/api/MSelectList", {
      DIV: "PAY_YYMM",
      Data: thangLuong,
      EntCode: entCode,
      EmpCode: empCode,
    });
    if (!dulieuapi?.data?.Table?.find((item) => item.Code === thangLuong)) {
      dulieuapi.data.Table = [
        { Code: thangLuong, Name: thangLuong },
        ...dulieuapi.data.Table,
      ];
    }

    console.log("dulieuapi.data :>> ", dulieuapi.data);
    setchitietthangluong(dulieuapi.data);
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

  // if (true)
  //   return (
  //     <div className="h-full w-screen flex-1 bg-blue-300 pb-6 pt-16 opacity-60">
  //       <div className="flex h-full flex-col items-center justify-center text-center">
  //         <p className="text-5xl text-white">JAHWA</p>
  //         <p className="mt-4">Loading...</p>
  //       </div>
  //     </div>
  //   );

  return (
    <>
      {isLoading && (
        <div className="absolute bottom-0 left-0 right-0 top-14 h-full w-screen flex-1 bg-black pb-6 opacity-60">
          <div className="flex h-full flex-col items-center justify-center text-center">
            <p className="text-3xl text-white">JAHWA</p>
            <p className="mt-4 text-gray-200">Loading...</p>
          </div>
        </div>
      )}

      <div className="w-screen bg-blue-300 pb-6 pt-16">
        <div className="px-4">
          <div className="h-28 rounded-md bg-blue-200 py-4">
            <div className="mx-4 rounded-md bg-white px-2 py-1">
              <div className="flex h-10 items-center justify-start gap-4">
                <p className="w-32">{t("wagePage.payRollMonth")}:</p>
                {!chitietthangluong?.Table ? (
                  <div>Loading...</div>
                ) : (
                  <select
                    className="h-8 w-24 px-1"
                    value={thangLuong}
                    onChange={(event) => setThangLuong(event.target.value)}
                  >
                    {chitietthangluong?.Table?.map((item, viTri) => {
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
              <div className="flex h-10 items-center gap-4">
                <p className="w-32">{t("wagePage.payRollType")}:</p>
                {!phanLoaiLuongData?.Table ? (
                  <div>Loading...</div>
                ) : (
                  <select
                    className="h-8 w-40 px-1"
                    value={loaiLuong}
                    onChange={(event) => setLoaiLuong(event.target.value)}
                  >
                    {phanLoaiLuongData?.Table?.map((item, viTri) => {
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

          {!chitietLuong?.Table?.length ? (
            <div className="mt-8 flex h-full flex-1 flex-col items-center justify-center rounded-lg bg-white pb-6 pt-4">
              <Empty description="Chưa có lương tháng này" />
            </div>
          ) : (
            <>
              <div className="mt-4 rounded-md bg-blue-200 pb-4">
                <div className="ml-4 flex items-start gap-2 py-1">
                  <MdOutlineCreditCard
                    size={18}
                    className="mt-[1px] text-blue-400"
                  />
                  <p className="text-sm font-bold italic text-gray-500">
                    {t("wagePage.payRollDetail")}
                  </p>
                </div>
                <div className="rounded-md"></div>
                <div className="h-74 mx-4 rounded-md bg-white pb-4 pt-2">
                  <table className="w-full px-2">
                    <tbody className="">
                      <tr className="border-b text-lg font-medium text-blue-600">
                        <td className="text-sm">{t("common.name")}</td>
                        <td className="text-sm">{t("common.ammount")}</td>
                      </tr>
                      {chitietLuong?.Table?.map((luong, vitri) => {
                        return (
                          <tr key={vitri}>
                            <td
                              style={{ borderBottom: "1px solid #eaeaea" }}
                              className="py-1.5 text-gray-500"
                            >
                              {/* {luong.ALLOW_NM} */}
                              {t("wage." + luong.ALLOW_CD)}
                            </td>
                            <td
                              style={{ borderBottom: "1px solid #eaeaea" }}
                              className="text-lg"
                            >
                              {luong.ALLOW}{" "}
                              {/* <span className="text-xs text-gray-500">đ</span> */}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 rounded-md bg-blue-200 pb-4">
                <div className="ml-4 flex items-start gap-2 py-1">
                  <MdCalendarMonth
                    size={18}
                    className="mt-[1px] text-blue-400"
                  />
                  <p className="text-sm font-bold italic text-gray-500">
                    {t("wagePage.timeCheckDetail")}
                  </p>
                </div>
                <div className="rounded-md"></div>
                <div className="h-74 mx-4 rounded-md bg-white pb-4 pt-2">
                  <table className="w-full px-2">
                    <tbody className="">
                      <tr className="border-b text-sm font-medium text-blue-600">
                        <td>{t("common.name")}</td>
                        <td>{t("common.times")}</td>
                        <td>{t("common.hour")}</td>
                        <td>{t("common.munite")}</td>
                      </tr>
                      {chitietLuong?.Table1?.map((item, vitri) => {
                        return (
                          <tr key={vitri}>
                            <td
                              style={{ borderBottom: "1px solid #eaeaea" }}
                              className="py-1.5 text-gray-500"
                            >
                              {t("deduct." + item.DILIG_CD)}
                            </td>
                            <td style={{ borderBottom: "1px solid #eaeaea" }}>
                              {item.DILIG_CNT}
                            </td>
                            <td style={{ borderBottom: "1px solid #eaeaea" }}>
                              {item.DILIG_HH}
                            </td>
                            <td style={{ borderBottom: "1px solid #eaeaea" }}>
                              {item.DILIG_MM}
                            </td>
                          </tr>
                        );
                        // return (
                        //   <tr key={viTri}>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_NM}</td>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_CNT}</td>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_HH}</td>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_MM}</td>
                        //   </tr>
                        // );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 rounded-md bg-blue-200 pb-4">
                <div className="ml-4 flex items-start gap-2 py-1">
                  <MdOutlineCreditCardOff
                    size={18}
                    className="mt-[1px] text-blue-400"
                  />
                  <p className="text-sm font-bold italic text-gray-500">
                    {t("wagePage.deductDetail")}
                  </p>
                </div>
                <div className="rounded-md"></div>
                <div className="h-74 mx-4 rounded-md bg-white pb-4 pt-2">
                  <table className="w-full px-2">
                    <tbody className="">
                      <tr className="border-b text-sm font-medium text-blue-600">
                        <td>{t("common.name")}</td>
                        <td>{t("common.ammount")}</td>
                      </tr>
                      {chitietLuong?.Table2?.map((item, vitri) => {
                        return (
                          <tr key={vitri}>
                            <td
                              style={{ borderBottom: "1px solid #eaeaea" }}
                              className="py-1.5 text-gray-500"
                            >
                              {t("wage." + item.SUB_CD)}
                            </td>
                            <td style={{ borderBottom: "1px solid #eaeaea" }}>
                              {item.SUB_AMT}
                            </td>
                          </tr>
                        );
                        // return (
                        //   <tr key={viTri}>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_NM}</td>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_CNT}</td>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_HH}</td>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_MM}</td>
                        //   </tr>
                        // );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mt-4 rounded-md bg-blue-200 pb-4">
                <div className="ml-4 flex items-start gap-2 py-1">
                  <FaChartPie size={18} className="mt-[1px] text-blue-400" />
                  <p className="text-sm font-bold italic text-gray-500">
                    {t("wagePage.sumary")}
                  </p>
                </div>
                <div className="rounded-md"></div>
                <div className="h-74 mx-4 rounded-md bg-white pb-4 pt-2">
                  <table className="w-full text-center">
                    <tbody className="">
                      <tr className="border-b text-sm font-medium text-blue-600">
                        <td>{t("common.totalPay")}</td>
                        <td>{t("common.totalDeduct")}</td>
                        <td>{t("common.totalPayment")}</td>
                      </tr>
                      {chitietLuong?.Table3?.map((item, vitri) => {
                        return (
                          <tr key={vitri}>
                            <td className="text-green-600">
                              {item?.PROV_TOT_AMT}
                            </td>
                            <td className="text-red-400">
                              {item?.SUB_TOT_AMT}
                            </td>
                            <td className="font-medium">
                              {item?.REAL_PROV_AMT}
                            </td>
                          </tr>
                        );
                        // return (
                        //   <tr key={viTri}>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_NM}</td>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_CNT}</td>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_HH}</td>
                        //     <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_MM}</td>
                        //   </tr>
                        // );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* <div className="mt-4 h-48 rounded-md bg-blue-200">
          Chi tiết chấm công
          <div className="mx-4 h-36 rounded-md bg-white px-2 py-1">
            <table className="w-full px-2 py-1 text-center">
              <tbody>
                <tr>
                  <td style={{borderBottom:'1px solid #eaeaea'}}>{t("common.name")}</td>
                  <td style={{borderBottom:'1px solid #eaeaea'}}>Số Lần</td>
                  <td style={{borderBottom:'1px solid #eaeaea'}}>Số Giờ</td>
                  <td style={{borderBottom:'1px solid #eaeaea'}}>Số Phút</td>
                </tr>

                {chitietLuong?.Table1?.map((item, viTri) => {
                  return (
                    <tr key={viTri}>
                      <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_NM}</td>
                      <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_CNT}</td>
                      <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_HH}</td>
                      <td style={{borderBottom:'1px solid #eaeaea'}}>{item.DILIG_MM}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-4 h-48 bg-blue-200">
          Chi tiết khấu trừ
          <div className="mx-4 h-36 rounded-md bg-white">
            <table>
              <tbody>
                <tr>
                  <td style={{borderBottom:'1px solid #eaeaea'}}>{t("common.name")}</td>
                  <td style={{borderBottom:'1px solid #eaeaea'}}>{t("common.ammount")}</td>
                </tr>
                <tr>
                  <td style={{borderBottom:'1px solid #eaeaea'}}>-</td>Tiền Công Đoàn
                </tr>
                <tr>
                  <td style={{borderBottom:'1px solid #eaeaea'}}>-</td>Bảo Hiểm Xã Hội
                </tr>
                <tr>
                  <td style={{borderBottom:'1px solid #eaeaea'}}>-</td>Bảo Hiểm Y Tế
                </tr>
                <tr>
                  <td style={{borderBottom:'1px solid #eaeaea'}}>-</td>Bảo Hiểm Thất Nghiệp
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td style={{borderBottom:'1px solid #eaeaea'}}>Tổng Lương</td>
                <td style={{borderBottom:'1px solid #eaeaea'}}>Tổng Khấu Trừ</td>
                <td style={{borderBottom:'1px solid #eaeaea'}}>Thực Lĩnh</td>
              </tr>
              <tr>
                <td style={{borderBottom:'1px solid #eaeaea'}}></td>
                <td style={{borderBottom:'1px solid #eaeaea'}}></td>
                <td style={{borderBottom:'1px solid #eaeaea'}}></td>
              </tr>
            </tbody>
          </table>
        </div> */}
        </div>
      </div>
    </>
  );
}
