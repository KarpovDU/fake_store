import { useMemo, useState } from "react"
import { Box, Pagination } from "@mui/material"

import { Footer, LoadingSpinner, ProductCard, SearchBox, TopBar } from "../../components"
import { useGetAllProductsQuery } from "../../services"

export function Main() {
  const counPerPage = 20
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const { data, isLoading } = useGetAllProductsQuery({ page: page })

  // Вычисление количества страниц.
  useMemo(() => {
    if (data) setTotalPages(Math.ceil(data?.total / counPerPage))
  }, [data])

  // Переключение страниц товаров.
  const handleChangePage = (e: React.ChangeEvent<unknown>, currentPage: number) => {
    e.preventDefault()
    setPage(currentPage)
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
  }

  if (isLoading) return <LoadingSpinner />

  return (
    <Box>
      <TopBar />
      <Box
        sx={{ margin: "0 auto", maxWidth: 1200, width: 1200, py: 4, display: "flex", flexDirection: "column", gap: 10 }}
      >
        <SearchBox />
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {data?.products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </Box>
        <Pagination
          sx={{ margin: "0 auto" }}
          page={page}
          onChange={handleChangePage}
          count={totalPages}
          color="primary"
          size="large"
        />
      </Box>
      <Footer />
    </Box>
  )
}
