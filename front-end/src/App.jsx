import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./ui/Homepage";
import GlobalStyles from "./styles/GlobalStyles";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
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
