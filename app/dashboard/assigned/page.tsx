"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { TaskList } from "@/components/task-list"
import { TaskInput } from "@/components/task-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { selectAssignedTasks } from "@/lib/features/tasks/tasksSlice"
import { ViewToggle } from "@/components/view-toggle"

export default function AssignedTasksPage() {
  const [view, setView] = useState<"list" | "grid">("list")
  const assignedTasks = useSelector(selectAssignedTasks)

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Assigned Tasks</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-bold">Tasks Assigned to You</CardTitle>
            <CardDescription>Manage tasks that have been assigned to you</CardDescription>
          </div>
          <ViewToggle view={view} setView={setView} />
        </CardHeader>
        <CardContent>
          <TaskInput />
          <div className="mt-6">
            <TaskList tasks={assignedTasks} view={view} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

