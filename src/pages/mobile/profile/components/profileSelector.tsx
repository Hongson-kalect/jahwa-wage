import * as React from "react";
import { FaBuilding, FaUserLarge } from "react-icons/fa6";
import { RiFolderChartFill } from "react-icons/ri";
import styled from "styled-components";

const Styled = styled.div`
  .radio-inputs {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    max-width: 350px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  .radio-inputs > * {
    margin: 4px;
  }

  .radio-input:checked + .radio-tile {
    border-color: #2264b9;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    color: #2264b9;
  }

  .radio-input:checked + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
    background-color: #2264b9;
    border-color: #2264b9;
  }

  .radio-input:checked + .radio-tile .radio-icon svg {
    fill: #2264b9;
  }

  .radio-input:checked + .radio-tile .radio-label {
    color: #2264b9;
  }

  .radio-input:focus + .radio-tile {
    border-color: #2264b9;
    box-shadow:
      0 5px 10px rgba(100, 100, 100, 0.1),
      0 0 0 4px #b5c9fc;
  }

  .radio-input:focus + .radio-tile:before {
    transform: scale(1);
    opacity: 1;
  }

  .radio-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 80px;
    min-height: 52px;
    border-radius: 0.5rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
    transition: 0.15s ease;
    cursor: pointer;
    position: relative;
  }

  .radio-tile:before {
    content: "";
    position: absolute;
    display: block;
    width: 0.5rem;
    height: 0.5rem;
    border: 2px solid #b5bfd9;
    background-color: #fff;
    border-radius: 50%;
    top: 0.25rem;
    left: 0.25rem;
    opacity: 0;
    transform: scale(0);
    transition: 0.25s ease;
  }

  .radio-tile:hover {
    border-color: #2264b9;
  }

  .radio-tile:hover:before {
    transform: scale(1);
    opacity: 1;
  }

  .radio-icon svg {
    width: 1.2rem;
    height: 1.2rem;
    fill: #8a8a8a;
  }

  .radio-label {
    color: #707070;
    transition: 0.375s ease;
    text-align: center;
    font-size: 13px;
  }

  .radio-input {
    clip: rect(0 0 0 0);
    -webkit-clip-path: inset(100%);
    clip-path: inset(100%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
`;

export interface IProfileSelectorProps {
  activeTab: "personal" | "work" | "info";
  setActiveTab: React.Dispatch<
    React.SetStateAction<"personal" | "work" | "info">
  >;
}

export default function ProfileSelector(props: IProfileSelectorProps) {
  return (
    <Styled>
      <div className="radio-inputs">
        <label>
          <input
            // checked={props.activeTab === "personal"}
            defaultChecked={true}
            onClick={() => props.setActiveTab("personal")}
            className="radio-input"
            type="radio"
            name="engine"
          />
          <span className="radio-tile">
            <span className="radio-icon">
              <FaUserLarge size={12} />
            </span>
            <span className="radio-label font-medium">Cá nhân</span>
          </span>
        </label>
        <label>
          <input
            // checked={props.activeTab === "work"}
            onClick={() => props.setActiveTab("work")}
            // checked={false}
            className="radio-input"
            type="radio"
            name="engine"
          />
          <span className="radio-tile">
            <span className="radio-icon">
              <FaBuilding />
            </span>
            <span className="radio-label font-medium">Công ty</span>
          </span>
        </label>
        <label>
          <input
            // checked={props.activeTab === "info"}
            onClick={() => props.setActiveTab("info")}
            className="radio-input"
            type="radio"
            name="engine"
          />
          <span className="radio-tile">
            <span className="radio-icon">
              <RiFolderChartFill />
            </span>
            <span className="radio-label font-medium">Khác</span>
          </span>
        </label>
      </div>
    </Styled>
  );
}
