import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import PageRedirect from "./components/PageRedirect";

export const backend = { endpoint: "https://url-shortener-pi7x.onrender.com" };

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/:short",
    element: <PageRedirect />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
