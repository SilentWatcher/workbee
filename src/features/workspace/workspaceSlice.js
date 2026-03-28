import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunks
export const fetchWorkspaces = createAsyncThunk(
  'workspaces/fetchWorkspaces',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return [
      {
        id: 1,
        name: 'Product Development',
        description: 'Core product team workspace',
        icon: 'rocket_launch',
        color: 'indigo',
        status: 'active',
        projectIds: [1, 2]
      },
      {
        id: 2,
        name: 'Marketing & Sales',
        description: 'Workspace for marketing campaigns',
        icon: 'campaign',
        color: 'emerald',
        status: 'active',
        projectIds: [3]
      }
    ]
  }
)

export const createWorkspace = createAsyncThunk(
  'workspaces/createWorkspace',
  async (workspaceData) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return {
      id: Date.now(),
      ...workspaceData,
      status: 'active',
      projectIds: []
    }
  }
)

export const deleteWorkspace = createAsyncThunk(
  'workspaces/deleteWorkspace',
  async (workspaceId) => {
    await new Promise(resolve => setTimeout(resolve, 300))
    return workspaceId
  }
)

const workspaceSlice = createSlice({
  name: 'workspaces',
  initialState: {
    workspaces: [],
    status: 'idle',
    error: null,
    selectedWorkspaceId: null
  },
  reducers: {
    setSelectedWorkspaceId: (state, action) => {
      state.selectedWorkspaceId = action.payload
    },
    clearSelectedWorkspace: (state) => {
      state.selectedWorkspaceId = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkspaces.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchWorkspaces.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.workspaces = action.payload
      })
      .addCase(fetchWorkspaces.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createWorkspace.fulfilled, (state, action) => {
        state.workspaces.push(action.payload)
      })
      .addCase(deleteWorkspace.fulfilled, (state, action) => {
        state.workspaces = state.workspaces.filter(w => w.id !== action.payload)
      })
  },
})

export const { setSelectedWorkspaceId, clearSelectedWorkspace } = workspaceSlice.actions
export default workspaceSlice.reducer
