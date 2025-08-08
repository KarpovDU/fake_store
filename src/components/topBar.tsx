import { Link, useNavigate } from "react-router-dom"
import { Box, IconButton, Paper, Typography, useColorScheme } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"
import DarkModeIcon from "@mui/icons-material/DarkMode"
import LightModeIcon from "@mui/icons-material/LightMode"
import { useDispatch, useSelector } from "react-redux"

import { logout, RootState } from "../redux"

export function TopBar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector((state: RootState) => state.user)

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
          pathname: "/products",
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
        <Box sx={{ display: "flex", pr: 10, gap: 2, alignItems: "center" }}>
          {user.image && <img src={user.image} width={40} height={40} />}
          <Box>
            <Typography sx={{ color: theme => theme.palette.primary.main }}>
              {user.firstName} {user.lastName}
            </Typography>
            <Typography fontSize={10} sx={{ color: theme => theme.palette.grey[600] }}>
              {user.email}
            </Typography>
          </Box>
        </Box>
        <IconButton onClick={changeTheme}>{colorScheme === "dark" ? <DarkModeIcon /> : <LightModeIcon />}</IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}
