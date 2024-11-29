import axios from "axios";
import * as React from "react";
import { CgCalendar } from "react-icons/cg";
import { FaCalendarCheck, FaChartPie } from "react-icons/fa";
import { FaSackDollar } from "react-icons/fa6";
import { GiPayMoney } from "react-icons/gi";
import { useMobileAppStore } from "../../../store/mobile.app";
import { useTranslation } from "react-i18next";

export interface ILuongProps {}

export default function WagePage2(props: ILuongProps) {
  const [phanLoaiLuongData, setphanLoaiLuongData] = React.useState({});
  const [loaiLuong, setLoaiLuong] = React.useState("1");
  const [thangLuong, setThangLuong] = React.useState("202408");
  const [chitietLuong, setChiTietLuong] = React.useState({});
  const [chitietthangluong, setchitietthangluong] = React.useState({});

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
    const dulieuApi = await axios.post("/api/MSalaryInformation", {
      PayYYMM: thangLuong,
      ProvType: loaiLuong,
      EntCode: entCode,
      EmpCode: empCode,
    });
    setChiTietLuong(dulieuApi.data);
  };
  const thangluong = async () => {
    const dulieuapi = await axios.post("/api/MSelectList", {
      DIV: "PAY_YYMM",
      Data: thangLuong,
      EntCode: entCode,
      EmpCode: empCode,
    });
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
    setHeader(t("header.wage"));
  }, [t]);

  return (
    <div className="w-screen bg-blue-300 pb-6 pt-16">
      <div className="px-4">
        <div className="h-28 rounded-md bg-blue-200 py-4">
          <div className="mx-4 rounded-md bg-white px-2 py-1">
            <div className="flex h-10 items-center justify-start gap-4">
              <p className="w-32">Tháng chi trả:</p>
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
              <p className="w-32">Phân loại lương :</p>
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
        <div className="mt-4 rounded-md bg-blue-200 pb-4">
          <div className="ml-4 flex items-start gap-2 py-1">
            <FaSackDollar className="text-blue-500" />
            <p className="text-sm font-bold italic text-gray-500">
              Chi tiết chi trả
            </p>
          </div>
          <div className="rounded-md"></div>
          <div className="h-74 mx-4 rounded-md bg-white pb-4 pr-4 pt-2">
            <table className="w-full text-center">
              <tbody className="">
                <tr className="border-b text-lg font-medium text-blue-600">
                  <td className="pb-2">Tên</td>
                  <td>Số Tiền</td>
                </tr>
                {chitietLuong?.Table?.map((luong, vitri) => {
                  return (
                    <tr key={vitri}>
                      <td className="py-1.5 text-gray-500">{luong.ALLOW_NM}</td>
                      <td className="text-lg">
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
            <FaCalendarCheck className="text-blue-500" />
            <p className="text-sm font-bold italic text-gray-500">
              Chi tiết chấm công
            </p>
          </div>
          <div className="rounded-md"></div>
          <div className="h-74 mx-4 rounded-md bg-white pb-4 pr-4 pt-2">
            <table className="w-full text-center">
              <tbody className="">
                <tr className="border-b text-sm font-medium text-blue-600">
                  <td className="pb-2">Tên</td>
                  <td>Số lần</td>
                  <td>Số giờ</td>
                  <td>Số phút</td>
                </tr>
                {chitietLuong?.Table1?.map((item, vitri) => {
                  return (
                    <tr key={vitri}>
                      <td className="py-1.5 text-gray-500">{item.DILIG_NM}</td>
                      <td>{item.DILIG_CNT}</td>
                      <td>{item.DILIG_HH}</td>
                      <td>{item.DILIG_MM}</td>
                    </tr>
                  );
                  // return (
                  //   <tr key={viTri}>
                  //     <td>{item.DILIG_NM}</td>
                  //     <td>{item.DILIG_CNT}</td>
                  //     <td>{item.DILIG_HH}</td>
                  //     <td>{item.DILIG_MM}</td>
                  //   </tr>
                  // );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 rounded-md bg-blue-200 pb-4">
          <div className="ml-4 flex items-start gap-2 py-1">
            <GiPayMoney className="text-blue-500" />
            <p className="text-sm font-bold italic text-gray-500">
              Chi tiết khấu trừ
            </p>
          </div>
          <div className="rounded-md"></div>
          <div className="h-74 mx-4 rounded-md bg-white pb-4 pr-4 pt-2">
            <table className="w-full text-center">
              <tbody className="">
                <tr className="border-b text-sm font-medium text-blue-600">
                  <td className="pb-2">Tên</td>
                  <td>Số tiền</td>
                </tr>
                {chitietLuong?.Table2?.map((item, vitri) => {
                  return (
                    <tr key={vitri}>
                      <td className="py-1.5 text-gray-500">{item.SUB_NM}</td>
                      <td>{item.SUB_AMT}</td>
                    </tr>
                  );
                  // return (
                  //   <tr key={viTri}>
                  //     <td>{item.DILIG_NM}</td>
                  //     <td>{item.DILIG_CNT}</td>
                  //     <td>{item.DILIG_HH}</td>
                  //     <td>{item.DILIG_MM}</td>
                  //   </tr>
                  // );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-4 rounded-md bg-blue-200 pb-4">
          <div className="ml-4 flex items-start gap-2 py-1">
            <FaChartPie className="text-blue-500" />
            <p className="text-sm font-bold italic text-gray-500">Tổng kết</p>
          </div>
          <div className="rounded-md"></div>
          <div className="h-74 mx-4 rounded-md bg-white pb-4 pr-4 pt-2">
            <table className="w-full text-center">
              <tbody className="">
                <tr className="border-b text-sm font-medium text-blue-600">
                  <td className="pb-2">Tổng lương</td>
                  <td className="pb-2">Tổng khấu trừ</td>
                  <td className="pb-2">Thực lĩnh</td>
                </tr>
                {chitietLuong?.Table3?.map((item, vitri) => {
                  return (
                    <tr key={vitri}>
                      <td className="text-green-600">{item.PROV_TOT_AMT}</td>
                      <td className="text-red-400">{item.SUB_TOT_AMT}</td>
                      <td className="font-medium">{item.REAL_PROV_AMT}</td>
                    </tr>
                  );
                  // return (
                  //   <tr key={viTri}>
                  //     <td>{item.DILIG_NM}</td>
                  //     <td>{item.DILIG_CNT}</td>
                  //     <td>{item.DILIG_HH}</td>
                  //     <td>{item.DILIG_MM}</td>
                  //   </tr>
                  // );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* <div className="mt-4 h-48 rounded-md bg-blue-200">
          Chi tiết chấm công
          <div className="mx-4 h-36 rounded-md bg-white px-2 py-1">
            <table className="w-full px-2 py-1 text-center">
              <tbody>
                <tr>
                  <td>Tên</td>
                  <td>Số Lần</td>
                  <td>Số Giờ</td>
                  <td>Số Phút</td>
                </tr>

                {chitietLuong?.Table1?.map((item, viTri) => {
                  return (
                    <tr key={viTri}>
                      <td>{item.DILIG_NM}</td>
                      <td>{item.DILIG_CNT}</td>
                      <td>{item.DILIG_HH}</td>
                      <td>{item.DILIG_MM}</td>
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
                  <td>Tên</td>
                  <td>Số Tiền</td>
                </tr>
                <tr>
                  <td>-</td>Tiền Công Đoàn
                </tr>
                <tr>
                  <td>-</td>Bảo Hiểm Xã Hội
                </tr>
                <tr>
                  <td>-</td>Bảo Hiểm Y Tế
                </tr>
                <tr>
                  <td>-</td>Bảo Hiểm Thất Nghiệp
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <td>Tổng Lương</td>
                <td>Tổng Khấu Trừ</td>
                <td>Thực Lĩnh</td>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div> */}
      </div>
    </div>
  );
}
