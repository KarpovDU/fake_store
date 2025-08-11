import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import CloseIcon from "@mui/icons-material/Close"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { Badge, Box, Divider, Fab, IconButton, Paper, Typography } from "@mui/material"
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"

import { addProduct, decreaseProductByOne, removeProduct, RootState, setCart } from "../redux"
import { useGetUserCartQuery } from "../services"
import type { CartProduct } from "../types"
import { ChangeCount } from "./cartButton"

export function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const cartRef = useRef<HTMLDivElement>(null)
  const user = useSelector((state: RootState) => state.user)
  const cart = useSelector((state: RootState) => state.cart)
  const { data } = useGetUserCartQuery(user.id!, { skip: !user.id })
  const dispatch = useDispatch()

  // Закрыть корзину при клике вне её.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (cartRef.current && !cartRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener("click", handleClickOutside)
    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [])

  // Открыть корзину.
  const handleClick = (event: React.MouseEvent) => {
    event.stopPropagation()
    setIsOpen(prev => !prev)
  }

  // Запись корзины в хранилище, если имеется
  useEffect(() => {
    if (data?.carts[0]) dispatch(setCart(data.carts[0]))
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  // Отображать корзину, если существует.
  if (cart.totalProducts !== 0 && cart.totalQuantity !== 0)
    return (
      <>
        <Fab onClick={handleClick} color="primary" sx={{ position: "fixed", right: "20px", bottom: "20px" }}>
          <Badge badgeContent={cart.totalQuantity}>
            <ShoppingCartIcon />
          </Badge>
        </Fab>
        {isOpen && (
          <Paper
            ref={cartRef}
            sx={{
              position: "fixed",
              bottom: "90px",
              right: "20px",
              maxHeight: "calc(100vh - 160px)",
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              gap: 2,
              pt: 2,
            }}
          >
            {cart.products.map((product, index) => (
              <span key={index}>
                <CartItem product={product} setIsOpen={setIsOpen} />
                {index !== cart.totalProducts - 1 && <Divider variant="fullWidth" />}
              </span>
            ))}
            <Box sx={{ position: "sticky", bottom: 0, backgroundColor: theme => theme.palette.primary.main }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 2 }}>
                <Typography sx={{ mr: 2, color: theme => theme.palette.background.default }}>Итого: </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ color: theme => theme.palette.background.default }} color="primary">
                    {cart.total}
                  </Typography>
                  <AttachMoneyIcon fontSize="small" sx={{ color: theme => theme.palette.background.default }} />
                </Box>
              </Box>
            </Box>
          </Paper>
        )}
      </>
    )
}

/**
 * Один товар из корзины.
 */
const CartItem = ({ product, setIsOpen }: { product: CartProduct; setIsOpen: Dispatch<SetStateAction<boolean>> }) => {
  const dispatch = useDispatch()

  const handleRemoveProduct = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(removeProduct({ id: product.id }))
  }

  const decreaseCount = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(decreaseProductByOne({ id: product.id }))
  }

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

  return (
    <Box sx={{ display: "flex", gap: 2, px: 2 }}>
      <img src={product.thumbnail} width={100} height={100} style={{ background: "transparent" }} />
      <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
        <Box sx={{ display: "flex", gap: 3, justifyContent: "space-between", alignItems: "center" }}>
          <Link
            onClick={() => setIsOpen(false)}
            style={{ all: "unset", cursor: "pointer" }}
            to={{ pathname: `/products/${product.id}` }}
          >
            <Typography color="primary">{product.title}</Typography>
          </Link>
          <IconButton onClick={handleRemoveProduct}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 3 }}>
          <Box>
            <Typography>Цена: {product.price}$</Typography>
            <Typography>Итого: {product.total}$</Typography>
          </Box>
          <ChangeCount decreaseCount={decreaseCount} increaseCount={increaseCount} count={product.quantity} />
        </Box>
      </Box>
    </Box>
  )
}
