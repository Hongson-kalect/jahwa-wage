import styled from "styled-components";

const Styled = styled.div<{ size?: string }>`
  /* The switch - the box around the slider */
  font-size: ${(props) => props.size || "16px"};
  .switch {
    position: relative;
    display: inline-block;
    width: 3.5em;
    height: 2em;
  }

  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 5em;
    height: 5em;
    border-radius: 9999px;
    box-shadow: 0px 0.4em 1.2em #11111166;
    background: linear-gradient(to top, #cfd9df 0%, #e2ebf0 100%);
  }

  /* Hide default HTML checkbox */
  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  /* The slider */
  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ff0000;
    transition: 0.4s;
    border-radius: 2em;
    transform: rotate(-90deg);
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 1.4em;
    width: 1.4em;
    border-radius: 20px;
    left: 0.3em;
    bottom: 0.3em;
    background-color: white;
    transition: 0.4s cubic-bezier(0.19, 1, 0.22, 1);
    transition-delay: 0.2s;
  }

  .switch input:checked + .slider {
    background-color: #2196f3;
    transform: rotate(90deg);
  }

  .switch input:focus + .slider {
    box-shadow: 0 0 1px #2196f3;
  }

  .switch input:checked + .slider:before {
    transition-delay: 0.2s;
    transform: translateX(1.5em);
  }
`;

export const TimeToggle = ({
  size,
  check,
}: {
  size?: string;
  check: boolean;
}) => {
  return (
    <Styled size={size}>
      <div className="container">
        <div className="switch">
          <input type="checkbox" checked={check} />
          <span className="slider"></span>
        </div>
      </div>
    </Styled>
  );
};
