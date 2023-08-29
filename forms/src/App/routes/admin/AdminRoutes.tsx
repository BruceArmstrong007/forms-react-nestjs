import { Navigate } from "react-router-dom";

export const AdminRoutes = [
  {
    path: "dashboard",
    async lazy() {
      let { Dashboard } = await import("./pages/dashboard/Dashboard");
      return { Component: Dashboard };
    },
  },
  {
    path: "forms",
    async lazy() {
      let { Form } = await import("./pages/form/Form");
      return { Component: Form };
    },
  },
  {
    path: "edit-profile",
    async lazy() {
      let { Form } = await import("./pages/form/Form");
      return { Component: Form };
    },
  },  
  {
    path: "*",
    index: true,
    element: <Navigate to="dashboard"/>
  }
]