import { redirect, useNavigation } from "react-router-dom";
import { useRef } from "react";
import useMainPageAnimation from "../../hooks/useMainPageAnimation";

import StyledForm from "../../ui/StyledForm";
import AnimatedLink from "../../ui/AnimatedLink";
import Button from "../../ui/Button";

function Login() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formElement = useRef();
  const animationTo = useMainPageAnimation(formElement);

  return (
    <>
      <StyledForm ref={formElement} method="POST">
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

export async function action(params) {
  return redirect("/");
}
