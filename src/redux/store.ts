import { configureStore } from "@reduxjs/toolkit"

import { authApi, userApi } from "../services"
import userReducer from "./user"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware),
})
