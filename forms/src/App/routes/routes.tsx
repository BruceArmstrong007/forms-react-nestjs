import { Navigate, createBrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./auth/AuthRoutes";
import { AdminRoutes } from "./admin/AdminRoutes";
import { UserRoutes } from "./user/UserRoutes";
import { ErrorPage } from "../../shared/components/error-page/ErrorPage";
import { Admin } from "./admin/Admin";
import { authState } from "../state/AuthState";

export const router = createBrowserRouter([
  {
    path: "",
    loader: async () => {
      const auth: any = authState.getState();
      const response: any = await auth.refresh();
      if (response?.statusCode) {
        auth.logout();
      }
      return true;
    },
    async lazy() {
      let { App } = await import("../App");
      return { Component: App };
    },
    errorElement: <ErrorPage />,
    children: [
      {
        path: "auth",
        loader: async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          const auth: any = await authState.getState();
          const token = auth.auth.accessToken;
          if (token) throw new Error("Authorized");
          return true;
        },
        errorElement: <Navigate to="/admin" />,
        async lazy() {
          let { Auth } = await import("./auth/Auth");
          return { Component: Auth };
        },
        children: AuthRoutes,
      },
      {
        path: "admin",
        loader: async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          const auth: any = await authState.getState();
          const token = auth.auth.accessToken;
          if (!token) throw new Error("UnAuthorized");
          return true;
        },
        errorElement: <Navigate to="/auth" />,
        element: <Admin />,
        children: AdminRoutes,
      },
      {
        path: "user",
        async lazy() {
          let { User } = await import("./user/User");
          return { Component: User };
        },
        children: UserRoutes,
      },
      {
        path: "landing-page",
        async lazy() {
          let { LandingPage } = await import(
            "../../shared/components/landing-page/LandingPage"
          );
          return { Component: LandingPage };
        },
      },
      {
        path: "*",
        element: <Navigate to="landing-page" />,
      },
      {
        path: "",
        element: <Navigate to="landing-page" />,
      },
    ],
  },
]);
