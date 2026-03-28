import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import workspaceReducer from '../features/workspace/workspaceSlice'
import projectsReducer from '../features/projects/projectsSlice'
import tasksReducer from '../features/tasks/tasksSlice'
import kanbanReducer from '../features/kanban/kanbanSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    workspaces: workspaceReducer,
    projects: projectsReducer,
    tasks: tasksReducer,
    kanban: kanbanReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})
