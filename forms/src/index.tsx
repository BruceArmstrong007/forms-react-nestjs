import { ColorModeScript } from "@chakra-ui/react"
import * as React from "react"
import * as ReactDOM from "react-dom/client"
import reportWebVitals from "./reportWebVitals"
import * as serviceWorker from "./serviceWorker"
import { Navigate, RouterProvider, createBrowserRouter } from "react-router-dom"
import { ErrorPage } from "./shared/components/error-page/ErrorPage"
import { AuthRoutes } from "./App/routes/auth/AuthRoutes"
import { AdminRoutes } from "./App/routes/admin/AdminRoutes"
import { UserRoutes } from "./App/routes/user/UserRoutes"


const container = document.getElementById("root")
if (!container) throw new Error('Failed to find the root element');
const root = ReactDOM.createRoot(container)

const router = createBrowserRouter([
  {
    path: "",
    async lazy() {
      let { App } = await import("./App/App");
      return { Component: App };
    },
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "auth",
        async lazy() {
          let { Auth } = await import("./App/routes/auth/Auth");
          return { Component: Auth };
        },
        children : AuthRoutes
      },
      {
        path: "admin",
        async lazy() {
          let { Admin } = await import("./App/routes/admin/Admin");
          return { Component: Admin };
        },
        children: AdminRoutes,
      },
      {
        path: "user",
        async lazy() {
          let { User } = await import("./App/routes/user/User");
          return { Component: User };
        },
        children: UserRoutes,
      },
      {
        path: "landing-page",
        async lazy() {
          let { LandingPage } = await import("./shared/components/landing-page/LandingPage");
          return { Component: LandingPage };
        },
      },
      {
        path: "*",
        element: <Navigate to='landing-page'/>,
      },
      {
        path: "",
        element: <Navigate to='landing-page'/>,
      },
    ],
  },
]);
root.render(
  <React.StrictMode>
    <ColorModeScript />
    <RouterProvider router={router} />
  </React.StrictMode>,
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorker.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()

