import { Navigate } from "react-router-dom";
import { formState } from "../../state/form-state";

export const AdminRoutes = [
  {
    path: "dashboard",
    async lazy() {
      let { Dashboard } = await import("./pages/dashboard/Dashboard");
      return { Component: Dashboard };
    },
  },
  {
    path: "forms/:id",
    loader: async ({ params }: any) => {
      const form: any = await formState.getState();
      const isExist = form.forms.find((form: any) => form._id === params.id);
      if (isExist) return true;
      else throw new Error("Form Doesnt Exist");
    },
    errorElement: <Navigate to="/admin/dashboard" />,
    async lazy() {
      let { Form } = await import("./pages/form/Form");
      return { Component: Form };
    },
  },
  {
    path: "preview/:id",
    async lazy() {
      let { FormPreview } = await import("./pages/form-preview/FormPreview");
      return { Component: FormPreview };
    },
  },
  {
    path: "responses/:id",
    async lazy() {
      let { Response } = await import("./pages/response/Response");
      return { Component: Response };
    },
  },
  {
    path: "edit-profile",
    async lazy() {
      let { EditProfile } = await import("./pages/edit-profile/EditProfile");
      return { Component: EditProfile };
    },
  },
  {
    path: "*",
    index: true,
    element: <Navigate to="dashboard" />,
  },
];
