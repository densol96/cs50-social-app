import { Form } from "react-router-dom";
import styled from "styled-components";

const StyledForm = styled(Form)`
  max-width: 55rem;
  width: 100%;
  padding: 5rem 6rem;
  position: absolute;
  left: 10%;
  top: 50%;
  transform: translateY(-50%);
  background-color: #00000063;
  backdrop-filter: blur(10px);
  border-radius: 12px;
  box-shadow: var(--shadow-light--default);
  display: flex;
  flex-direction: column;
  gap: 2rem;
  transition: all 600ms;

  opacity: 0;
  visibility: hidden;

  &.show {
    opacity: 1;
    visibility: visible;
  }

  .terms {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    align-items: center;
    justify-content: center;

    div {
      display: flex;
      flex-direction: row;
      gap: 1rem;
    }

    input {
      height: 2rem;
      width: 2rem;
      accent-color: black;
    }

    label {
      font-size: 1.4rem;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
  }

  div.btns {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    label {
      text-transform: uppercase;
      font-weight: 700;
      font-size: 2rem;
    }

    input {
      padding: 0.5rem 2rem;
      font-family: inherit;
      font-size: 1.8rem;
      border-radius: 3px;
      border: none;
      outline: none;
      border-bottom: 4px solid transparent;

      &::placeholder {
        font-style: italic;
        font-size: 1.4rem;
      }

      &:focus:valid {
        border-color: var(--color-green);
      }

      &:focus:invalid {
        border-color: var(--color-red);
      }
    }
  }

  .error {
    width: 100%;
    font-size: 1.3rem;
    font-weight: 700;
    color: var(--color-red);
    padding: 0.5rem 0.5rem 0;
    text-align: center;
    animation-name: shakeUpAndDown;
    animation-duration: 500ms;
  }
`;

export default StyledForm;
