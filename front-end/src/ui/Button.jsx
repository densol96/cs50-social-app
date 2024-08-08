import styled, { css } from "styled-components";

const sizes = {
  default: css`
    padding: 1rem 3rem;
    font-weight: 700;
    font-size: 1.8rem;
    border: 3px solid;
  `,
};

const colors = {
  primary: css`
    border-color: var(--color-white);
    color: var(--color-white);
    background-color: var(--color-black);

    &:hover {
      color: var(--color-black);
    }

    &:disabled:hover {
      color: var(--color-white);
    }
  `,
};

const Button = styled.button`
  font-family: inherit;
  text-transform: uppercase;
  display: inline-block;

  ${(props) => sizes[props.size]}
  ${(props) => colors[props.color]}

  position: relative;
  cursor: pointer;
  transition: all var(--transition-duration--default);

  z-index: 1;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 0%;
    height: 100%;
    background-color: var(--color-white);
    transition: all var(--transition-duration--default);
    z-index: -1;
  }

  &:hover::after {
    width: 100%;
  }

  &:disabled {
    cursor: not-allowed;

    &:hover::after {
      width: 0;
    }
  }
`;

Button.defaultProps = {
  size: "default",
  color: "primary",
};

export default Button;
