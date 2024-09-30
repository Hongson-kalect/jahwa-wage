import * as React from "react";

export interface IBoxWrapProps {
  children: React.ReactNode;
}

export default function BoxWrap(props: IBoxWrapProps) {
  return (
    <div
      className="mx-4 mt-2 border-gray-400 bg-white py-2"
      style={{ borderBottom: "1px solid #bebebe" }}
    >
      {props.children}
    </div>
  );
}
