import type { ReactNode } from "react"
import { createTheme, CssBaseline, ThemeProvider as MuiThemeProvider } from "@mui/material"

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
})

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  )
}
