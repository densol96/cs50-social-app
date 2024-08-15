import { Form, useActionData, useNavigate } from "react-router-dom";
import Button from "../../ui/Button";
import { updateSettings } from "../../services/settingsApi";
import { useDispatch } from "react-redux";
import { logout } from "./authSlice";
import { useEffect } from "react";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";

const Message = styled.div`
  margin-top: 6rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: var(--border-radius--medium);
  animation-name: moveInFromRight;
  animation-duration: 1s;
  padding: 2rem;
  text-align: center;
  gap: 1rem;

  &.feedback--success {
    background-color: var(--color-success-transparent);

    span {
      margin-right: 2rem;
    }
  }

  &.feedback--error {
    background-color: var(--color-error-transparent);
  }

  .subheading {
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

function SecuritySubSettings() {
  const actionFeedback = useActionData();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (actionFeedback?.status === "success") {
      localStorage.setItem("jwt", "invalid");
      setTimeout(() => {
        dispatch(logout());
      }, 2500);
    }
  }, [actionFeedback?.status]);

  return (
    <Form method="PATCH" className="settings__basic">
      <h2 className="tertiary-heading settings__heading">Security info</h2>
      <label className="settings__label">
        Current password:
        <input
          className="settings__input "
          type="password"
          placeholder="**********"
          name="currentPassword"
        />
      </label>
      <label className="settings__label">
        New password:
        <input
          className="settings__input "
          type="password"
          placeholder="**********"
          name="newPassword"
        />
      </label>
      <label className="settings__label">
        Password confirmation:
        <input
          className="settings__input "
          type="password"
          placeholder="**********"
          name="passwordConfirmation"
        />
      </label>
      <Button className="btn" size="small" type="submit">
        Save
      </Button>
      {actionFeedback?.status === "success" && (
        <Message key={new Date()} className="feedback feedback--success">
          <span className="success-span">{actionFeedback?.message}</span>{" "}
          {<Spinner size={20} border={4} />}
        </Message>
      )}
      {actionFeedback?.status === "error" && (
        <Message className="feedback feedback--error">
          <p className="subheading">
            {actionFeedback?.message || `Invalid input`}
          </p>
          {actionFeedback?.errors?.currentPassword && (
            <p>{actionFeedback?.errors?.currentPassword}</p>
          )}
          {actionFeedback?.errors?.newPassword && (
            <p>{actionFeedback?.errors?.newPassword}</p>
          )}
          {actionFeedback?.errors?.confirmationPassword && (
            <p>{actionFeedback?.errors?.newPassword}</p>
          )}
        </Message>
      )}
    </Form>
  );
}

export default SecuritySubSettings;
export async function action({ request }) {
  const body = Object.fromEntries(await request.formData());

  // For now will remove the client-side validation, cause I want to work with the server

  try {
    const response = await updateSettings("security", body);
    return {
      message: "Success! You will be asked to login again",
      status: "success",
    };
  } catch (e) {
    console.log(e);
    return {
      message: e.response?.data?.message,
      status: "error",
      errors: e.response?.data?.errors,
    };
  }
}
