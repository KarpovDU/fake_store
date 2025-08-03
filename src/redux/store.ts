import { configureStore } from "@reduxjs/toolkit"

import { authApi } from "../services"
import userReducer from "./user"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
})
