import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { PrivateRoute } from "./components/privateRoute.tsx"
import { Login } from "./pages"
import { Main } from "./pages/main/index.tsx"
import store from "./redux/store.ts"

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Main />
      </PrivateRoute>
    ),
  },
  { path: "/login", element: <Login /> },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
