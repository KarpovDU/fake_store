import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

export function RedirectToProducts() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate("/products")
  }, [navigate])

  return null
}
