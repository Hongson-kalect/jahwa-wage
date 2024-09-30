import * as React from "react";
import { BiSolidReport } from "react-icons/bi";
import { BsWalletFill } from "react-icons/bs";
import { FaChartLine, FaUsersCog } from "react-icons/fa";
import { FaAnglesDown, FaAnglesUp, FaBuildingUser } from "react-icons/fa6";
import { IoMail } from "react-icons/io5";
import {
  MdEditDocument,
  MdMapsHomeWork,
  MdOutlineNewspaper,
} from "react-icons/md";
import { SiGooglemaps } from "react-icons/si";
import styled from "styled-components";
import ContentWrap from "../../../../components/common/contentWrap";
import MobileHomeCalendar from "../../daycheck/components/calender";
import { DatePicker } from "antd";
import dayjs, { Dayjs } from "dayjs";
import { WorkType } from "../interface";
import MobileNews from "./news";
import { useTranslation } from "react-i18next";

export interface IContentProps {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  workData: { date: string; shift: string; data: WorkType[] }[];
}

export default function Content(props: IContentProps) {
  const [showCalendar, setShowCalendar] = React.useState(false);
  // const qq = () => {
  //   document.cookie.s;
  // };
  return (
    <ContentWrap style={{ display: "unset", gap: "4px" }} clasName="!gap-4">
      <div className={`relative`}>
        <SumaryInfo
          date={props.date}
          setDate={props.setDate}
          workData={props.workData}
        />
        {showCalendar && (
          <div
            className={`max-h-0 overflow-hidden duration-300`}
            style={{
              transition: "max-height 0.5s ease",
              maxHeight: showCalendar ? "1000px" : "0",
            }}
          >
            <div className="spliter mt-4"></div>
            <MobileHomeCalendar workData={props.workData} />
            <div className="spliter mt-2"></div>
          </div>
        )}
        <div
          className="absolute -bottom-3 left-1/2 z-[10] rounded-full bg-[#ffffffdd] px-2.5 py-1 text-center shadow-md shadow-black"
          style={{ animation: "float 1.5s ease-in-out infinite" }}
          onClick={() => setShowCalendar(!showCalendar)}
        >
          {showCalendar ? (
            <FaAnglesUp size={12} className="h-4 w-4" color="#555" />
          ) : (
            <FaAnglesDown size={12} className="h-4 w-4" color="#555" />
          )}
        </div>
      </div>
      {/* <div className={`${showCalendar ? "blur-sm" : ""}`}> */}
      <Menu />
      {/* </div> */}

      {/* <MobileNews /> */}
    </ContentWrap>
  );
}

const StyledInfo = styled.div`
  overflow: hidden;
  position: relative;
  /* &::before {
    content: "";
    z-index: 1;
    bottom: 50%;
    width: 120%;
    height: 240%;
    left: 20%;
    position: absolute;
    background-color: #06421d;
    /* height: 8px; */
    border-radius: 999999px;
  } */
  &::after {
    z-index: 5;
    rotate: 10deg;
    content: "";
    position: absolute;
    left: -5%;
    width: 10%;
    height: 1000%;
    top: -500%;
    /* transition: transform 0.4s ease-in-out; */
    background: linear-gradient(
      to right,
      transparent 1%,
      rgba(255, 255, 255, 0.05) 10%,
      rgba(255, 255, 255, 0.2) 50%,
      rgba(255, 255, 255, 0.05) 90%,
      transparent 100%
    );
    animation: choioi 5s 4s ease-in-out infinite;
    /* transform: translateX(1000%); */
  }

  @keyframes choioi {
    0% {
      transform: translateX(0);
    }
    /* 90% {
      transform: translateX(2000%);
    } */
    40% {
      transform: translateX(2010%);
    }
    100% {
      transform: translateX(2010%);
    }
  }
`;

type SumaryProps = {
  date: Dayjs;
  setDate: React.Dispatch<React.SetStateAction<dayjs.Dayjs>>;
  workData: { date: string; shift: string; data: WorkType[] }[];
};
const SumaryInfo = (props: SumaryProps) => {
  const { t } = useTranslation();

  const [workInfo, setWorkInfo] = React.useState({
    work: {
      day: 0,
      night: 0,
      sunday: 0,
      fes: 0,
    },
    ot: {
      day: 0,
      night: 0,
      sunday: 0,
      fes: 0,
    },
    dayOff: {
      total: 0,
      xRay: 0,
      used: 0,
      remain: 0,
    },
    eat: {
      day: 0,
      night: 0,
    },
  });

  const [bonus, setBonus] = React.useState<
    { id: number; name: string; time: number }[]
  >([]);

  React.useEffect(() => {
    const tempWorkInfo = {
      work: {
        day: 0,
        night: 0,
        sunday: 0,
        fes: 0,
      },
      ot: {
        day: 0,
        night: 0,
        sunday: 0,
        fes: 0,
      },
      dayOff: {
        total: 0,
        xRay: 0,
        used: 0,
        remain: 0,
      },
      eat: {
        day: 0,
        night: 0,
      },
    };
    const tempBonus: { id: number; name: string; time: number }[] = [];
    props.workData?.map((work) => {
      if (Number(work.shift) === 2) {
        tempWorkInfo.work.night += 1;
      } else {
        tempWorkInfo.work.day += 1;
      }
      if (new Date(work.date).getDay() === 0) {
        tempWorkInfo.work.sunday += 1;
      }

      work.data.map((dayDetail) => {
        if (dayDetail.dilig_cd) {
          let matchBonus = tempBonus.find(
            (item) => item.id === Number(dayDetail.dilig_cd),
          );
          if (!matchBonus) {
            matchBonus = {
              id: Number(dayDetail.dilig_cd),
              name: dayDetail.dilig_nm || "unknown",
              time: 0,
            };
            tempBonus.push(matchBonus);
          }
          matchBonus.time +=
            Number(dayDetail.dilig_hh) * 60 + Number(dayDetail.dilig_mm);
        }
      });
    });
    setWorkInfo(tempWorkInfo);
    setBonus(tempBonus);
  }, [props.workData]);

  return (
    <div className="relative">
      <div className="mb-2 flex items-center justify-between">
        <p className="font-medium">{t("common.monthReport")}</p>
        <div className="options">
          <DatePicker
            allowClear={false}
            inputReadOnly
            // contentEditable={false}
            value={props.date}
            onChange={(value) => props.setDate(value)}
            picker="month"
            cellRender={(val) => <div>Tháng {dayjs(val).month() + 1}</div>}
            className="bg-yellow-400 shadow shadow-gray-900"
          />
        </div>
      </div>
      <StyledInfo className="relative z-10 mt-4 flex h-[150px] w-full flex-col rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-500 shadow-inner shadow-gray-900">
        {/* <p className="pt-2 text-center text-base font-semibold uppercase text-white">
          Thành tích tháng
        </p> */}
        {/* <table className="h-full px-2 text-sm text-gray-600">
          <tbody>
            <tr>
              <td></td>
              <td>Ngày</td>
              <td>Đêm</td>
              <td>CN</td>
              <td>Lễ</td>
            </tr>
            <tr>
              <td>Công (ngày)</td>
              <td>14</td>
              <td>14</td>
              <td>14</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Tăng ca</td>
              <td>14.5</td>
              <td>14.5</td>
              <td>14.4</td>
              <td>0</td>
            </tr>
            <tr>
              <td>Ngày nghỉ</td>
              <td>14</td>
              <td>0</td>
              <td>12</td>
              <td>2</td>
            </tr>
          </tbody>
        </table> */}
        <div className="relative z-10 grid w-full flex-1 grid-cols-1 grid-rows-3 gap-1 p-3">
          <table className="w-full">
            <tbody className="">
              <tr className="mx-">
                <td colSpan={4}>
                  <p
                    className="-ml-1 text-left text-xs font-light italic text-gray-400"
                    style={{ fontSize: "10px" }}
                  >
                    {t("common.workCount")} ({t("common.day")}):
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-center text-sm text-gray-100">
                    {t("common.day")}: {workInfo.work.day}
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm text-gray-100">
                    {t("common.night")}: {workInfo.work.night}
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm text-gray-100">
                    {t("common.sun")}: {workInfo.work.sunday}
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm text-primary-8">
                    {t("common.fes")}: {workInfo.work.fes}
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <p
                    className="-ml-1 text-left text-xs italic text-gray-400"
                    style={{ fontSize: "10px" }}
                  >
                    {t("common.overtime")} ({t("common.hour")}):
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-center text-sm text-gray-100">
                    {t("common.day")}:{" "}
                    {(
                      (bonus.find((item) => item.id === 31)?.time || 0) / 60
                    ).toFixed(1)}
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm text-gray-100">
                    {t("common.night")}:{" "}
                    {(
                      (bonus.find((item) => item.id === 33)?.time || 0) / 60
                    ).toFixed(1)}
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm text-gray-100">
                    {t("common.sun")}:{" "}
                    {(
                      ((bonus.find((item) => item.id === 38)?.time || 0) +
                        (bonus.find((item) => item.id === 40)?.time || 0)) /
                      60
                    ).toFixed(1)}
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm text-primary-8">
                    {t("common.fes")}:{" "}
                    {(
                      ((bonus.find((item) => item.id === 45)?.time || 0) +
                        (bonus.find((item) => item.id === 47)?.time || 0)) /
                      60
                    ).toFixed(1)}
                  </span>
                </td>
              </tr>
              <tr>
                <td colSpan={4}>
                  <p
                    className="-ml-1 text-left text-xs italic text-gray-400"
                    style={{ fontSize: "10px" }}
                  >
                    {t("common.eatBonus")} ({t("common.hour")}):
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-center text-sm text-gray-100">
                    {t("common.day")}:{" "}
                    {(
                      (bonus.find((item) => item.id === 55)?.time || 0) / 60
                    ).toFixed(1)}
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm text-gray-100">
                    {t("common.night")}:{" "}
                    {(
                      (bonus.find((item) => item.id === 56)?.time || 0) / 60
                    ).toFixed(1)}
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm text-gray-100">
                    NCN:{" "}
                    {(
                      (bonus.find((item) => item.id === 64)?.time || 0) / 60
                    ).toFixed(1)}
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm text-primary-8">
                    ĐCN:{" "}
                    {(
                      (bonus.find((item) => item.id === 58)?.time || 0) / 60
                    ).toFixed(1)}
                  </span>
                </td>
              </tr>
              {/* <tr>
                <td colSpan={4}>
                  <p
                    className="text-left text-xs text-white"
                    style={{ fontSize: "10px" }}
                  >
                    Ngày nghỉ (ngày):
                  </p>
                </td>
              </tr>
              <tr>
                <td>
                  <span className="text-center text-sm font-medium text-gray-900">
                    Tổng: 14
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm font-medium text-gray-900">
                    X-RAY: 0
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm font-medium text-gray-900">
                    Dùng: 12
                  </span>
                </td>
                <td>
                  <span className="text-center text-sm font-medium text-primary-8">
                    Còn: 2
                  </span>
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      </StyledInfo>
    </div>
  );
};

const StyledMenu = styled.div`
  & > div {
    padding: 12px;
    height: 33.33%;
    /* background-color: #cf1d1d; */
    &:nth-child(1) > div {
      border-top-left-radius: 24px;
    }
    &:nth-child(3) > .menu-item {
      border-top-right-radius: 24px;
    }
    &:nth-child(7) > .menu-item {
      border-bottom-left-radius: 24px;
    }
    &:nth-child(9) > .menu-item {
      border-bottom-right-radius: 24px;
    }
    /* .menu-item {
      transition: all 0.3s linear;
      border-top-right-radius: 30px;
      &:hover {
        color: #333 !important;
      }
    } */
  }
`;

const Menu = () => {
  const { t } = useTranslation();
  const MenuList = React.useMemo(
    () => [
      {
        icon: <IoMail size={32} className="text-[#41bedd]" />,
        title: t("sidebar.mail"),
      },
      {
        icon: <MdEditDocument size={32} className="text-[#41bedd]" />,
        title: t("sidebar.approval"),
      },
      {
        icon: <FaChartLine size={32} className="text-[#41bedd]" />,
        title: t("sidebar.plan"),
      },
      {
        icon: <FaUsersCog size={32} className="text-[#41bedd]" />,
        title: t("sidebar.humanMNG"),
      },
      {
        icon: <MdMapsHomeWork size={32} className="text-[#41bedd]" />,
        title: t("sidebar.suplierMNG"),
      },
      {
        icon: <SiGooglemaps size={32} className="text-[#41bedd]" />,
        title: t("sidebar.distributionMNG"),
      },
      {
        icon: <MdOutlineNewspaper size={32} className="text-[#41bedd]" />,
        title: t("sidebar.notification"),
      },
      {
        icon: <BiSolidReport size={32} className="text-[#41bedd]" />,
        title: t("sidebar.report"),
      },
      {
        icon: <FaBuildingUser size={32} className="text-[#41bedd]" />,
        title: t("sidebar.jahwaVN"),
      },
    ],
    [t],
  );
  return (
    <StyledMenu className="flex min-h-[50dvh] w-full flex-1 flex-wrap overflow-auto">
      {MenuList.map((item, index) => (
        <div className="w-1/3" key={index}>
          <div className="menu-item flex h-full flex-col items-center justify-center gap-2 bg-sky-100 hover:bg-slate-200 dark:bg-gray-600 dark:hover:bg-slate-500">
            <div className="item">{item.icon}</div>
            <p className="li text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              {item.title}
            </p>
          </div>
        </div>
      ))}
    </StyledMenu>
  );
};
