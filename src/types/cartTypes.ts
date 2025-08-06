import { Product } from "./productTypes"

export interface Cart {
  id: number
  products: Product[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
}

export type CartsByUserResponse = {
  carts: Cart[]
  total: number
  skip: number
  limit: number
}

export type CreateCartQuery = {
  userId: number
  product: number
  quantity?: number
}

export type UpdateCartQuery = {
  cartId: number
  product: number
  quantity: number
}

export type DeleteCartResponse = {
  id: number
  products: Product[]
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
  isDeleted: boolean
  deletedOn: Date
}
