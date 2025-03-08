"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "next/navigation"
import { TaskList } from "@/components/task-list"
import { TaskInput } from "@/components/task-input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { selectAllTasks } from "@/lib/features/tasks/tasksSlice"
import { selectAllLists } from "@/lib/features/lists/listsSlice"
import { ViewToggle } from "@/components/view-toggle"

export default function ListPage() {
  const [view, setView] = useState<"list" | "grid">("list")
  const params = useParams()
  const listId = params.listId as string

  const lists = useSelector(selectAllLists) || []
  const currentList = lists.find((list) => list.id === listId)
  const allTasks = useSelector(selectAllTasks)

  // In a real app, tasks would be associated with lists
  // For now, we'll just show all tasks on each list page
  const listTasks = allTasks

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{currentList?.name || "List"}</h1>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-xl font-bold">{currentList?.name || "List"} Tasks</CardTitle>
            <CardDescription>Manage tasks in this list</CardDescription>
          </div>
          <ViewToggle view={view} setView={setView} />
        </CardHeader>
        <CardContent>
          <TaskInput />
          <div className="mt-6">
            <TaskList tasks={listTasks} view={view} />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

