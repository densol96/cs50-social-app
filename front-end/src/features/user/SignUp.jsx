import { useRef, useState } from "react";
import { redirect, useNavigation } from "react-router-dom";
import styled from "styled-components";

import useMainPageAnimation from "../../hooks/useMainPageAnimation";

import StyledForm from "../../ui/StyledForm";
import AnimatedLink from "../../ui/AnimatedLink";
import Button from "../../ui/Button";

const Rules = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #000000cc;
  z-index: 20000;
  opacity: 0;
  visibility: hidden;
  transition: all var(--transition-duration--default);

  &.open {
    opacity: 1;
    visibility: visible;

    .rules-text {
      transform: translate(-50%, -50%) scale(1);
    }
  }

  .rules-text {
    width: 50%;
    height: auto;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-95%, -20%) scale(0.1);
    font-size: 2rem;
    background-color: var(--color-white);
    color: var(--color-grey);
    border-radius: var(--border-radius--medium);
    padding: 7.5rem;
    transition: all var(--transition-duration--default);
    box-shadow: var(--shadow-dark--default);

    h1 {
      margin-bottom: 3rem;
    }

    p:not(:last-child) {
      margin-bottom: 2rem;
    }

    p:last-of-type {
      text-align: right;
      font-style: italic;
    }

    button {
      position: absolute;
      right: 1rem;
      top: 1rem;
      width: 6rem;
      height: 6rem;
      display: block;
      border: none;
      background: transparent;
      cursor: pointer;

      &::after,
      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        height: 5px;
        width: 4.5rem;
        background-color: var(--color-grey);
        transition: all var(--transition-duration--default);
      }

      &::after {
        transform: translate(-50%, -50%) rotate(45deg);
      }

      &::before {
        transform: translate(-50%, -50%) rotate(-45deg);
      }

      &:hover::after,
      &:hover::before {
        background-color: var(--color-black);
      }
    }
  }
`;

function SignUp() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigation = useNavigation();

  const isSubmitting = navigation.state === "submitting";
  const formElement = useRef();

  const animationTo = useMainPageAnimation(formElement);

  return (
    <>
      <StyledForm ref={formElement} method="POST">
        <div>
          <label htmlFor="name">Full Name:</label>
          <input
            placeholder="Enter your full name"
            required
            id="name"
            type="text"
            className="test"
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="Enter your real email"
            required
            type="email"
            id="email"
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Should contain at least 8 characters"
            required
            type="password"
            id="password"
          />
        </div>
        <div>
          <label htmlFor="confirm">Confirm password:</label>
          <input
            placeholder="Should contain at least 8 characters"
            required
            type="password"
            id="confirm"
          />
        </div>
        <div className="terms">
          <input required id="checkbox" type="checkbox" />
          <label className="rules-input" required htmlFor="checkbox">
            I agree to
            <AnimatedLink onClick={() => setModalOpen(true)} size="medium">
              terms and conditions
            </AnimatedLink>
          </label>
        </div>
        <div className="btns">
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Loading.." : "Register"}
          </Button>

          <AnimatedLink onClick={() => animationTo("/login")}>
            Already have an account?
          </AnimatedLink>
        </div>
      </StyledForm>
      <Rules className={`${modalOpen ? "open" : ""}`}>
        <div className="rules-text">
          <h1>Hello everyone!</h1>
          <p>
            This is my final CS50 project - not a real website therefore there
            are not really any terms and confitions in order to sign-up!
          </p>
          <p>
            Please, check it out and let me know what you think in the comment
            section here and on YouTube!
          </p>
          <p>
            With regards,
            <br /> Deniss Solovjovs
          </p>
          <button onClick={() => setModalOpen(false)}></button>
        </div>
      </Rules>
    </>
  );
}

export default SignUp;
export async function action({ request }) {
  return redirect("/login");
}
