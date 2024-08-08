import { redirect, useNavigation } from "react-router-dom";
import { useRef } from "react";
import useMainPageAnimation from "../../hooks/useMainPageAnimation";

import StyledForm from "../../ui/StyledForm";
import AnimatedLink from "../../ui/AnimatedLink";
import Button from "../../ui/Button";

function ForgotPassword() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formElement = useRef();
  const animation = useMainPageAnimation(formElement);

  return (
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
      <div className="btns">
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Loading.." : "Restore password"}
        </Button>
        <AnimatedLink onClick={() => animation("/sign-up")}>
          Do not have an account?
        </AnimatedLink>
      </div>
    </StyledForm>
  );
}

export default ForgotPassword;

export async function action(params) {
  return redirect("/");
}
