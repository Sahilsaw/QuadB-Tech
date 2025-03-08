import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"
import type { Task } from "@/lib/types"

interface TasksState {
  tasks: Task[]
  status: "idle" | "loading" | "succeeded" | "failed"
  error: string | null
}

const initialState: TasksState = {
  tasks: [],
  status: "idle",
  error: null,
}

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Check if tasks exist in localStorage
  const storedTasks = localStorage.getItem("taskflow_tasks")
  if (storedTasks) {
    return JSON.parse(storedTasks) as Task[]
  }

  // Return mock data if no stored tasks
  const mockTasks: Task[] = [
    {
      id: "1",
      title: "Buy groceries",
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Finish project report",
      completed: false,
      priority: "high",
      important: true,
      dueDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
      createdAt: new Date().toISOString(),
    },
    {
      id: "3",
      title: "Call the bank",
      completed: false,
      priority: "low",
      createdAt: new Date().toISOString(),
    },
    {
      id: "4",
      title: "Schedule dentist appointment",
      completed: false,
      priority: "medium",
      createdAt: new Date().toISOString(),
    },
    {
      id: "5",
      title: "Plan weekend trip",
      completed: false,
      priority: "low",
      createdAt: new Date().toISOString(),
    },
    {
      id: "6",
      title: "Read a book",
      completed: true,
      priority: "low",
      createdAt: new Date().toISOString(),
    },
    {
      id: "7",
      title: "Clean the house",
      completed: true,
      priority: "medium",
      createdAt: new Date().toISOString(),
    },
    {
      id: "8",
      title: "Prepare presentation",
      completed: true,
      priority: "high",
      createdAt: new Date().toISOString(),
    },
    {
      id: "9",
      title: "Update blog",
      completed: true,
      priority: "medium",
      createdAt: new Date().toISOString(),
    },
  ]

  // Store mock tasks in localStorage
  localStorage.setItem("taskflow_tasks", JSON.stringify(mockTasks))

  return mockTasks
})

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
      localStorage.setItem("taskflow_tasks", JSON.stringify(state.tasks))
    },
    removeTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
      localStorage.setItem("taskflow_tasks", JSON.stringify(state.tasks))
    },
    toggleTaskCompletion: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload)
      if (task) {
        task.completed = !task.completed
        localStorage.setItem("taskflow_tasks", JSON.stringify(state.tasks))
      }
    },
    toggleTaskImportance: (state, action: PayloadAction<string>) => {
      const task = state.tasks.find((task) => task.id === action.payload)
      if (task) {
        task.important = !task.important
        localStorage.setItem("taskflow_tasks", JSON.stringify(state.tasks))
      }
    },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex((task) => task.id === action.payload.id)
      if (index !== -1) {
        state.tasks[index] = action.payload
        localStorage.setItem("taskflow_tasks", JSON.stringify(state.tasks))
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading"
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed"
        state.error = action.error.message || "Failed to fetch tasks"
      })
  },
})

export const { addTask, removeTask, toggleTaskCompletion, toggleTaskImportance, updateTask } = tasksSlice.actions

export const selectAllTasks = (state: RootState) => state.tasks.tasks
export const selectTasksByStatus = (state: RootState, completed: boolean) =>
  state.tasks.tasks.filter((task) => task.completed === completed)
export const selectImportantTasks = (state: RootState) => state.tasks.tasks.filter((task) => task.important)
export const selectTasksDueToday = (state: RootState) => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return state.tasks.tasks.filter((task) => {
    if (task.dueDate) {
      const dueDate = new Date(task.dueDate)
      dueDate.setHours(0, 0, 0, 0)
      return dueDate.getTime() === today.getTime()
    }
    return false
  })
}
export const selectTasksWithDueDate = (state: RootState) => state.tasks.tasks.filter((task) => task.dueDate)
export const selectAssignedTasks = (state: RootState) => state.tasks.tasks.filter((task) => task.assignedTo)

export default tasksSlice.reducer

