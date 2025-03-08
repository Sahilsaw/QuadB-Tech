"use client"

import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { motion } from "framer-motion"
import { TaskList } from "@/components/task-list"
import { TaskInput } from "@/components/task-input"
import { WeatherWidget } from "@/components/weather-widget"
import { TaskStats } from "@/components/task-stats"
import { UserProfileCard } from "@/components/user-profile-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { fetchTasks, selectAllTasks, selectTasksByStatus } from "@/lib/features/tasks/tasksSlice"
import type { AppDispatch, RootState } from "@/lib/store"
import { ViewToggle } from "@/components/view-toggle"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"

export default function DashboardPage() {
  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()
  const { user } = useAuth()
  const [view, setView] = useState<"list" | "grid">("list")
  const tasks = useSelector(selectAllTasks)
  const pendingTasks = useSelector((state: RootState) => selectTasksByStatus(state, false))
  const completedTasks = useSelector((state: RootState) => selectTasksByStatus(state, true))
  const isLoading = useSelector((state: RootState) => state.tasks.status === "loading")
  const error = useSelector((state: RootState) => state.tasks.error)

  useEffect(() => {
    dispatch(fetchTasks())
  }, [dispatch])

  useEffect(() => {
    if (error) {
      toast({
        title: "Error",
        description: error,
        variant: "destructive",
      })
    }
  }, [error, toast])

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:grid-cols-4">
        <div className="md:col-span-1">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <UserProfileCard user={user!} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="mt-6"
          >
            <TaskStats pendingCount={pendingTasks.length} completedCount={completedTasks.length} />
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="md:col-span-2 lg:col-span-3"
        >
          <WeatherWidget />
          <Card className="mt-6">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle className="text-xl font-bold">Tasks</CardTitle>
                <CardDescription>Manage your tasks efficiently</CardDescription>
              </div>
              <ViewToggle view={view} setView={setView} />
            </CardHeader>
            <CardContent>
              <TaskInput />
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-4">Recent Tasks</h2>
                {isLoading ? (
                  <div className="flex justify-center py-8">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
                  </div>
                ) : (
                  <TaskList tasks={tasks.slice(0, 5)} view={view} />
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

