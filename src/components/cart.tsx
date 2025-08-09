import AddIcon from "@mui/icons-material/Add"
import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import CloseIcon from "@mui/icons-material/Close"
import RemoveIcon from "@mui/icons-material/Remove"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { Badge, Box, Divider, Fab, IconButton, Paper, Typography } from "@mui/material"
import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

import { RootState } from "../redux"
import { useGetUserCartQuery } from "../services"
import type { CartProduct } from "../types"

export function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const cartRef = useRef<HTMLDivElement>(null)
  const user = useSelector((state: RootState) => state.user)
  const { data } = useGetUserCartQuery(user.id!, { skip: !user.id })

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
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation()
    setIsOpen(prev => !prev)
  }

  // Отображать корзину, если существует.
  if (data?.carts[0])
    return (
      <>
        <Fab onClick={handleClick} color="primary" sx={{ position: "fixed", right: "20px", bottom: "20px" }}>
          <Badge badgeContent={data?.carts[0].products.length}>
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
            {data?.carts[0].products.map((product, index) => (
              <span key={product.id}>
                <CartItem product={product} setIsOpen={setIsOpen} />
                {index !== data.carts[0].products.length - 1 && <Divider variant="fullWidth" />}
              </span>
            ))}
            <Box sx={{ position: "sticky", bottom: 0, backgroundColor: theme => theme.palette.primary.main }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 2 }}>
                <Typography sx={{ mr: 2, color: theme => theme.palette.background.default }}>Итого: </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ color: theme => theme.palette.background.default }} color="primary">
                    {data.carts[0].total}
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
          <IconButton>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography>Цена: {product.price}$</Typography>
            <Typography>Итого: {product.total}$</Typography>
          </Box>
          <ChangeCount count={product.quantity} />
        </Box>
      </Box>
    </Box>
  )
}

/**
 * Кнопка изменения количества
 */
export const ChangeCount = ({ count }: { count: number }) => {
  return (
    <Paper sx={{ display: "flex", width: "fit-content", alignItems: "center", height: "fit-content" }}>
      <IconButton>
        <RemoveIcon fontSize="small" />
      </IconButton>
      <Divider orientation="vertical" />
      <Typography sx={{ mx: 1, width: 25, textAlign: "center" }}>{count}</Typography>
      <Divider orientation="vertical" />
      <IconButton>
        <AddIcon fontSize="small" />
      </IconButton>
    </Paper>
  )
}
