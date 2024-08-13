import { useNavigate, useRouteError } from "react-router-dom";
import styled from "styled-components";
import AnimatedLink from "./AnimatedLink";
import { IoMdArrowRoundBack } from "react-icons/io";

const StyledError = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;

  h1 {
    font-size: 3.6rem;
  }

  .smile {
    font-size: 15rem;
  }
`;

function Error({ display = false }) {
  const error = useRouteError();
  const navigate = useNavigate();

  console.log("💣 🤯 ERROR LOG  --> ", error);

  return (
    <StyledError>
      <p className="smile">🤕</p>
      {display && error?.response?.data?.message ? (
        <h1>{error?.response?.data?.message}</h1>
      ) : (
        <>
          <h1>
            This service is surrently unavailable. <br /> Please, try again
            later!
          </h1>
          <p>
            If the problem persists, please get in touch with the
            administrators!
          </p>
        </>
      )}
      <AnimatedLink onClick={() => navigate(-1)} size="large">
        <IoMdArrowRoundBack /> Go back
      </AnimatedLink>
    </StyledError>
  );
}

export default Error;
