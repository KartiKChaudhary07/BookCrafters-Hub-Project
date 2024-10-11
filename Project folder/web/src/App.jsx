import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";

import "./App.css";
import { AuthProvider } from "./utils/authContext";
import LandingPage from "./pages/landing/landingPage";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import PageNotImplemented from "./pages/pageEmpty";
import ForgotPassword from "./pages/forgot/index";
import DashboardPage from "./pages/dashboard";
import CommonHeader from "@/Components/Header";
import About from "./pages/about/About";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import EditorPagee from "./pages/editor";
import ReadWriting from "./pages/read";

const BlankLayout = () => {
  return (
    <>
      <CommonHeader />
      <main>
        <div></div>
        <Outlet />
        <ToastContainer />
      </main>
    </>
  );
};

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <BlankLayout />,
      children: [
        {
          path: "/",
          element: <LandingPage />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <RegisterPage />,
        },
        {
          path: "/dashboard",
          element: <DashboardPage />,
        },
        {
          path: "/dashboard/editor",
          element: <EditorPagee />,
        },
        {
          path: "/read/:id",
          element: <ReadWriting />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/services",
          element: <main>Services</main>,
        },
        {
          path: "/contact",
          element: <main>About Us</main>,
        },
        {
          path: "/forget-password",
          element: <ForgotPassword />
        },
        {
          path: "*",
          element: <PageNotImplemented />,
        },
      ],
    },
  ]);

  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
