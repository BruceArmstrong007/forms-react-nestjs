import { Navigate, createBrowserRouter } from "react-router-dom";
import { AuthRoutes } from "./auth/AuthRoutes";
import { AdminRoutes } from "./admin/AdminRoutes";
import { UserRoutes } from "./user/UserRoutes";
import { ErrorPage } from "../../shared/components/error-page/ErrorPage";
import { authState } from "../state/auth-state";
import { adminState } from "../state/admin-state";
import { delay } from "../../shared/utils/functions";
import { formState } from "../state/form-state";

export const router = createBrowserRouter([
  {
    path: "",
    loader: async () => {
      const auth: any = authState.getState();
      if (!auth.token.refreshToken) return true;
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
          await delay(300);
          const auth: any = await authState.getState();
          const token = auth.token.accessToken;
          if (token) throw new Error("Authorized");
          else return token;
        },
        errorElement: <Navigate to="/admin/dashboard" />,
        async lazy() {
          let { Auth } = await import("./auth/Auth");
          return { Component: Auth };
        },
        children: AuthRoutes,
      },
      {
        path: "admin",
        loader: async () => {
          await delay(300);
          let admin: any = adminState.getState();
          let auth: any = await authState.getState();
          let token = auth.token.accessToken;
          if (!token) throw new Error("UnAuthorized");

          const form: any = await formState.getState();
          if (form.forms.length === 0) await form.getForms();
          else return await admin.getProfile();
        },
        errorElement: <Navigate to="/auth/login" />,
        async lazy() {
          let { Admin } = await import("./admin/Admin");
          return { Component: Admin };
        },
        children: AdminRoutes,
      },
      {
        path: "user",
        errorElement: <Navigate to="/auth/login" />,
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
