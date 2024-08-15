import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import GlobalStyles from "./styles/GlobalStyles";

import AuthPage from "./pages/AuthPage";
import SignUp, { action as signUpAction } from "./features/user/SignUp";
import Login, { action as LoginAction } from "./features/user/Login";
import ForgotPassword, {
  action as ForgotPasswordAction,
} from "./features/user/ForgotPassword";
import LoadingPage from "./ui/LoadingPage";
import { useEffect } from "react";
import { authenticate } from "./services/authApi";
import { initApp } from "./features/user/authSlice";
import AppLayout from "./ui/AppLayout";
import Discussions, {
  loader as discussionsLoader,
  action as discussionsAction,
} from "./features/discussions/Discussions";
import Error from "./ui/Error";
import Topic, {
  loader as topicLoader,
  action as topicAction,
} from "./features/discussions/Topic";
import Settings from "./features/user/Settings";
import PictureSubSettings from "./features/user/PictureSubSettings";
import BasicSubsettings from "./features/user/BasicSubsettings";
import SecuritySubSettings from "./features/user/SecuritySubSettings";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AuthPage />,
    children: [
      {
        index: true,
        element: <Navigate to="sign-up" />,
      },
      {
        path: "sign-up",
        element: <SignUp />,
        action: signUpAction,
      },
      {
        path: "login",
        element: <Login />,
        action: LoginAction,
      },
      {
        path: "restore-password",
        element: <ForgotPassword />,
        action: ForgotPasswordAction,
      },
    ],
  },
  {
    path: "/app",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="discussions" />,
      },
      {
        path: "discussions",
        element: <Discussions />,
        loader: discussionsLoader,
        errorElement: <Error />,
        action: discussionsAction,
      },
      {
        path: "discussions/:id",
        element: <Topic />,
        loader: topicLoader,
        errorElement: <Error display={true} />,
        action: topicAction,
      },
      {
        path: "settings",
        element: <Settings />,
        children: [
          {
            index: true,
            element: <Navigate to="avatar" />,
          },
          {
            path: "avatar",
            element: <PictureSubSettings />,
          },
          {
            path: "basic",
            element: <BasicSubsettings />,
          },
          {
            path: "security",
            element: <SecuritySubSettings />,
          },
        ],
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  let { jwt, authenticated, serverCalled, user } = useSelector(
    (state) => state.auth
  );
  console.log(user);
  useEffect(() => {
    if (!jwt) {
      setTimeout(() => {
        dispatch(
          initApp({ authenticated: false, serverCalled: true, user: undefined })
        );
      }, 1500);
    } else {
      async function callServerForAuth() {
        try {
          const { email, username, avatar } = await authenticate(jwt);
          dispatch(
            initApp({
              authenticated: true,
              serverCalled: true,
              user: { email, username, avatar },
            })
          );
        } catch (e) {
          dispatch(
            initApp({
              authenticated: false,
              serverCalled: true,
              user: undefined,
            })
          );
        }
      }
      callServerForAuth();
    }

    localStorage.setItem("jwt", jwt); // synchronise with logging out
  }, [jwt]);

  return (
    <>
      <GlobalStyles />
      {!serverCalled ? <LoadingPage /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
