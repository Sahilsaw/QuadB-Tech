"use client"

import { useState, useEffect } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { motion } from "framer-motion"

interface Notification {
  id: string
  title: string
  message: string
  timestamp: Date
}

export function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    // Simulating fetching notifications
    const fetchNotifications = () => {
      const newNotifications: Notification[] = [
        {
          id: "1",
          title: "New task assigned",
          message: "You have been assigned a new task: 'Complete project report'",
          timestamp: new Date(),
        },
        {
          id: "2",
          title: "Task due soon",
          message: "The task 'Prepare presentation' is due in 2 days",
          timestamp: new Date(Date.now() - 3600000), // 1 hour ago
        },
      ]
      setNotifications(newNotifications)
      setUnreadCount(newNotifications.length)
    }

    fetchNotifications()
  }, [])

  const handleReadNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id))
    setUnreadCount(Math.max(0, unreadCount - 1))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute right-1 top-1 h-2 w-2 rounded-full bg-red-500"
            />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="flex items-center justify-between p-2">
          <h2 className="text-sm font-semibold">Notifications</h2>
          {unreadCount > 0 && <span className="text-xs text-muted-foreground">{unreadCount} unread</span>}
        </div>
        {notifications.length === 0 ? (
          <div className="p-4 text-center text-sm text-muted-foreground">No new notifications</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              onSelect={() => handleReadNotification(notification.id)}
              className="flex flex-col items-start p-4 hover:bg-accent"
            >
              <div className="flex w-full justify-between">
                <span className="font-medium">{notification.title}</span>
                <span className="text-xs text-muted-foreground">{notification.timestamp.toLocaleTimeString()}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

