import { Button, Divider, IconButton, Paper, Typography } from "@mui/material"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import RemoveIcon from "@mui/icons-material/Remove"
import AddIcon from "@mui/icons-material/Add"
import { useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"

import { addProduct, decreaseProductByOne, type RootState } from "../redux"
import type { Product } from "../types"

export function CartButton({ product }: { product: Product }) {
  const cart = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()

  // Получение количества товара в корзине.
  const quantity = useMemo(() => {
    const productIndex = cart.products.findIndex(el => el.id === product.id)
    if (productIndex === -1) return 0
    return cart.products[productIndex].quantity
  }, [cart]) // eslint-disable-line react-hooks/exhaustive-deps

  // Увеличение количества товара.
  const increaseCount = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(
      addProduct({
        id: product.id,
        title: product.title,
        price: product.price,
        thumbnail: product.thumbnail,
      }),
    )
  }

  // Уменьшение количества товара.
  const decreaseCount = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(decreaseProductByOne({ id: product.id }))
  }

  return (
    <>
      {quantity === 0 ? (
        <Button onClick={increaseCount} startIcon={<ShoppingCartIcon />} variant="contained">
          В КОРЗИНУ
        </Button>
      ) : (
        <ChangeCount decreaseCount={decreaseCount} increaseCount={increaseCount} count={quantity} />
      )}
    </>
  )
}

type ChangeCountProps = {
  count: number
  increaseCount: (event: React.MouseEvent) => void
  decreaseCount: (event: React.MouseEvent) => void
}

/**
 * Кнопка изменения количества
 */
export const ChangeCount = ({ count, increaseCount, decreaseCount }: ChangeCountProps) => {
  return (
    <Paper sx={{ display: "flex", width: "fit-content", alignItems: "center", height: "fit-content" }}>
      <IconButton onClick={decreaseCount}>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Divider orientation="vertical" />
      <Typography sx={{ mx: 1, width: 25, textAlign: "center" }}>{count}</Typography>
      <Divider orientation="vertical" />
      <IconButton onClick={increaseCount}>
        <AddIcon fontSize="small" />
      </IconButton>
    </Paper>
  )
}
