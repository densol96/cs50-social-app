import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "./LoadingPage";
import { useEffect, useRef } from "react";
import { NavLink, Outlet, useNavigate, useNavigation } from "react-router-dom";
import styled from "styled-components";
import { logout as logoutAction } from "../features/user/authSlice";

import { FaLinkedin, FaGithubSquare, FaPoll } from "react-icons/fa";
import { MdForum } from "react-icons/md";
import { IoSettings } from "react-icons/io5";
import { MdRateReview } from "react-icons/md";

const StyledAppLayout = styled.div`
  display: flex;
  height: 100vh;
  color: rgb(246, 247, 249);
  /* color: white; */

  sidebar {
    background-color: var(--color-black--medium);
    width: 40rem;
    overflow-y: hidden;

    header {
      margin-bottom: var(--spacing--m);
    }

    .logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: var(--font-size--xxl);
      margin-top: 3rem;
      line-height: var(--lh-med);

      &__big-text {
        letter-spacing: 1rem;
      }

      &__small-text {
        font-size: 3.2rem;
        letter-spacing: 0.6rem;
      }
    }

    .sidebar__nav {
      /* border: 1px solid white; */
      width: 70%;
      margin: 0 auto;
      font-size: var(--font-size--m);
      display: flex;
      flex-direction: column;
      gap: var(--gap--l);
      /* align-items: center; */

      ul {
        display: flex;
        flex-direction: column;
        gap: var(--gap--xs);
        line-height: var(--lh-med);
        position: relative;

        li {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          padding: 0.5rem 3rem;
          border-radius: 7px;

          &:hover {
            cursor: pointer;
            background-color: var(--color-grey--light);
          }
        }

        &:not(:last-child)::after {
          content: "";
          position: absolute;
          top: -4rem;
          left: 50%;
          transform: translateX(-50%);
          width: 15rem;
          height: 2px;
          background-color: var(--color-white);
        }
      }
    }

    footer {
      font-size: var(--font-size--s);
      padding: 0 3rem;
      text-align: center;
      margin-top: 7.2rem;

      p {
        color: var(--color-grey--light);
      }

      .icons {
        font-size: var(--font-size--l);
        display: flex;
        justify-content: center;
        margin-top: 2rem;
        gap: var(--gap--s);

        span {
          &:hover {
            color: var(--color-yellow--light);
            cursor: pointer;
          }
        }
      }
    }
  }

  main {
    background-color: var(--color-black--light);
    flex: 1;
    overflow-x: hidden;
    overflow-y: auto;
    padding: var(--spacing--m) var(--spacing--largest);
    position: relative;
  }
`;

const StyledNavLink = styled(NavLink)`
  color: inherit;
  text-decoration: none;
  border-radius: 7px;
  &.active {
    background-color: var(--color-white);
    color: var(--color-black--medium);

    &:hover li {
      background-color: var(--color-white) !important;
    }
  }
`;

function AppLayout() {
  const { authenticated, user } = useSelector((state) => state.auth);
  const fullName = user?.fullName;
  const navigate = useNavigate();

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";

  const dispatch = useDispatch();
  const mainContainerInDOM = useRef();

  useEffect(() => {
    if (!authenticated) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [authenticated]);

  function logout() {
    dispatch(logoutAction());
  }

  if (!authenticated) return <LoadingPage />;

  return (
    <StyledAppLayout>
      <sidebar>
        <header className="logo u-margin-b--big">
          <span className="logo__big-text">CS50</span> 💻{" "}
          <span className="logo__small-text">Social App</span>
        </header>
        <nav className="sidebar__nav">
          <ul>
            <StyledNavLink to="discussions">
              <li>
                <span className="icon">
                  <MdForum />
                </span>{" "}
                Discussions
              </li>
            </StyledNavLink>
            <StyledNavLink to="reviews">
              <li>
                <span className="icon">
                  <MdRateReview />
                </span>{" "}
                Reviews
              </li>
            </StyledNavLink>
            <StyledNavLink to="polls">
              <li>
                <span className="icon">
                  <FaPoll />
                </span>{" "}
                Polls
              </li>
            </StyledNavLink>
          </ul>

          <ul>
            <StyledNavLink to="settings">
              <li>
                <span className="icon">
                  <IoSettings />
                </span>{" "}
                Settings
              </li>
            </StyledNavLink>
            <li onClick={logout}>
              <MdForum /> Log out
            </li>
          </ul>
        </nav>
        <footer>
          <p>
            This project was designed and developed by Deniss Solovjovs as a
            part of CS50: Intro to Comp Sci course
          </p>
          <div className="icons">
            <span>
              <FaLinkedin />
            </span>
            <span>
              <FaGithubSquare />
            </span>
          </div>
        </footer>
      </sidebar>
      <main ref={mainContainerInDOM}>
        {isLoading && <LoadingPage inApp={true} />}
        <Outlet context={mainContainerInDOM} />
      </main>
    </StyledAppLayout>
  );
}

export default AppLayout;
