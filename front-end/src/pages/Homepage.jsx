import { useState } from "react";
import { Outlet, redirect, useLocation, useNavigation } from "react-router-dom";

import styled from "styled-components";

import Button from "../ui/Button";
import AnimatedLink from "../ui/AnimatedLink";
import StyledForm from "../ui/StyledForm";

const HomepageStyled = styled.div`
  height: 100vh;
  background-image: linear-gradient(
      to right,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.5) 20%,
      rgba(0, 0, 0, 0.9) 45%,
      black 85%
    ),
    url("/home-bg.jpg");
  background-position: 30% 50%;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    color: white;
    background-color: rgba(0, 0, 0, 0.078);
    backdrop-filter: blur(5px);
    z-index: 1;
  }
`;

const Content = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1000;
  color: white;
`;

const P = styled.p`
  text-transform: uppercase;
  font-size: 2.8rem;
  animation-name: moveInFromLeft;
  animation-duration: 0.6s;
  animation-delay: 300ms;
  animation-fill-mode: backwards;
`;

const Text = styled.div`
  width: 45%;
  text-align: center;
  position: absolute;
  right: 7%;
  top: 50%;
  transform: translateY(-50%);
`;

const H1 = styled.h1`
  animation-name: moveInFromRight;
  animation-duration: 0.6s;
  animation-delay: 300ms;
  animation-fill-mode: backwards;
`;

function Homepage() {
  const location = useLocation();
  const actionFromPath = location.pathname.slice(1);
  return (
    <HomepageStyled>
      <Content>
        <Outlet />
        <Text key={actionFromPath}>
          <H1 className="heading-primary">
            Welcome to
            <br /> CS50 Social App
          </H1>
          <P>Please, {actionFromPath} to connect to our community!</P>
        </Text>
      </Content>
    </HomepageStyled>
  );
}

export default Homepage;
