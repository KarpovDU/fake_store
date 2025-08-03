import { useEffect, type ReactNode } from "react"
import { useNavigate } from "react-router-dom"

import { useGetUserQuery, useRefreshTokenMutation } from "../services"

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { data: userData, error, refetch } = useGetUserQuery()
  const [refreshToken, { error: refreshError }] = useRefreshTokenMutation()
  const navigate = useNavigate()

  // Выход пользователя.
  const logout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/login")
  }

  // Проверка токена.
  useEffect(() => {
    if (error && refreshError) {
      logout()
    }

    if (error && !refreshError) {
      refreshToken()
        .unwrap()
        .then(response => {
          localStorage.setItem("accessToken", response.accessToken)
          localStorage.setItem("refreshToken", response.refreshToken)
          refetch()
        })
        .catch(() => {
          logout()
        })
    }

    if (userData) {
      console.log(userData)
    }
  }, [error, refreshError, userData]) // eslint-disable-line react-hooks/exhaustive-deps

  return userData ? <>{children}</> : <>Loading...</>
}
