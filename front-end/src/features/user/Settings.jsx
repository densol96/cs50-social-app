import { useSelector } from "react-redux";
import styled from "styled-components";

import Button from "../../ui/Button";
import { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import PictureSubSettings from "./PictureSubSettings";
import BasicSubsettings from "./BasicSubsettings";
import SecuritySubSettings from "./SecuritySubSettings";
import SharedNotification from "../../ui/SharedNotification";

const StyledSettings = styled.div`
  width: 55%;
  .settings {
    display: flex;
    flex-direction: column;
    gap: 6rem;
    height: 30rem;
    position: relative;

    &__heading {
      margin-bottom: 2rem;
    }

    &__form {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    &__label {
      /* width: 50%; */
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-transform: uppercase;
      font-weight: 700;

      &:not(:last-of-type) {
        margin-bottom: 1rem;
      }
    }

    &__input {
      color: var(--color-grey);
      font-size: 1.8rem;
      width: 30rem;
      padding: 0.5rem 1rem;

      &:focus {
        outline: none;
      }
    }

    .btn {
      display: block;
      margin: 4rem auto;
    }
  }

  .nav {
    margin: 4rem auto;
    color: var(--color-white);
    display: flex;
    justify-content: center;

    &__list {
      display: flex;
      flex-direction: row;
      border-radius: 25px;
      position: relative;
      width: 35rem;
      overflow: hidden;

      &::before {
        height: 100%;
        background-color: #ffffff4b;
        position: absolute;
        content: "";
        top: 0;
        border-radius: inherit;
        width: calc(100% / 3 + 7px);
        transition: all 400ms;
      }

      &.avatar::before {
        left: 0;
      }

      &.basic::before {
        left: 32%;
      }

      &.security::before {
        left: 64%;
      }
    }

    &__item {
      cursor: pointer;
      width: calc(100% / 3);
      padding: 1rem 0;
      text-align: center;
    }

    .link {
      color: inherit;
      text-decoration: none;
      display: flex;
      justify-content: center;
    }
  }
`;

function Settings() {
  const user = useSelector((state) => state.auth.user);

  const location = useLocation();

  const [activeTab, setActiveTab] = useState(() =>
    location.pathname.split("/").at(-1) === "settings"
      ? "avatar"
      : location.pathname.split("/").at(-1)
  );
  const navigate = useNavigate();

  return (
    <StyledSettings>
      <h1 className="secondary-heading uppercase">Edit profile</h1>
      <nav className="nav">
        <ul className={`nav__list ${activeTab}`}>
          <li
            className="nav__item"
            onClick={() => {
              setActiveTab("avatar");
              navigate("/app/settings/avatar");
            }}
          >
            Avatar
          </li>
          <li
            className="nav__item"
            onClick={() => {
              setActiveTab("basic");
              navigate("/app/settings/basic");
            }}
          >
            Basic
          </li>
          <li
            className="nav__item"
            onClick={() => {
              setActiveTab("security");
              navigate("/app/settings/security");
            }}
          >
            Password
          </li>
        </ul>
      </nav>
      <div className="settings">
        <Outlet context={user} />
      </div>
    </StyledSettings>
  );
}

export default Settings;
