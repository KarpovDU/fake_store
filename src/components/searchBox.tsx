import { Divider, IconButton, InputBase, Paper } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"

export function SearchBox() {
  return (
    <Paper component="form" sx={{ p: "2px 4px", display: "flex", alignItems: "center" }}>
      <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Поиск товара..." />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  )
}
