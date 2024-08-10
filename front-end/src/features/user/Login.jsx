import { redirect, useActionData, useNavigation, useOutletContext } from "react-router-dom";
import { useEffect, useRef } from "react";
import useMainPageAnimation from "../../hooks/useMainPageAnimation";

import StyledForm from "../../ui/StyledForm";
import AnimatedLink from "../../ui/AnimatedLink";
import Button from "../../ui/Button";

import { login } from "../../services/authApi";
import { useDispatch } from "react-redux";

import {saveJwt} from "../user/authSlice";

function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formElement = useRef();
  const animationTo = useMainPageAnimation(formElement);
  const actionFeedback = useActionData();
  const displayNotification = useOutletContext();
  const dispatch = useDispatch();
  
  useEffect(()=> {
    let timerId;
    if(actionFeedback?.notification && actionFeedback?.status === "success") {
      displayNotification(actionFeedback.message, actionFeedback.status);
      dispatch(saveJwt(localStorage.getItem("jwt")));
    }
    return () => clearTimeout(timerId);
  }, [actionFeedback]);

  return (
    <>
      <StyledForm ref={formElement} method="POST">
        <div>
          <label htmlFor="email">Email:</label>
          <input
            placeholder="Enter your real email"
            required
            name="email"
            type="email"
            id="email"
          />
          {actionFeedback?.email && <p key={new Date()} className="error">{actionFeedback?.email}</p>}
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            placeholder="Should contain at least 8 characters"
            required
            type="password"
            id="password"
          />
          {actionFeedback?.password && <p key={new Date()} className="error">{actionFeedback?.password}</p>}
        </div>
        <div className="btns">
          <Button disabled={isSubmitting}>
            {isSubmitting ? "Loading.." : "Login"}
          </Button>
          <AnimatedLink onClick={() => animationTo("/restore-password")}>
            Do not remember password?
          </AnimatedLink>
          <AnimatedLink onClick={() => animationTo("/sign-up")}>
            Do not have an account?
          </AnimatedLink>
        </div>
      </StyledForm>
    </>
  );
}

export default Login;

export async function action({request}) {
  const data = Object.fromEntries(await request.formData());
  return await login(data);
}
