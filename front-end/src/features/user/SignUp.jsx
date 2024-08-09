import { useEffect, useRef, useState } from "react";
import { redirect, useActionData, useNavigate, useNavigation, useOutletContext } from "react-router-dom";
import styled from "styled-components";

import useMainPageAnimation from "../../hooks/useMainPageAnimation";

import StyledForm from "../../ui/StyledForm";
import AnimatedLink from "../../ui/AnimatedLink";
import Button from "../../ui/Button";

import { register } from "../../services/authApi";

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

const formFields = {
  fullName: "fullName",
  email: "email",
  password: "password",
  passwordConfirm: "passwordConfirm",
  checkbox: "agreesToTerms"
}

function SignUp() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formElement = useRef();
  const animationTo = useMainPageAnimation(formElement);
  const actionData = useActionData();
  const displayNotification = useOutletContext();
  const navigate =  useNavigate();

  useEffect(()=> {
    let timerId;
    if(actionData && actionData.notification) {
      displayNotification(actionData.message, actionData.status);
      if(actionData.status === "success") {
        timerId = setTimeout(() => {
          animationTo("/login");
        }, 5000)
      }
    }
    return () => clearTimeout(timerId);
  }, [actionData]);

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
            name={formFields.fullName}
          />
          {actionData?.[formFields.fullName] && <p className="error">{actionData[formFields.fullName]}</p>}
          
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="Enter your real email"
            required
            type="email"
            id="email"
            name={formFields.email}
          />
          {actionData?.[formFields.email] && <p className="error">{actionData[formFields.email]}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            placeholder="Should contain at least 8 characters"
            required
            type="password"
            id="password"
            name={formFields.password}
          />
         {actionData?.[formFields.password] && <p className="error">{actionData[formFields.email]}</p>}
        </div>
        <div>
          <label htmlFor="confirm">Confirm password:</label>
          <input
            placeholder="Should contain at least 8 characters"
            required
            type="password"
            id="confirm"
            name={formFields.passwordConfirm}
          />
          {actionData?.[formFields.passwordConfirm] && <p className="error">{actionData[formFields.passwordConfirm]}</p>}
        </div>
        <div className="terms">
          <div>
            <input name={formFields.checkbox} id="checkbox" type="checkbox" />
            <label className="rules-input" htmlFor="checkbox">
              I agree to
              <AnimatedLink onClick={() => setModalOpen(true)} size="medium">
                terms and conditions
              </AnimatedLink>
            </label>
          </div>
          {actionData?.[formFields.checkbox] && <p className="error">{actionData[formFields.checkbox]}</p>}
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
  const data = Object.fromEntries(await request.formData());
  const actionData = {invalidInput: true};
  if(!data[formFields.checkbox]) {
    actionData[formFields.checkbox] = "You must agree to terms to continue";
    return actionData;
  }
  if (data[formFields.password]!== data[formFields.passwordConfirm]) {
    actionData[formFields.passwordConfirm] = "Passwords do not match";
    return actionData;
  }
  
  return await register(data);
}
