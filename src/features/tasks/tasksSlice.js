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
        title: 'Update Design System documentation',
        project: 'Precision Design System',
        dueDate: 'Due tomorrow',
        priority: 'medium',
        status: 'in-progress',
        assignees: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDdp6LFPgIwefieI6OW3USyzEHwyJYZ1zrI5ff8xbqidBum64p8olX8bkHkCy2HsilLrwAo2h_cs0c6BniZ8k1x1glBdgS-Vysehy-cc05m3bZudCFj95FqCbYh283uM3IEyC0QkWD4XRwtXaBbnFkM8VqZyqoU6KsFr5kd-RcBN12vOucMsAdpFJbdVwM1_fVSuIcSUPDJXWvrpUI5G-RShKXV99ytBabv04XEDGJqVZG5F1B8IQpdmg6SlUoOjCFlLzH4mkVV9Q',
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDqYm5hAndIr8iHfDBRWHi2Feyetf8wfUb_m-6GvfNs6eZiveeLnofbyXUqoMgG8Lyrx-R-hlMBBr3UNHXvcAd2Ex2oB2t431OVhzGJFNXTV4R7n34PW_-MS94lL44MTkWs5Mke_34x2pRI06F2vK5HvJG51jttCUnH4MRkRnTyVQnytQUPHM6Gif_ztoUVv7T-J1QLm1VjOu7uy8O4iQFE1pmzB-ZsP16UKCNxgFCDb7YSpKtLRPA2bBAUZO_o2huONbgoKA3Izw'
        ]
      },
      {
        id: 2,
        title: 'Review Q4 Product Roadmap with Stakeholders',
        project: 'Product Launch',
        dueDate: 'Oct 24',
        priority: 'high',
        status: 'pending',
        assignees: [
          'https://lh3.googleusercontent.com/aida-public/AB6AXuDj4ci6LhgVt80TWOJHD111SWaLOGZEkE0CMOKOHLvhsf1KjkG7H-6wJs_L_qN1xf4t2QVJO8Pi7dtEH0E5kQG2tOMcaRqGO6FJQue23nP6StBX2BB1Qpp01xlljlz0UOimk-fGAY0u4RZ4V2fosFiXZxznIJ2Tue4htthNKhc8LtV6kSYy0TMHxeQ4H-935PZ5Q53VruQ2X21ZIb5atZlbDMfsH8XL2PlloLGQ8e8kSBdwt2xZOWgNdxfczAb6pq9dhI9Ya1LgOg'
        ]
      },
      {
        id: 3,
        title: 'Draft final audit report for finance team',
        project: 'Internal Audit',
        dueDate: 'Oct 28',
        priority: 'medium',
        status: 'pending',
        assignees: []
      }
    ]
  }
)

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      id: Date.now(),
      ...taskData,
      status: 'pending',
      createdAt: new Date().toISOString()
    }
  }
)

export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async ({ taskId, status }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    return { taskId, status }
  }
)

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId) => {
    // Simulate API call
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
    filters: {
      status: 'all', // all, pending, in-progress, completed
      priority: 'all', // all, high, medium, low
      project: 'all'
    }
  },
  reducers: {
    setTaskFilter: (state, action) => {
      const { filterType, value } = action.payload
      state.filters[filterType] = value
    },
    clearTaskFilters: (state) => {
      state.filters = {
        status: 'all',
        priority: 'all',
        project: 'all'
      }
    },
    toggleTaskComplete: (state, action) => {
      const task = state.tasks.find(t => t.id === action.payload)
      if (task) {
        task.status = task.status === 'completed' ? 'in-progress' : 'completed'
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
      .addCase(updateTaskStatus.fulfilled, (state, action) => {
        const { taskId, status } = action.payload
        const task = state.tasks.find(t => t.id === taskId)
        if (task) {
          task.status = status
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const taskId = action.payload
        state.tasks = state.tasks.filter(t => t.id !== taskId)
      })
  },
})

export const { setTaskFilter, clearTaskFilters, toggleTaskComplete } = tasksSlice.actions

// Selectors
export const selectFilteredTasks = (state) => {
  const { tasks, filters } = state.tasks
  return tasks.filter(task => {
    if (filters.status !== 'all' && task.status !== filters.status) {
      return false
    }
    if (filters.priority !== 'all' && task.priority !== filters.priority) {
      return false
    }
    if (filters.project !== 'all' && task.project !== filters.project) {
      return false
    }
    return true
  })
}

export const selectTaskStats = (state) => {
  const tasks = state.tasks.tasks
  return {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'pending').length,
    inProgress: tasks.filter(t => t.status === 'in-progress').length,
    completed: tasks.filter(t => t.status === 'completed').length,
    highPriority: tasks.filter(t => t.priority === 'high').length
  }
}

export default tasksSlice.reducer
