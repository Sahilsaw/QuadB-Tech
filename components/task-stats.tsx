"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface TaskStatsProps {
  pendingCount: number
  completedCount: number
}

export function TaskStats({ pendingCount, completedCount }: TaskStatsProps) {
  const totalTasks = pendingCount + completedCount
  const completionPercentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium">Task Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{pendingCount} pending</span>
          </div>
          <div className="flex items-center">
            <CheckCircle className="mr-2 h-4 w-4 text-primary" />
            <span className="text-sm font-medium">{completedCount} completed</span>
          </div>
        </div>
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  )
}

