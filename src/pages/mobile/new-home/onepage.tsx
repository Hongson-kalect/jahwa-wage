import { Avatar, Col, Divider, Input, Row } from "antd";
import * as React from "react";
import { BsSearch } from "react-icons/bs";
import { FaBars } from "react-icons/fa6";
import { notificationItems } from "../wage/utils";
import styled from "styled-components";
import { scrollToId } from "../../../lib/utlis";
import { GoDotFill } from "react-icons/go";
import { AiFillDollarCircle, AiOutlineDollar } from "react-icons/ai";
import { RiSendPlane2Fill } from "react-icons/ri";
import { LiaPaperPlane } from "react-icons/lia";
import { FaHome } from "react-icons/fa";

export interface IHomePageNewProps {}

export default function HomePageNew(props: IHomePageNewProps) {
  return (
    <div className="h-screen overflow-auto">
      <Header />
      <News />
      <MainInfo />
      <Navigate />
      {/* <div className="mt-2 h-12">
        <Navbar />
      </div> */}
    </div>
  );
}

const Header = () => {
  return (
    <div className="flex w-full flex-col bg-yellow-400 p-1">
      <div className="top flex items-center justify-between">
        <div className="left flex gap-2 text-gray-800">
          <FaBars size={16} />
          <p className="uppercase">Jahwa lương</p>
        </div>
        <div className="right flex gap-2">
          <Avatar size={"small"}>HS</Avatar>
          <Avatar size={"small"} className="bg-red-600">
            VN
          </Avatar>
        </div>
      </div>
      <div className="search px-4 py-2">
        <Input
          prefix={<BsSearch className="text-gray-400" />}
          className="rounded-none px-4"
          placeholder={"Search..."}
        />
      </div>
    </div>
  );
};
const StyledSilder = styled.div`
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  div {
    scroll-snap-align: center;
  }
`;
const News = () => {
  return (
    <div className="w-screen pt-4">
      <div className="flex gap-2 px-1 py-2">
        <div className="bg-blue-500 px-2.5 py-1 text-sm text-white">All</div>
        <div className="bg-gray-300 px-2.5 py-1 text-sm">Khẩn cấp</div>
        <div className="bg-gray-300 px-2.5 py-1 text-sm">Công ty</div>
        <div className="bg-gray-300 px-2.5 py-1 text-sm">Xã hội</div>
        <div className="bg-gray-300 px-2.5 py-1 text-sm">Giải trí</div>
      </div>
      <StyledSilder className="flex w-full gap-4 overflow-auto">
        {notificationItems.map((item, index) => (
          <div
            key={index}
            className="image-box bg-red relative shadow shadow-gray-400"
            id={"image-" + index}
          >
            <img
              className="h-32 w-52"
              src="https://th.bing.com/th/id/OIP.IdMmOp5pK4giQKhBpZzYPAHaFj?rs=1&pid=ImgDetMain"
              alt=""
            />
            <p className="absolute -right-1 bottom-0 left-0 line-clamp-2 h-11 bg-[#ffffffee] px-2 py-1 text-sm text-black shadow-inner shadow-gray-300">
              Gui can bo ve thon di cay cho dong bao dan toc thieu so
            </p>
          </div>
        ))}
      </StyledSilder>
      <div className="px-1 pt-1 text-right">
        {notificationItems.map((item, index) => (
          <GoDotFill
            size="14px"
            color="gray"
            onClick={() => scrollToId("image-" + index)}
          />
        ))}
      </div>
    </div>
  );
};

const MainInfo = () => {
  return (
    <div>
      <div className="mt-3 px-1">
        <p className="text-sm text-gray-600">Tra cứu dữ liệu cá nhân</p>
        <div className="flex flex-col gap-1 px-2">
          <MainInfoItem />
          <MainInfoItem />
          <MainInfoItem />
        </div>
      </div>
    </div>
  );
};

export const MainInfoItem = () => {
  return (
    <div className="my-1 flex items-center bg-gray-50 px-0.5 shadow shadow-gray-400">
      <div
        className="icon flex h-12 items-center justify-center px-2"
        style={{ borderRight: "1px solid #ddd" }}
      >
        <AiOutlineDollar size="30" color="blue" />
      </div>
      <div className="info flex-1 px-2 py-1">
        <div className="title font-mono text-sm font-bold">Kiểm tra lương</div>
        <div className="desc font-sans text-xs text-gray-500">
          Tra cứu thông tin lương, khấu trừ, thực lĩnh của bạn theo từng thời
          kỳ.
        </div>
      </div>
      <div
        className="action flex h-12 items-center justify-center px-2"
        style={{ borderLeft: "1px solid #ddd" }}
      >
        <LiaPaperPlane size="30" className="text-primary-3" />
      </div>
    </div>
  );
};

const Navigate = () => {
  return (
    <div>
      <div className="mt-3 px-1">
        <p className="text-sm text-gray-600">Khu vực làm việc</p>
        <Row className="flex flex-wrap overflow-auto p-2" gutter={[0, 24]}>
          <NavigateItem />
          <NavigateItem />
          <NavigateItem />
          <NavigateItem />
          <NavigateItem />
          <NavigateItem />
          <NavigateItem />
          <NavigateItem />
          <NavigateItem />
          <NavigateItem />
        </Row>
      </div>
    </div>
  );
};

const NavigateItem = () => {
  return (
    <Col span={12} className="qq px-2">
      <div
        className="container flex h-32 flex-col items-center justify-center p-2 shadow-md shadow-gray-500"
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.9) 80%, rgba(0,0,0,1) 100%),url(https://th.bing.com/th/id/OIP.JvFqABbFUjJ5aso53lTCEwHaEK?rs=1&pid=ImgDetMain) center center /cover no-repeat",
        }}
      >
        <div className="logo mt-4">
          <LiaPaperPlane size="36" className="text-primary-3" />
        </div>
        <div className="title font-medium text-white">Thư từ ê</div>
        <div className="mt-1 line-clamp-2 text-xs text-gray-300">
          Giai quyet cac tham hoa cap rong tren dia ban trong pham vi 12km
        </div>
      </div>
    </Col>
  );
};

const Navbar = () => {
  return (
    <div className="fixed bottom-0 flex h-12 w-full items-center justify-around bg-blue-300 pt-2 shadow-inner shadow-gray-400">
      <NavItem active />
      <NavItem />
      <NavItem />
      <NavItem />
      <NavItem />
    </div>
  );
};

const NavItem = ({ active }: { active?: boolean }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <FaHome size={24} color={active ? "white" : "#818181"} />
      <div className={`text-sm ${active ? "text-white" : "hidden"}`}>title</div>
    </div>
  );
};
