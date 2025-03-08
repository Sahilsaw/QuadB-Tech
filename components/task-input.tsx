"use client"

import type React from "react"

import { useState } from "react"
import { useDispatch } from "react-redux"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Bell, Calendar, Plus } from "lucide-react"
import { addTask } from "@/lib/features/tasks/tasksSlice"
import type { AppDispatch } from "@/lib/store"
import { motion } from "framer-motion"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"

export function TaskInput() {
  const [taskText, setTaskText] = useState("")
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined)
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium")
  const [isExpanded, setIsExpanded] = useState(false)
  const dispatch = useDispatch<AppDispatch>()
  const { toast } = useToast()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!taskText.trim()) return

    dispatch(
      addTask({
        id: Date.now().toString(),
        title: taskText,
        completed: false,
        priority,
        dueDate: dueDate ? dueDate.toISOString() : undefined,
        createdAt: new Date().toISOString(),
      }),
    )

    toast({
      title: "Task added",
      description: "Your task has been added successfully.",
    })

    setTaskText("")
    setDueDate(undefined)
    setPriority("medium")
    setIsExpanded(false)
  }

  return (
    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Add a task..."
            value={taskText}
            onChange={(e) => {
              setTaskText(e.target.value)
              if (e.target.value && !isExpanded) {
                setIsExpanded(true)
              }
            }}
            className="flex-1"
            onFocus={() => setIsExpanded(true)}
          />
          <Button type="submit" size="icon">
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add task</span>
          </Button>
        </div>

        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Priority:</span>
              <div className="flex space-x-1">
                <Button
                  type="button"
                  size="sm"
                  variant={priority === "low" ? "default" : "outline"}
                  className={cn("h-8 px-2", priority === "low" && "bg-blue-500 hover:bg-blue-600")}
                  onClick={() => setPriority("low")}
                >
                  Low
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={priority === "medium" ? "default" : "outline"}
                  className={cn("h-8 px-2", priority === "medium" && "bg-yellow-500 hover:bg-yellow-600")}
                  onClick={() => setPriority("medium")}
                >
                  Medium
                </Button>
                <Button
                  type="button"
                  size="sm"
                  variant={priority === "high" ? "default" : "outline"}
                  className={cn("h-8 px-2", priority === "high" && "bg-red-500 hover:bg-red-600")}
                  onClick={() => setPriority("high")}
                >
                  High
                </Button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className={cn("h-8 justify-start text-left font-normal", !dueDate && "text-muted-foreground")}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {dueDate ? format(dueDate, "PPP") : "Set due date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                </PopoverContent>
              </Popover>
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => {
                toast({
                  title: "Reminder set",
                  description: "You'll be reminded about this task.",
                })
              }}
            >
              <Bell className="mr-2 h-4 w-4" />
              Set reminder
            </Button>
          </motion.div>
        )}
      </form>
    </motion.div>
  )
}

