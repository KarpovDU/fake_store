import { useNavigate } from "react-router-dom"
import { Box, IconButton, Paper } from "@mui/material"
import LogoutIcon from "@mui/icons-material/Logout"

export function TopBar() {
  const navigate = useNavigate()

  // Функция выхода из профиля.
  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
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
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-start", alignItems: "center", height: "100%", mx: 2 }}>
        <img src="/FS.png" alt="logo" width={30} height={30} />
        <h2 style={{ fontSize: 28, fontWeight: "bold", padding: 0, margin: 0 }}>FAKE STORE</h2>
      </Box>
      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", alignItems: "center", height: "100%", mx: 2 }}>
        <IconButton onClick={handleLogout}>
          <LogoutIcon />
        </IconButton>
      </Box>
    </Paper>
  )
}
