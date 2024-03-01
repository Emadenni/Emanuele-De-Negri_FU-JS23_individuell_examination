import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Cart from "./pages/Cart";
import Status from "./pages/Status";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import "./pages/main.scss"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/menu",
    element: <Menu />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/status",
    element: <Status />,
  },
  {
    path: "/login",
    element: <Login />,
    children: [
      {
        path: "/login/profile", 
        element: <Profile />,
      },
    ],
  },
]);


createRoot(document.getElementById("root")!).render(<RouterProvider router={router} />);
