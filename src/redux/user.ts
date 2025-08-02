import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { IUser } from "../types/userTypes"

const initialState: IUser = {
  email: null,
  firstName: null,
  gender: null,
  id: null,
  image: null,
  lastName: null,
  username: null,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<IUser>) => {
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.gender = action.payload.gender
      state.id = action.payload.id
      state.image = action.payload.image
      state.lastName = action.payload.lastName
      state.username = action.payload.username
    },
    logout: state => {
      state.email = null
      state.firstName = null
      state.gender = null
      state.id = null
      state.image = null
      state.lastName = null
      state.username = null
    },
  },
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
