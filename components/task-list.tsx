"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { motion, AnimatePresence } from "framer-motion"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Trash2, Calendar, MoreHorizontal, Edit } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { toggleTaskCompletion, removeTask, toggleTaskImportance, updateTask } from "@/lib/features/tasks/tasksSlice"
import type { AppDispatch } from "@/lib/store"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { Task } from "@/lib/types"
import { useToast } from "@/components/ui/use-toast"

interface TaskListProps {
  tasks: Task[]
  view: "list" | "grid"
}

export function TaskList({ tasks, view }: TaskListProps) {
  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [editedTaskTitle, setEditedTaskTitle] = useState("")

  const handleToggleCompletion = (taskId: string, completed: boolean) => {
    dispatch(toggleTaskCompletion(taskId))

    toast({
      title: completed ? "Task marked as incomplete" : "Task completed",
      description: completed
        ? "The task has been marked as incomplete."
        : "Great job! The task has been marked as complete.",
    })
  }

  const handleRemoveTask = (taskId: string) => {
    dispatch(removeTask(taskId))

    toast({
      title: "Task removed",
      description: "The task has been removed successfully.",
    })
  }

  const handleToggleImportance = (taskId: string, isImportant: boolean) => {
    dispatch(toggleTaskImportance(taskId))

    toast({
      title: isImportant ? "Task unmarked as important" : "Task marked as important",
      description: isImportant ? "The task has been unmarked as important." : "The task has been marked as important.",
    })
  }

  const handleEditTask = (task: Task) => {
    setEditingTaskId(task.id)
    setEditedTaskTitle(task.title)
  }

  const handleSaveEdit = (task: Task) => {
    if (editedTaskTitle.trim() !== "") {
      dispatch(updateTask({ ...task, title: editedTaskTitle }))
      setEditingTaskId(null)
      toast({
        title: "Task updated",
        description: "The task has been updated successfully.",
      })
    }
  }

  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "high":
        return "priority-high"
      case "medium":
        return "priority-medium"
      case "low":
        return "priority-low"
      default:
        return ""
    }
  }

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <div className="rounded-full bg-primary/10 p-3">
          <ChecklistIcon className="h-6 w-6 text-primary" />
        </div>
        <h3 className="mt-4 text-lg font-medium">No tasks found</h3>
        <p className="mt-2 text-sm text-muted-foreground">Add a new task to get started.</p>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {view === "list" ? (
        <div className="space-y-2">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              layout
              className={cn(
                "group relative flex items-center justify-between rounded-lg border p-3 text-sm transition-all hover:bg-accent task-card",
                task.completed && "bg-muted",
                getPriorityClass(task.priority),
              )}
            >
              <div className="flex items-center gap-3 flex-1">
                <Checkbox
                  checked={task.completed}
                  onCheckedChange={() => handleToggleCompletion(task.id, task.completed)}
                  className={cn(task.completed && "bg-primary border-primary text-primary-foreground")}
                />
                {editingTaskId === task.id ? (
                  <Input
                    value={editedTaskTitle}
                    onChange={(e) => setEditedTaskTitle(e.target.value)}
                    onBlur={() => handleSaveEdit(task)}
                    onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(task)}
                    className="flex-1"
                    autoFocus
                  />
                ) : (
                  <div className="flex flex-col">
                    <span className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
                      {task.title}
                    </span>
                    {task.dueDate && (
                      <span className="text-xs text-muted-foreground flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        {format(new Date(task.dueDate), "MMM d, yyyy")}
                      </span>
                    )}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleToggleImportance(task.id, task.important || false)}
                >
                  <Star
                    className={cn(
                      "h-4 w-4",
                      task.important ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                    )}
                  />
                  <span className="sr-only">Toggle importance</span>
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditTask(task)}>
                  <Edit className="h-4 w-4" />
                  <span className="sr-only">Edit task</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">More options</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleRemoveTask(task.id)}>
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <Card className={cn("h-full task-card", task.completed && "bg-muted", getPriorityClass(task.priority))}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 pt-1 flex-1">
                      <Checkbox
                        checked={task.completed}
                        onCheckedChange={() => handleToggleCompletion(task.id, task.completed)}
                        className={cn(task.completed && "bg-primary border-primary text-primary-foreground")}
                      />
                      <div className="flex flex-col flex-1">
                        {editingTaskId === task.id ? (
                          <Input
                            value={editedTaskTitle}
                            onChange={(e) => setEditedTaskTitle(e.target.value)}
                            onBlur={() => handleSaveEdit(task)}
                            onKeyDown={(e) => e.key === "Enter" && handleSaveEdit(task)}
                            className="flex-1"
                            autoFocus
                          />
                        ) : (
                          <>
                            <span className={cn("font-medium", task.completed && "line-through text-muted-foreground")}>
                              {task.title}
                            </span>
                            {task.dueDate && (
                              <span className="text-xs text-muted-foreground flex items-center mt-1">
                                <Calendar className="h-3 w-3 mr-1" />
                                {format(new Date(task.dueDate), "MMM d, yyyy")}
                              </span>
                            )}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => handleToggleImportance(task.id, task.important || false)}
                      >
                        <Star
                          className={cn(
                            "h-4 w-4",
                            task.important ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground",
                          )}
                        />
                        <span className="sr-only">Toggle importance</span>
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEditTask(task)}>
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit task</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">More options</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleRemoveTask(task.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            <span>Delete</span>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
}

function ChecklistIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 6h13" />
      <path d="M8 12h13" />
      <path d="M8 18h13" />
      <path d="M3 6l1 1" />
      <path d="M3 12l1 1" />
      <path d="M3 18l1 1" />
    </svg>
  )
}

