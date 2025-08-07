import AttachMoneyIcon from "@mui/icons-material/AttachMoney"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import StarIcon from "@mui/icons-material/Star"
import { Box, Button, Paper, Typography } from "@mui/material"
import { useEffect, useMemo, useState } from "react"
import { useParams } from "react-router-dom"

import { Footer, InfoRow, LoadingSpinner, Review, TopBar } from "../../components"
import { useGetAllProductsQuery, useGetSingleProductByIdQuery } from "../../services"

export function ProductPage() {
  // Получение ID из URL.
  const { id: productId } = useParams()
  const productIdNumber = Number(productId)

  // Получение количества всех товаров.
  const { data: allProducts } = useGetAllProductsQuery({ page: 1 })
  const count = useMemo(() => {
    return allProducts?.total || 0
  }, [allProducts])

  // Проверка ID из URL на валидность.
  const checkId = (id: number) => {
    return isNaN(id) && count >= productIdNumber && id > 0
  }

  const {
    data: product,
    isLoading,
    isError,
  } = useGetSingleProductByIdQuery(productIdNumber, { skip: checkId(productIdNumber) })

  const [selectedImage, setSelectedImage] = useState<string>("")

  useEffect(() => {
    if (product) {
      setSelectedImage(product.images[0])
    }
  }, [product])

  // Преобразование окончания.
  function morph(int: number) {
    const arr = ["отзыв", "отзыва", "отзывов"]
    return arr[int % 100 > 4 && int % 100 < 20 ? 2 : [2, 0, 1, 1, 1, 2][int % 10 < 5 ? int % 10 : 5]]
  }

  if (isLoading) return <LoadingSpinner />

  if (isError || !product) return <div>Ошибка</div>

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <Box sx={{ margin: "0 auto", maxWidth: 1200, width: 1200, py: 4, display: "flex", gap: 10, flex: 1 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 3, width: 500 }}>
          <Paper sx={{ padding: 0, width: 500, height: 500 }}>
            {selectedImage && <img src={selectedImage} width={500} height={500} />}
          </Paper>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            {product.images.map((image, index) => {
              const border =
                selectedImage === image
                  ? { borderWidth: 2, borderStyle: "solid", borderColor: theme => theme.palette.primary.main }
                  : {}
              return (
                <div key={index} onClick={() => setSelectedImage(image)}>
                  <Paper sx={{ cursor: "pointer", width: 150, height: 150, ...border }}>
                    <img
                      src={image}
                      width={selectedImage === image ? 146 : 150}
                      height={selectedImage === image ? 146 : 150}
                    />
                  </Paper>
                </div>
              )
            })}
          </Box>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Typography color="primary" sx={{ fontWeight: "bold", fontSize: 24 }}>
            {product.title}
          </Typography>

          <Typography>{product.description}</Typography>

          <Box sx={{ display: "flex" }}>
            <Box sx={{ width: "250px", display: "flex", flexDirection: "column", gap: 1 }}>
              <InfoRow first="Вес" second={`${product.weight} кг`} />
              <InfoRow first="Количество" second={`${product.stock} шт`} />
              <InfoRow first="Высота" second={`${product.dimensions.height} см`} />
              <InfoRow first="Ширина" second={`${product.dimensions.width} см`} />
              <InfoRow first="Глубина" second={`${product.dimensions.depth} см`} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end", flexGrow: 1 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  flexDirection: "column",
                  alignItems: "flex-end",
                  gap: 1,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography sx={{ fontSize: 36, fontWeight: "500" }} color="primary">
                    {product.price}
                  </Typography>
                  <AttachMoneyIcon fontSize="large" color="primary" />
                </Box>
                <Button variant="contained" startIcon={<ShoppingCartIcon />}>
                  В КОРЗИНУ
                </Button>
              </Box>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              <StarIcon fontSize="small" color="warning" />
              <Typography>
                {product.rating} • {product.reviews.length} {morph(product.reviews.length)}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
              {product.reviews.map((review, index) => {
                return <Review key={index} review={review} />
              })}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  )
}
