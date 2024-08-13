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
} from "./features/discussions/Discussions";
import Error from "./ui/Error";
import Topic, { loader as topicLoader } from "./features/discussions/Topic";

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
      },
      {
        path: "discussions/:id",
        element: <Topic />,
        loader: topicLoader,
        errorElement: <Error display={true} />,
      },
      {
        path: "reviews",
        element: <p>HELLO THERE</p>,
      },
    ],
  },
]);

function App() {
  const dispatch = useDispatch();
  let { jwt, authenticated, serverCalled, user } = useSelector(
    (state) => state.auth
  );
  useEffect(() => {
    if (jwt) localStorage.setItem("jwt", jwt); // synchronise with logging out
    if (!jwt) {
      setTimeout(() => {
        dispatch(
          initApp({ authenticated: false, serverCalled: true, user: undefined })
        );
      }, 1500);
    } else {
      async function callServerForAuth() {
        try {
          const { email, fullName } = await authenticate(jwt);
          dispatch(
            initApp({
              authenticated: true,
              serverCalled: true,
              user: { email, fullName },
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
  }, [jwt]);

  return (
    <>
      <GlobalStyles />
      {!serverCalled ? <LoadingPage /> : <RouterProvider router={router} />}
    </>
  );
}

export default App;
