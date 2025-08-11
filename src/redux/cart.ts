import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

import type { Cart, CartProduct } from "../types"

const initialState: Cart = {
  products: [],
  total: 0,
  totalProducts: 0,
  totalQuantity: 0,
}

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<Cart>) => {
      state.products = action.payload.products.map(product => {
        return { ...product, total: Number(product.total.toFixed(2)) }
      })
      state.total = Number(action.payload.total.toFixed(2))
      state.totalProducts = action.payload.totalProducts
      state.totalQuantity = action.payload.totalQuantity
    },
    addProduct: (state, action: PayloadAction<Omit<CartProduct, "quantity" | "total">>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id)
      if (index === -1) {
        state.products.push({
          id: action.payload.id,
          price: action.payload.price,
          quantity: 1,
          thumbnail: action.payload.thumbnail,
          title: action.payload.title,
          total: Number(action.payload.price.toFixed(2)),
        })
        state.totalProducts++
      } else {
        state.products[index] = {
          ...state.products[index],
          quantity: state.products[index].quantity + 1,
          total: Number((state.products[index].total + state.products[index].price).toFixed(2)),
        }
      }
      state.totalQuantity++
      state.total = Number((action.payload.price + state.total).toFixed(2))
    },
    decreaseProductByOne: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id)
      state.totalQuantity--
      state.total = Number((state.total - state.products[index].price).toFixed(2))
      if (state.products[index].quantity === 1) {
        state.products.splice(index, 1)
        state.totalProducts--
      } else {
        state.products[index] = {
          ...state.products[index],
          quantity: state.products[index].quantity - 1,
          total: Number((state.products[index].total - state.products[index].price).toFixed(2)),
        }
      }
    },
    removeProduct: (state, action: PayloadAction<{ id: number }>) => {
      const index = state.products.findIndex(product => product.id === action.payload.id)
      state.total = Number((state.total - state.products[index].total).toFixed(2))
      state.totalQuantity -= state.products[index].quantity
      state.totalProducts--
      state.products.splice(index, 1)
    },
    removeCart: state => {
      state.products = []
      state.total = 0
      state.totalProducts = 0
      state.totalQuantity = 0
    },
  },
})

export const { addProduct, decreaseProductByOne, removeProduct, setCart, removeCart } = cartSlice.actions
export default cartSlice.reducer
