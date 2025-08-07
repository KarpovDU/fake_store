import { Link, useNavigate } from "react-router-dom"
import { Box, IconButton, Paper, useColorScheme } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { useDispatch } from "react-redux"
import { logout } from "../redux"

export function TopBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { colorScheme, setColorScheme } = useColorScheme()

  // Смена цветовой темы.
  const changeTheme = () => {
    setColorScheme(colorScheme === "dark" ? "light" : "dark")
  }

  // Функция выхода из профиля.
  const handleLogout = () => {
    dispatch(logout())
    navigate("/login", { replace: true })
  }

  return (
    <Paper
      square
      elevation={3}
      sx={{
        zIndex: 1,
        position: "sticky",
        top: 0,
        left: 0,
        width: "100%",
        height: 60,
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Link
        to={{
          pathname: "/",
        }}
        style={{ all: "unset", cursor: "pointer" }}
      >
        <Box
          sx={{ display: "flex", gap: 2, justifyContent: "flex-start", alignItems: "center", height: "100%", mx: 2 }}
        >
          <img src={`/FS${colorScheme === "dark" ? "_dark" : ""}.png`} alt="logo" width={30} height={30} />
          <h2 style={{ fontSize: 28, fontWeight: "bold", padding: 0, margin: 0 }}>FAKE STORE</h2>
        </Box>
      </Link>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", alignItems: "center", height: "100%", mx: 2 }}>
        <IconButton onClick={changeTheme}>{colorScheme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}</IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}
