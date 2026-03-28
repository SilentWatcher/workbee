import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunks
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    return [
      {
        id: 1,
        title: 'Complete UI Redesign',
        description: 'Update the workspace UI to be more elegant and modern.',
        projectId: 1,
        status: 'in-progress',
        priority: 'high',
        dueDate: '2026-04-01',
        subtasks: [
          { id: 101, title: 'Define color palette', completed: true },
          { id: 102, title: 'Create new card components', completed: false },
          { id: 103, title: 'Implement drilldown logic', completed: false }
        ]
      },
      {
        id: 2,
        title: 'API Integration',
        description: 'Connect the frontend with the backend services.',
        projectId: 1,
        status: 'pending',
        priority: 'medium',
        dueDate: '2026-04-05',
        subtasks: []
      },
      {
        id: 3,
        title: 'Design Guidelines',
        description: 'Create a set of design principles for the team.',
        projectId: 2,
        status: 'completed',
        priority: 'low',
        dueDate: '2026-03-20',
        subtasks: [
          { id: 301, title: 'Typography rules', completed: true },
          { id: 302, title: 'Spacing system', completed: true }
        ]
      }
    ]
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData) => {
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      id: Date.now(),
      ...taskData,
      status: 'pending',
      subtasks: [],
      createdAt: new Date().toISOString()
    }
  }
)

export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async (taskData) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return taskData
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return taskId
  }
)

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    status: 'idle',
    error: null,
    selectedTaskId: null
  },
  reducers: {
    setSelectedTaskId: (state, action) => {
      state.selectedTaskId = action.payload
    },
    toggleSubtask: (state, action) => {
      const { taskId, subtaskId } = action.payload
      const task = state.tasks.find(t => t.id === taskId)
      if (task) {
        const subtask = task.subtasks.find(st => st.id === subtaskId)
        if (subtask) {
          subtask.completed = !subtask.completed
        }
      }
    },
    addSubtask: (state, action) => {
      const { taskId, title } = action.payload
      const task = state.tasks.find(t => t.id === taskId)
      if (task) {
        task.subtasks.push({
          id: Date.now(),
          title,
          completed: false
        })
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload)
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id)
        if (index !== -1) {
          state.tasks[index] = { ...state.tasks[index], ...action.payload }
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t.id !== action.payload)
      })
  },
})

export const { setSelectedTaskId, toggleSubtask, addSubtask } = tasksSlice.actions
export default tasksSlice.reducer
