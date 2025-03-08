"use client"

import { useSelector } from "react-redux"
import { TaskList } from "@/components/task-list"
import { TaskInput } from "@/components/task-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { selectTasksDueToday } from "@/lib/features/tasks/tasksSlice"
import type { RootState } from "@/lib/store"
import { ViewToggle } from "@/components/view-toggle"
import { useState } from "react"

export default function TodayPage() {
  const [view, setView] = useState<"list" | "grid">("list")
  const todayTasks = useSelector((state: RootState) => selectTasksDueToday(state))

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Today&apos;s Tasks</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-bold">Tasks for Today</CardTitle>
            <CardDescription>Focus on what matters today</CardDescription>
          </div>
          <ViewToggle view={view} setView={setView} />
        </CardHeader>
        <CardContent>
          <TaskInput />
          <div className="mt-6">
            <TaskList tasks={todayTasks} view={view} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

