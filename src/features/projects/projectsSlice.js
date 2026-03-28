import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunks
export const fetchProjects = createAsyncThunk(
  'projects/fetchProjects',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800))
    return [
      {
        id: 1,
        name: 'Product Launch',
        description: 'Launching the new v2.0 flagship product',
        icon: 'rocket_launch',
        color: 'indigo',
        status: 'active',
        workspaceId: 1,
        taskIds: [1, 2]
      },
      {
        id: 2,
        name: 'Design System',
        description: 'Building a unified design language',
        icon: 'design_services',
        color: 'emerald',
        status: 'active',
        workspaceId: 1,
        taskIds: [3]
      },
      {
        id: 3,
        name: 'Marketing Campaign',
        description: 'Social media and content strategy',
        icon: 'campaign',
        color: 'amber',
        status: 'active',
        workspaceId: 2,
        taskIds: []
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
      status: 'active',
      taskIds: []
    }
  }
)

export const deleteProject = createAsyncThunk(
  'projects/deleteProject',
  async (projectId) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return projectId
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',
    error: null,
    selectedProjectId: null
  },
  reducers: {
    setSelectedProjectId: (state, action) => {
      state.selectedProjectId = action.payload
    },
    clearSelectedProject: (state) => {
      state.selectedProjectId = null
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
      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projects = state.projects.filter(p => p.id !== action.payload)
      })
  },
})

export const { setSelectedProjectId, clearSelectedProject, updateProjectStatus } = projectsSlice.actions
export default projectsSlice.reducer
