"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { TaskList } from "@/components/task-list"
import { TaskInput } from "@/components/task-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { selectAllTasks } from "@/lib/features/tasks/tasksSlice"
import { ViewToggle } from "@/components/view-toggle"

export default function AllTasksPage() {
  const [view, setView] = useState<"list" | "grid">("list")
  const allTasks = useSelector(selectAllTasks)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">All Tasks</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-bold">Task Overview</CardTitle>
            <CardDescription>Manage all your tasks in one place</CardDescription>
          </div>
          <ViewToggle view={view} setView={setView} />
        </CardHeader>
        <CardContent>
          <TaskInput />
          <div className="mt-6">
            <TaskList tasks={allTasks} view={view} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

