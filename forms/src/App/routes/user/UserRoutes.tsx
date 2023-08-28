export const UserRoutes = [
  {
    path: "form/:id",
    async lazy() {
      let { Form } = await import("./pages/form/Form");
      return { Component: Form };
    },
  },
  {
    path: "*",
    index: true,
    async lazy() {
      let { ErrorPage } = await import("../../../shared/components/error-page/ErrorPage");
      return { Component: ErrorPage };
    },
  }
]