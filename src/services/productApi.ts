import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

import type { ProductsByCategoryQuery, ProductsQuery, ProductsResponse, ProductsSearchQuery } from "../types"

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://dummyjson.com/products",
  }),
  endpoints: builder => ({
    getAllProducts: builder.query<ProductsResponse, ProductsQuery>({
      query: ({ page }) => `?limit=20&skip=${(page - 1) * 20}`,
    }),
    searchProducts: builder.query<ProductsResponse, ProductsSearchQuery>({
      query: ({ search, page }) => `/search?q=${search}&skip=${(page - 1) * 20}&limit=20`,
    }),
    getProductsCategoriesList: builder.query<string[], void>({
      query: () => "/category-list",
    }),
    getProductsByCategory: builder.query<ProductsResponse, ProductsByCategoryQuery>({
      query: ({ page, category }) => `/category/${category}?skip=${(page - 1) * 20}`,
    }),
  }),
})

export const {
  useGetAllProductsQuery,
  useGetProductsByCategoryQuery,
  useGetProductsCategoriesListQuery,
  useSearchProductsQuery,
} = productApi
