import { useNavigate } from "react-router-dom"

export function Main() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem("accessToken")
    localStorage.removeItem("refreshToken")
    navigate("/login")
  }

  return (
    <>
      Fake Store
      <button type="button" onClick={handleLogout}>
        Выйти
      </button>
    </>
  )
}
