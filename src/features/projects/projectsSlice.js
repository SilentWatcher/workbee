import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return [
      {
        id: 1,
        name: 'Product Launch',
        description: '12 Projects • 48 Tasks',
        icon: 'rocket_launch',
        color: 'indigo',
        status: 'active'
      },
      {
        id: 2,
        name: 'Design System',
        description: '4 Projects • 126 Tasks',
        icon: 'design_services',
        color: 'emerald',
        status: 'active'
      },
      {
        id: 3,
        name: 'Marketing Q3',
        description: '8 Projects • 32 Tasks',
        icon: 'campaign',
        color: 'amber',
        status: 'active'
      },
      {
        id: 4,
        name: 'Internal Audit',
        description: '2 Projects • 15 Tasks',
        icon: 'analytics',
        color: 'purple',
        status: 'active'
      }
    ]
  }
)

export const createProject = createAsyncThunk(
  'projects/createProject',
  async (projectData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      id: Date.now(),
      ...projectData,
      status: 'active'
    }
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
    selectedProject: null
  },
  reducers: {
    setSelectedProject: (state, action) => {
      state.selectedProject = action.payload
    },
    clearSelectedProject: (state) => {
      state.selectedProject = null
    },
    updateProjectStatus: (state, action) => {
      const { projectId, status } = action.payload
      const project = state.projects.find(p => p.id === projectId)
      if (project) {
        project.status = status
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.projects = action.payload
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createProject.fulfilled, (state, action) => {
        state.projects.push(action.payload)
      })
  },
})

export const { setSelectedProject, clearSelectedProject, updateProjectStatus } = projectsSlice.actions
export default projectsSlice.reducer
