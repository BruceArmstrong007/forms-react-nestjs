import { Navigate } from "react-router-dom";

export const AuthRoutes = [
  {
    path: "login",
    async lazy() {
      let { Login } = await import("./pages/login/Login");
      return { Component: Login };
    },
  },
  {
    path: "register",
    async lazy() {
      let { Register } = await import("./pages/register/Register");
      return { Component: Register };
    },
  },
  {
    path: "reset-password",
    async lazy() {
      let { ResetPassword } = await import("./pages/reset-password/ResetPassword");
      return { Component: ResetPassword };
    },
  },
  {
    path: "*",
    index: true,
    element: <Navigate to="login"/>
  }
]