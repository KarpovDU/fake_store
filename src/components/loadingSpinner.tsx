import { Backdrop, CircularProgress } from "@mui/material"

type LoadingSpinnerProps = {
  isLoading?: boolean
}

export function LoadingSpinner({ isLoading = true }: LoadingSpinnerProps) {
  return (
    <Backdrop invisible sx={{ zIndex: 1000 }} open={isLoading}>
      <CircularProgress color="primary" />
    </Backdrop>
  )
}
