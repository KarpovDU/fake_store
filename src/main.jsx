import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { Provider } from "react-redux"
import { createBrowserRouter, RouterProvider } from "react-router-dom"

import { PrivateRoute, ThemeProvider, NotificationProvider } from "./components"
import { Login, Main, ProductPage } from "./pages"
import { store } from "./redux"

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
  {
    path: "/products/:id",
    element: (
      <PrivateRoute>
        <ProductPage />
      </PrivateRoute>
    ),
  },
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <Provider store={store}>
        <NotificationProvider>
          <RouterProvider router={router} />
        </NotificationProvider>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
