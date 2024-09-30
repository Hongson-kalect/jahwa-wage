import { useState } from "react";
import styled from "styled-components";

const Styled = styled.div<{ size: number }>`
  position: relative;
  z-index: 101;
  .burger {
    font-size: ${(props) => props.size + "px" || "16px"};
    position: relative;
    width: 2.5em;
    height: 1.8em;
    background: transparent;
    cursor: pointer;
    display: block;
  }

  .burger input {
    display: none;
  }

  .burger span {
    display: block;
    position: absolute;
    height: 0.25em;
    width: 100%;
    background: ${(props) => props.color || "black"};
    border-radius: 9px;
    opacity: 1;
    left: 0;
    transform: rotate(0deg);
    transition: 0.25s ease-in-out;
  }

  .burger span:nth-of-type(1) {
    top: 0px;
    transform-origin: left center;
  }

  .burger span:nth-of-type(2) {
    top: 50%;
    transform: translateY(-50%);
    transform-origin: left center;
  }

  .burger span:nth-of-type(3) {
    top: 100%;
    transform-origin: left center;
    transform: translateY(-100%);
  }

  .burger input:checked ~ span:nth-of-type(1) {
    transform: rotate(45deg);
    top: 0px;
    left: 5px;
  }

  .burger input:checked ~ span:nth-of-type(2) {
    width: 0%;
    opacity: 0;
  }

  .burger input:checked ~ span:nth-of-type(3) {
    transform: rotate(-45deg);
    top: 28px;
    left: 5px;
  }
`;
export const SidebarToggle = ({
  color,
  size,
  onClick,
}: {
  color: string;
  size: number;
  onClick?: () => void;
}) => {
  return (
    <div onClick={onClick}>
      <Styled color={color} size={size} className="pl-2 pr-4">
        <label className={`burger`} htmlFor="sidebarToggle">
          {/* <input
            type="checkbox"
            defaultChecked={false}
            readOnly
            id="sidebarToggle"
          /> */}
          <span></span>
          <span></span>
          <span></span>
        </label>
      </Styled>
      {/* <div></div> */}
      {/* <Navbar showNav={showNav} /> */}
    </div>
  );
};
