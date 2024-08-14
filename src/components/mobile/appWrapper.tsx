import styled from "styled-components";

const Styled = styled.div`
  height: calc(100dvh - 40px); /* bottom bar height */
  /* background-color: red; */
  display: flex;
  flex-direction: column;
  width: 100vw;
  overflow: auto;
`;

type Props = {
  children?: React.ReactNode;
  className?: string;
};

export const MobileAppWrapper = (props: Props) => {
  return (
    <Styled
      className={
        "bg-[#000] duration-300 dark:bg-black " + (props.className || "")
      }
    >
      {props.children}
    </Styled>
  );
};
