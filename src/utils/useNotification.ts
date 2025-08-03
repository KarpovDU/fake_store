import { createContext, useContext } from "react"

import type { NotificationContextType } from "../types"

// Создаем контекст уведомлений
export const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

// Хук для использования контекста уведомлений
export function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error("useNotification должен использоваться внутри NotificationProvider")
  }
  return context
}
