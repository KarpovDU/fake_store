import { useCallback, useState, type ReactNode } from "react"
import { Alert, Snackbar } from "@mui/material"

import type { NotificationType, Notification } from "../types"
import { NotificationContext } from "../utils"

// Провайдер контекста для уведомлений.
export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null)
  const [open, setOpen] = useState(false)

  // Длительность уведомления.
  const duration = 3000

  // Функция для добавления уведомления.
  const notify = useCallback((message: string, type: NotificationType = "info") => {
    setNotification({ message, type })
    setOpen(true)
  }, [])

  // Функция для удаления уведомления.
  const handleClose = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {notification && (
        <Snackbar
          open={open}
          autoHideDuration={duration}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          onClose={handleClose}
        >
          <Alert onClose={handleClose} severity={notification.type} sx={{ width: "100%" }}>
            {notification.message}
          </Alert>
        </Snackbar>
      )}
    </NotificationContext.Provider>
  )
}
