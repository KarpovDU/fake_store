import { configureStore } from "@reduxjs/toolkit"

import { authApi, productApi, userApi } from "../services"
import userReducer from "./user"

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware).concat(productApi.middleware),
})
