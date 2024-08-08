import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

import GlobalStyles from "./styles/GlobalStyles";

import Homepage from "./pages/Homepage";
import SignUp, { action as signUpAction } from "./features/user/SignUp";
import Login, { action as LoginAction } from "./features/user/Login";
import ForgotPassword, {
  action as ForgotPasswordAction,
} from "./features/user/ForgotPassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
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
]);
function App() {
  const x = 5;
  return (
    <>
      <GlobalStyles />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
