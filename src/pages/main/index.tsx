import { Box } from "@mui/material"

import { SearchBox, TopBar } from "../../components"

export function Main() {
  return (
    <Box>
      <TopBar />
      <Box sx={{ margin: "0 auto", maxWidth: 1200, width: 1200, py: 4 }}>
        <SearchBox />
      </Box>
    </Box>
  )
}
