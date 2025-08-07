import { useEffect, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"

import { authApi, useGetUserQuery, useRefreshTokenMutation } from "../services"
import { login, logout } from "../redux"
import { LoadingSpinner } from "./loadingSpinner"

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { data, error, refetch } = useGetUserQuery(undefined, { refetchOnMountOrArgChange: true })
  const [refreshToken] = useRefreshTokenMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Выход пользователя.
  const logoutUser = () => {
    dispatch(logout())
    navigate("/login", { replace: true })
  }

  // Очистка кэша при выходе пользователя
  useEffect(() => {
    return () => {
      dispatch(authApi.util.resetApiState())
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Получение данных пользователя.
  useEffect(() => {
    if (error) {
      if ("status" in error && error.status === 401) {
        refreshToken()
          .unwrap()
          .then(response => {
            localStorage.setItem("accessToken", response.accessToken)
            localStorage.setItem("refreshToken", response.refreshToken)
            refetch()
          })
          .catch(() => logoutUser())
      } else {
        logoutUser()
      }
    }
  }, [error]) // eslint-disable-line react-hooks/exhaustive-deps

  // Сохранение данных пользователя.
  useEffect(() => {
    if (data) dispatch(login(data))
  }, [data]) // eslint-disable-line react-hooks/exhaustive-deps

  return data ? <>{children}</> : <LoadingSpinner />
}
