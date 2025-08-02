import React, { useEffect, useState } from "react"
import { useLoginMutation } from "../../services/authApi"
import { useNavigate } from "react-router-dom"

export const Login = () => {
  const [username, setUsername] = useState("emilys")
  const [password, setPassword] = useState("emilyspass")
  const [login, { isLoading, error }] = useLoginMutation()
  const navigate = useNavigate()

  useEffect(() => {
    if (localStorage.getItem("accessToken") && localStorage.getItem("refreshToken")) navigate("/")
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await login({ username, password }).unwrap()
      localStorage.setItem("accessToken", response.accessToken)
      localStorage.setItem("refreshToken", response.refreshToken)
      navigate("/")
    } catch (error) {
      console.error("Login failed", error)
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <input type="text" placeholder="Логин" value={username} onChange={e => setUsername(e.target.value)} required />
      <input
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <button type="submit" disabled={isLoading}>
        Войти
      </button>
      {error && <p>Введен неверный логин или пароль</p>}
    </form>
  )
}
