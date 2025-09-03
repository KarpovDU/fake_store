import { useEffect } from "react"
import { createSearchParams, useNavigate } from "react-router-dom"

export function RedirectToProducts() {
  const navigate = useNavigate()

  useEffect(() => {
    navigate({ pathname: "/products", search: createSearchParams({ page: "1" }).toString() }, { replace: true })
  }, [navigate])

  return null
}
