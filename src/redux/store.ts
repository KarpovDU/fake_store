import { configureStore } from "@reduxjs/toolkit"
import { authApi } from "../services/authApi"
import userReducer from "./user"

const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    user: userReducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware),
})

export default store
