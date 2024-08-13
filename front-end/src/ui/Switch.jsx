import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

const StyledSwitch = styled.div`
  height: 3rem;
  width: 6rem;
  background-color: var(--color-white);
  border-radius: var(--border-radius--large);
  position: relative;
  border: 2px solid var(--color-white);
  cursor: pointer;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    border-radius: 50px;
    background-color: var(--color-black);
    transition: all 300ms;
  }

  &.off::before {
    left: 0;
  }

  &.on::before {
    left: 50%;
  }
`;

function Switch({ onClick }) {
  const [status, setStatus] = useState(false);

  return (
    <StyledSwitch
      id="switch"
      onClick={() => {
        setStatus(!status);
        onClick();
      }}
      className={status ? "on" : "off"}
    />
  );
}

export default Switch;
