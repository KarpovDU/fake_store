export type NotificationType = "success" | "error" | "info" | "warning"

export interface Notification {
  message: string
  type: NotificationType
}

export interface NotificationContextType {
  notify: (message: string, type?: NotificationType) => void
}
