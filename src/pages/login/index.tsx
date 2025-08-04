import { Visibility, VisibilityOff } from "@mui/icons-material"
import CasinoIcon from "@mui/icons-material/Casino"
import KeyIcon from "@mui/icons-material/Key"
import LoginIcon from "@mui/icons-material/Login"
import PersonIcon from "@mui/icons-material/Person"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  TextField,
} from "@mui/material"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useGetUserByIdQuery, useLoginMutation } from "../../services"
import { useNotification } from "../../utils"

export const Login = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [randomId, setRandomId] = useState<number>(1)

  const usersCount = 208

  const { data: userData, refetch, isLoading: randomizeIsLoading, isFetching } = useGetUserByIdQuery(randomId)
  const [login, { isLoading }] = useLoginMutation()

  const { notify } = useNotification()
  const navigate = useNavigate()

  // Перенаправление, если пользователь уже вошёл.
  useEffect(() => {
    if (localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) navigate("/")
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Установка данных случайного пользователя.
  useEffect(() => {
    if (userData) {
      setPassword(userData.password)
      setUsername(userData.username)
    }
  }, [userData])

  const handleClickShowPassword = () => setShowPassword(show => !show)

  // Перенаправление на главную.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await login({ username, password }).unwrap()
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      navigate("/")
    } catch (error) {
      notify("Неверный логин или пароль.", "error")
      console.error("Login failed", error)
    }
  }

  // Получение случайного пользователя.
  const randomizeUsers = () => {
    const date = Date.now()
    const seed = date % 1000000
    setRandomId(1 + (seed % (usersCount - 1 + 1)))
    refetch()
  }

  return (
    <Box
      sx={{ minWidth: "100vw", minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Card sx={{ maxWidth: 500, width: 500 }}>
        <CardContent sx={{ flexGrow: "1" }}>
          <Box sx={{ display: "flex", gap: 3, justifyContent: "center", alignItems: "center", mb: 2 }}>
            <img src="/FS.png" alt="logo" width={50} height={50} />
            <h2 style={{ fontSize: 42, fontWeight: "bold", padding: 0, margin: 0 }}>FAKE STORE</h2>
          </Box>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: "flex", alignItems: "flex-end", gap: 2 }}>
              <PersonIcon fontSize="medium" sx={{ color: "action.active", mb: 1.5 }} />
              <TextField
                fullWidth
                margin="normal"
                id="username"
                variant="standard"
                label="Логин"
                required
                value={username}
                onChange={e => setUsername(e.target.value)}
              />
            </Box>
            <Box margin="normal" sx={{ display: "flex", alignItems: "flex-end", gap: 2, mb: 5 }}>
              <KeyIcon fontSize="medium" sx={{ color: "action.active", mb: 0.5 }} />
              <FormControl fullWidth variant="standard">
                <InputLabel htmlFor="standard-adornment-password">Пароль *</InputLabel>
                <Input
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  id="password"
                  required
                  type={showPassword ? "text" : "password"}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword}>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </Box>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button
                variant="text"
                startIcon={<CasinoIcon />}
                disableElevation
                onClick={randomizeUsers}
                loading={randomizeIsLoading || isFetching}
                loadingPosition="start"
              >
                Случайный пользователь
              </Button>
              <Button
                startIcon={<LoginIcon />}
                disableElevation
                type="submit"
                loading={isLoading}
                loadingPosition="start"
              >
                Войти
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
