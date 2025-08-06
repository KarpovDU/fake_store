import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import StarIcon from "@mui/icons-material/Star"
import StarBorderIcon from "@mui/icons-material/StarBorder"
import StarHalfIcon from "@mui/icons-material/StarHalf"
import { Box, Button, Link, Paper, Typography } from "@mui/material"

import type { ReactNode } from "react"
import type { IProduct } from "../types"

type ProductProps = {
  product: IProduct
}

export function ProductCard({ product }: ProductProps) {
  // Генерация звезд рейтинга.
  const generateRatingStars = (rating: number) => {
    const stars: ReactNode[] = []
    const fullStars = Math.floor(rating)
    for (let i = 0; i < fullStars; i++) {
      stars.push(<StarIcon color="warning" />)
    }
    const partOfStar = rating - fullStars
    if (partOfStar < 0.25) {
      stars.push(<StarBorderIcon color="warning" />)
    } else if (partOfStar > 0.75) {
      stars.push(<StarIcon color="warning" />)
    } else {
      stars.push(<StarHalfIcon color="warning" />)
    }
    for (let i = stars.length; i < 5; i++) {
      stars.push(<StarBorderIcon color="warning" />)
    }
    return stars
  }

  return (
    <Paper elevation={3} sx={{ display: "flex", padding: 2, gap: 5 }}>
      <img src={product.images[0]} width={200} height={200} />
      <Box sx={{ display: "flex", flexDirection: "column", flex: 1, gap: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Link
            href={`/products/${product.id}`}
            underline="none"
            sx={{ margin: 0, padding: 0, fontSize: 24, fontWeight: "500", textTransform: "uppercase" }}
            color="primary"
          >
            {product.title}
          </Link>
          <Box sx={{ display: "flex", gap: 2 }}>
            <Box>{generateRatingStars(product.rating).map(star => star)}</Box>
            {product.rating}
          </Box>
        </Box>
        <Typography>{product.description}</Typography>
        <Box sx={{ display: "flex", flex: 1, alignItems: "flex-end" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 24, fontWeight: "500" }} color="primary">
              {product.price}
            </Typography>
            <AttachMoneyIcon color="primary" />
          </Box>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            <Button startIcon={<ShoppingCartIcon />} variant="contained">
              В КОРЗИНУ
            </Button>
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}
