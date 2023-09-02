import { ErrorPage } from "../../../shared/components/error-page/ErrorPage";
import { delay } from "../../../shared/utils/functions";
import { submitState } from "../../state/submit-state";

export const UserRoutes = [
  {
    path: "form/:id",
    loader: async ({ params }: any) => {
      await delay(300);
      let form: any = await submitState.getState();
      await form.isSubmited();
      if (!form?.form) {
        await form.getForms(params.id);
        form = await submitState.getState();
      }
      if (form?.form) return true;
      else throw new Error("Form Doesnt Exist");
    },
    errorElement: <ErrorPage />,
    async lazy() {
      let { Form } = await import("./pages/form/Form");
      return { Component: Form };
    },
  },
  {
    path: "*",
    index: true,
    async lazy() {
      let { ErrorPage } = await import(
        "../../../shared/components/error-page/ErrorPage"
      );
      return { Component: ErrorPage };
    },
  },
];
