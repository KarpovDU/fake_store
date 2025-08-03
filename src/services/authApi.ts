import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { IAuth, IRefreshTokenResponse, IUserAuthResponse } from "../types"

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/auth/",
    prepareHeaders: headers => {
      const accessToken = localStorage.getItem("accessToken")
      if (accessToken) {
        headers.set("Authorization", `Bearer ${accessToken}`)
      }
      return headers
    },
  }),
  endpoints: builder => ({
    login: builder.mutation<IUserAuthResponse, IAuth>({
      query: credentials => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    getUser: builder.query<IUserAuthResponse, void>({
      query: () => "/me",
    }),
    refreshToken: builder.mutation<IRefreshTokenResponse, void>({
      query: () => ({
        url: "refresh",
        method: "POST",
        body: {
          refreshToken: localStorage.getItem("refreshToken"),
        },
      }),
    }),
  }),
})

export const { useLoginMutation, useGetUserQuery, useRefreshTokenMutation } = authApi
