import { useEffect, useMemo, useState } from "react"
import { createSearchParams, useLocation, useNavigate } from "react-router-dom"
import { Box, Pagination, Typography } from "@mui/material"

import { Footer, LoadingSpinner, ProductCard, SearchBox, TopBar } from "../../components"
import { useGetAllProductsQuery, useSearchProductsQuery } from "../../services"

export function Main() {
  const location = useLocation()
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const pageParam = queryParams.get("page")
  const searchParam = queryParams.get("search")

  const countPerPage = 20
  const [page, setPage] = useState<number>(Number(pageParam) || 1)
  const [totalPages, setTotalPages] = useState(0)
  const { data, isLoading } = useGetAllProductsQuery({ page: page })
  const { data: searchData, isLoading: searchLoading } = useSearchProductsQuery(
    { page: page, search: searchParam! },
    { skip: !searchParam },
  )

  const products = searchParam ? searchData?.products : data?.products
  const total = searchParam ? searchData?.total : data?.total

  // Вычисление количества страниц.
  useMemo(() => {
    if (total) setTotalPages(Math.ceil(total / countPerPage))
  }, [total])

  // Переключение страниц товаров.
  const handleChangePage = (e: React.ChangeEvent<unknown>, currentPage: number) => {
    e.preventDefault()
    navigate(
      {
        pathname: ".",
        search:
          createSearchParams({
            page: currentPage.toString(),
          }).toString() + (searchParam ? `&search=${searchParam}` : ""),
      },
      { replace: true },
    )
  }

  useEffect(() => {
    if (pageParam && Number(pageParam) !== page) {
      setPage(Number(pageParam))
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" })
    }
  }, [location.search]) // eslint-disable-line react-hooks/exhaustive-deps

  if (isLoading || searchLoading) return <LoadingSpinner />

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <TopBar />
      <Box
        sx={{
          margin: "0 auto",
          maxWidth: 1200,
          width: 1200,
          py: 4,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          flex: 1,
        }}
      >
        <SearchBox />
        {products && products.length > 0 ? (
          <>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </Box>
            {totalPages > 1 && (
              <Pagination
                sx={{ margin: "0 auto" }}
                page={page}
                onChange={handleChangePage}
                count={totalPages}
                color="primary"
                size="large"
              />
            )}
          </>
        ) : (
          <Box sx={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Typography color="textDisabled">Ничего не найдено</Typography>
          </Box>
        )}
      </Box>
      <Footer />
    </Box>
  )
}
