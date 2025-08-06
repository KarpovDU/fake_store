import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import { type AllUsersResponse, type Auth, type User } from "../types"

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/",
  }),
  endpoints: builder => ({
    getUserById: builder.query<User & Auth, number>({
      query: id => `users/${id}`,
    }),
    getAllUsers: builder.query<AllUsersResponse, void>({
      query: () => "users",
    }),
  }),
})

export const { useGetUserByIdQuery, useGetAllUsersQuery } = userApi
