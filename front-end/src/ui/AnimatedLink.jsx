import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

const sizes = {
  default: css`
    font-weight: 500;
    font-size: 1.5rem;

    &::after {
      height: 1.5px;
      bottom: -2px;
      left: -2px;
    }

    &:hover::after {
      width: 102%;
    }
  `,
};

const colors = {
  primary: css`
    color: var(--color-white);
    background-color: transparent;

    &::after {
      background-color: var(--color-white);
    }
  `,
};

const StyledLink = styled(Link)`
  ${(props) => sizes[props.size]}
  ${(props) => colors[props.color]}
  text-decoration: none;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    transition: all var(--transition-duration--default);
    width: 0%;
  }
`;

function AnimatedLink({ size = "default", color = "primary", children }) {
  return (
    <StyledLink color={color} size={size}>
      {children}
    </StyledLink>
  );
}

export default AnimatedLink;
