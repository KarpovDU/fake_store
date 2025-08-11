import { Divider, IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import { useState } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"

export function SearchBox() {
  const navigate = useNavigate()
  const queryParams = new URLSearchParams(location.search)
  const searchParam = queryParams.get("search")
  const [searchValue, setSearchValue] = useState(searchParam)

  const handleSubmit = () => {
    if (searchValue && searchValue !== searchParam) {
      console.log(searchValue, searchParam)
      navigate(
        {
          pathname: ".",
          search: createSearchParams({
            page: "1",
            search: searchValue,
          }).toString(),
        },
        { replace: true },
      )
      return
    } else if (!searchValue && searchParam) {
      navigate(
        {
          pathname: ".",
          search: createSearchParams({
            page: "1",
          }).toString(),
        },
        { replace: true },
      )
      return
    }
  }

  return (
    <Paper
      component="form"
      sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}
      onSubmit={e => {
        e.preventDefault()
        handleSubmit()
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Поиск товара..."
        value={searchValue}
        onChange={e => setSearchValue(e.currentTarget.value)}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
