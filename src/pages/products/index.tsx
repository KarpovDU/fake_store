import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Box, Pagination } from "@mui/material"

import { Footer, LoadingSpinner, ProductCard, SearchBox, TopBar } from "../../components"
import { useGetAllProductsQuery } from "../../services"

export function Main() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const pageParam = queryParams.get("page")

  const counPerPage = 20
  const [page, setPage] = useState<number>(Number(pageParam) || 1)
  const [totalPages, setTotalPages] = useState(0)
  const { data, isLoading } = useGetAllProductsQuery({ page: page })

  // Вычисление количества страниц.
  useMemo(() => {
    if (data) setTotalPages(Math.ceil(data?.total / counPerPage))
  }, [data])

  // Переключение страниц товаров.
  const handleChangePage = (e: React.ChangeEvent<unknown>, currentPage: number) => {
    e.preventDefault()
    navigate(`?page=${currentPage}`, { replace: true })
  }

  useEffect(() => {
    if (pageParam && Number(pageParam) !== page) {
      setPage(Number(pageParam))
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
  }, [location.search]) // eslint-disable-line react-hooks/exhaustive-deps

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
