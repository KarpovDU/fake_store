import { useEffect, type ReactNode } from "react"
import { useGetUserQuery, useRefreshTokenMutation } from "../services/authApi"
import { useNavigate } from "react-router-dom"

export function PrivateRoute({ children }: { children: ReactNode }) {
  const { data, isLoading, error } = useGetUserQuery()
  const [refreshToken, { error: refreshError }] = useRefreshTokenMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (error) {
      if (refreshError) {
        localStorage.removeItem("accessToken")
        localStorage.removeItem("refreshToken")
        navigate("/login")
      } else {
        refreshToken()
      }
    }
    if (data) {
      console.log(data)
    }
  }, [error, data, refreshError, refreshToken, navigate])

  if (isLoading) return <>Loading...</>
  if (data) return <>{children}</>
}
