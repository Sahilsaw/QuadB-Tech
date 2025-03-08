import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { RootState } from "@/lib/store"

interface List {
  id: string
  name: string
}

interface ListsState {
  lists: List[]
}

// Initialize with some default lists
const initialState: ListsState = {
  lists: [
    { id: "personal", name: "Personal" },
    { id: "work", name: "Work" },
    { id: "shopping", name: "Shopping" },
  ],
}

const listsSlice = createSlice({
  name: "lists",
  initialState,
  reducers: {
    addList: (state, action: PayloadAction<List>) => {
      state.lists.push(action.payload)
      // Save to localStorage
      localStorage.setItem("taskflow_lists", JSON.stringify(state.lists))
    },
    removeList: (state, action: PayloadAction<string>) => {
      state.lists = state.lists.filter((list) => list.id !== action.payload)
      localStorage.setItem("taskflow_lists", JSON.stringify(state.lists))
    },
  },
})

export const { addList, removeList } = listsSlice.actions

// Fix the selector to access the correct part of the state
export const selectAllLists = (state: RootState) => state.lists.lists

export default listsSlice.reducer

