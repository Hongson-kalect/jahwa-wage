import * as React from "react";
import styled from "styled-components";

const Styled = styled.div``;

export interface IContentWrapProps {
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
}

export default function ContentWrap(props: IContentWrapProps) {
  return (
    <Styled
      // style={{ background: "white" }}
      className={
        "relative flex flex-1 flex-col gap-10 rounded-t-3xl bg-slate-50 p-4 shadow-lg duration-300 dark:bg-gray-800 " +
        props.className
      }
    >
      {/* <div
        className="absolute left-0 top-0 z-[1] h-full w-full blur-md"
        style={{
          background:
            "url(https://th.bing.com/th/id/R.21c29ff…?rik=gtJfQX3pObRFVQ&riu=http%3a%2f%2ffotodes.ru%2fupload%2fimg1343813912.jpg&ehk=Lq9%2bjTJ%2flAJyhVG98XIFivoTOt5SCAeokt%2fcKmi%2bjRg%3d&risl=&pid=ImgRaw&r=0) center center / cover no-repeat",
        }}
      ></div> */}
      <div className="z-[10] flex flex-1 flex-col gap-6">{props.children}</div>
    </Styled>
  );
}
