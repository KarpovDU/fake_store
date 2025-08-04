import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { type IAllUsersResponse, type IAuth, type IUser } from "../types"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: builder => ({
    getUserById: builder.query<IUser & IAuth, number>({
      query: id => `users/${id}`,
    }),
    getAllUsers: builder.query<IAllUsersResponse, void>({
      query: () => "users",
    }),
  }),
})

export const { useGetUserByIdQuery, useGetAllUsersQuery } = userApi
