import { configureStore } from "@reduxjs/toolkit"
import tasksReducer from "./features/tasks/tasksSlice"
import listsReducer from "./features/lists/listsSlice"

export const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    lists: listsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

