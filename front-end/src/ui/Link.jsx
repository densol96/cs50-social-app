import styled, { css } from "styled-components";

const sizes = {
  default: css`
    padding: 1rem 3rem;
    font-weight: 700;
    font-size: 1.8rem;
  `,
  small: css`
    font-weight: 500;
    font-size: 1.6rem;
  `,
};

const variations = {
  button: css`
    font-family: inherit;
    text-transform: uppercase;
    border: 3px solid white;
  `,
  link: css`
    border: none;
    position: relative;
    &::before {
      content: "";
      position: absolute;
      left: -2px;
      bottom: -5px;
      width: 103%;
      z-index: 999;
      height: 2px;
      background-color: white;
    }
  `,
};

const Button = styled.button`
  display: inline-block;
  background-color: transparent;
  color: inherit;
  ${(props) => sizes[props.size]}
  ${(props) => variations[props.variation]}
`;

Button.defaultProps = {
  variation: "button",
  size: "default",
};

export default Button;
