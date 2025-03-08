export interface Task {
  id: string
  title: string
  completed: boolean
  priority: "low" | "medium" | "high"
  important?: boolean
  dueDate?: string
  createdAt: string
  notes?: string
  steps?: { id: string; title: string; completed: boolean }[]
}

