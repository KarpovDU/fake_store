import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { Cart, CartsByUserResponse, CreateCartQuery, DeleteCartResponse, UpdateCartQuery } from "../types"

export const cartApi = createApi({
  reducerPath: "cartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/carts",
  }),
  endpoints: builder => ({
    getUserCart: builder.query<CartsByUserResponse, number>({
      query: id => ({
        url: `/user/${id}`,
      }),
    }),
    createNewCart: builder.mutation<CartsByUserResponse, CreateCartQuery>({
      query: ({ userId, product, quantity = 1 }) => ({
        url: "/add",
        method: "POST",
        body: {
          userId,
          products: [
            {
              id: product,
              quantity,
            },
          ],
        },
      }),
    }),
    deleteCart: builder.mutation<DeleteCartResponse, number>({
      query: cartId => ({
        url: `/${cartId}`,
        method: "DELETE",
      }),
    }),
    updateCart: builder.mutation<Cart, UpdateCartQuery>({
      query: ({ cartId, product, quantity = 1 }) => ({
        url: `/${cartId}`,
        method: "PUT",
        body: {
          merge: true,
          products: [
            {
              id: product,
              quantity,
            },
          ],
        },
      }),
    }),
  }),
})

export const { useCreateNewCartMutation, useDeleteCartMutation, useGetUserCartQuery, useUpdateCartMutation } = cartApi
