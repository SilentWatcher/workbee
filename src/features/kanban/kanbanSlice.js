import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunks
export const fetchKanbanData = createAsyncThunk(
  'kanban/fetchKanbanData',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return {
      columns: [
        {
          id: 'todo',
          title: 'To Do',
          taskIds: [1, 2]
        },
        {
          id: 'in-progress',
          title: 'In Progress',
          taskIds: [3]
        },
        {
          id: 'testing',
          title: 'Testing',
          taskIds: [4]
        },
        {
          id: 'done',
          title: 'Done',
          taskIds: [5]
        }
      ],
      tasks: [
        {
          id: 1,
          title: 'Implement secure authentication for mobile endpoints',
          priority: 'high',
          dueDate: 'Oct 18',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCCHbzk_bDm5OTrVrq5QF9ABHQFf64rYoA08Y2-JvEQXYKGqBCjEmMWIAxTEBBKP16al57QmlzQ6MS9eFZVALpBysOiEJE1tM776343bipbwzWe7GPctj3u6czGr15S6AHqUuyVnv3bm7U-H-R_OMju9iUhfB5Xt33wI1Fs7Sbd57ydL5JJpQsEmkmoiFEFQBYS3z8MRn8Qs4CetL2E-TZ_Akhq7tsPtL-07BmvcoHnCW72nfXTHWDawG1lmTk8tWOtNV1xK7iqHw',
          columnId: 'todo'
        },
        {
          id: 2,
          title: 'Design system audit for accessibility compliance',
          priority: 'medium',
          dueDate: 'Oct 20',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBeAEN_TQFKOqDl13wnSfVwUvDUNkA1_YjbLZj2ym80-lN0t2Ks5DGqAez8ZrdW12qhurkzbfEq7sIAedV9GnKKrn5dXLCIdebLtv4VCXn08m9SWR96kZnqlE8mhsT0nyM8L0ab1jM9vt_okijAZWQszq5TuT-HBjr3ICFVbhhebi52UWz1V9JzmHzUxPNtMbHFJ6swIG3jEkQlezZTusp14M7Z_FAjN4lGp3Gag0Un6ppaw2vvhDoWx_PIRzWwH5g0zBMxgepC9g',
          columnId: 'todo'
        },
        {
          id: 3,
          title: 'API Infrastructure refactoring for high-volume transactions',
          priority: 'high',
          status: 'In Dev',
          statusIcon: 'Timer',
          statusColor: 'primary',
          assignees: [
            'https://lh3.googleusercontent.com/aida-public/AB6AXuBLGDSF8K37Km-063t_LNWEILNgd5Hy15vQEKV_5Kjp95or9uNLN0XBgbM5fW53F8K5s06-ZGJaSzxafWX2DpzoKFXqRU5CD2zu4pgXEK9sjkV7f1t2eqwd7YHCDWC2oBIEF2J29nVGdEjlxBUJB7ohKziXvlPMs9PCLsrAmFKLKBoLTNxt7BpVNk7OPffogFv42PD4x8hwrAs_rZchvNKnrYZn51jYJmXmR2eVARquItkp8JnIFFe2zbW23yO44Dg2IdpcgJ0CDQ',
            'https://lh3.googleusercontent.com/aida-public/AB6AXuAjnQrt9HvQlh6XCoGkTvUeF8cziv2VA1aChweuA-1I8GDuBA1WobSmK4Z_yKa2vEi5hwNeoxoRu1awVReOHCr4FiWkBwm1q74t8hn_kLG0UUQCNLTrfjlu7c-qxl6LgD0Pews4i1AOIWPZz0M8j-RrWL-mIyAgV-3RBy0A_3g43Cial3aka32BoMlNi32l8YW4BiedEHVIz94oHbMN2C8f40BXdZ1JinRbLkQpRHWP4iJ13m66J96LbDM6d-IKJhp_1UBFZB-7Dg'
          ],
          hasTrendingIcon: true,
          columnId: 'in-progress'
        },
        {
          id: 4,
          title: 'Dark mode color palette refinement for data viz',
          priority: 'low',
          status: 'QA Review',
          statusIcon: 'BugReport',
          statusColor: 'tertiary',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA8swrihisi5lo-PUSDf6kvc_N4yp_R_rwAKIlKi7qm8Xv9tLmRVCkdAuo6Uey0SKRHNU8CvBzHHQPZKBcpsK0wZTHivWvSTZJaMCy0BnDVGsEHyDnEITKU6_nw1uk5Ne7AMP8_YRcImXGLRpVTUNGaheydNvZej6j9MX4E83VE06LZ9nARNYf8xa9ijR6c_FELno9mwt0Fc_0Mwx5WMa9pDU1b_o_F8DDveI0yo5GPtGfWjKTD7n1A1D2OYTjM1Rch2x_dhbpjiw',
          columnId: 'testing'
        },
        {
          id: 5,
          title: 'Draft v1 of technical requirements doc',
          priority: 'medium',
          completed: true,
          completedDate: 'Oct 10',
          assignee: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcQzqRaiUprlXP6fA3pnJuMhxOf0NClwO-BEY3VdnRfDNKTL1Pczz2CuWJ1JQhSyhdGZLtK509M2GRti8LAupKC3tSDGs9hYpVJBHxozJbIsVhFTA-EmFc2WowVOmUf59MQzmrCsunSpKgfMT8jGm1sHDm6tXIipHPPt-nWbIDEpBfkSkJKYnF-GF7ORyXf-QekMtf-0nyaeyPV_f9pBUTRMZpe2tY7zwEjm61-dJi8U3-AftOEny3gqZI1uo1cZGLtuPZXXzOag',
          isCompleted: true,
          columnId: 'done'
        }
      ]
    }
  }
)

export const moveTask = createAsyncThunk(
  'kanban/moveTask',
  async ({ taskId, fromColumnId, toColumnId, position }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 300))
    return { taskId, fromColumnId, toColumnId, position }
  }
)

export const createTask = createAsyncThunk(
  'kanban/createTask',
  async ({ columnId, taskData }) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    return {
      id: Date.now(),
      ...taskData,
      columnId,
      createdAt: new Date().toISOString()
    }
  }
)

export const createColumn = createAsyncThunk(
  'kanban/createColumn',
  async (columnData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 400))
    return {
      id: `column-${Date.now()}`,
      ...columnData,
      taskIds: []
    }
  }
)

const kanbanSlice = createSlice({
  name: 'kanban',
  initialState: {
    columns: [],
    tasks: {},
    status: 'idle',
    error: null,
    draggedTask: null
  },
  reducers: {
    setDraggedTask: (state, action) => {
      state.draggedTask = action.payload
    },
    clearDraggedTask: (state) => {
      state.draggedTask = null
    },
    reorderTasks: (state, action) => {
      const { columnId, taskIds } = action.payload
      const column = state.columns.find(c => c.id === columnId)
      if (column) {
        column.taskIds = taskIds
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchKanbanData.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchKanbanData.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.columns = action.payload.columns
        state.tasks = action.payload.tasks.reduce((acc, task) => {
          acc[task.id] = task
          return acc
        }, {})
      })
      .addCase(fetchKanbanData.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(moveTask.fulfilled, (state, action) => {
        const { taskId, fromColumnId, toColumnId, position } = action.payload
        
        // Remove from source column
        const fromColumn = state.columns.find(c => c.id === fromColumnId)
        if (fromColumn) {
          fromColumn.taskIds = fromColumn.taskIds.filter(id => id !== taskId)
        }
        
        // Add to target column
        const toColumn = state.columns.find(c => c.id === toColumnId)
        if (toColumn) {
          toColumn.taskIds.splice(position, 0, taskId)
        }
        
        // Update task column
        if (state.tasks[taskId]) {
          state.tasks[taskId].columnId = toColumnId
        }
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const task = action.payload
        state.tasks[task.id] = task
        
        const column = state.columns.find(c => c.id === task.columnId)
        if (column) {
          column.taskIds.push(task.id)
        }
      })
      .addCase(createColumn.fulfilled, (state, action) => {
        state.columns.push(action.payload)
      })
  },
})

export const { setDraggedTask, clearDraggedTask, reorderTasks } = kanbanSlice.actions

// Selectors
export const selectKanbanColumns = (state) => {
  const { columns, tasks } = state.kanban
  return columns.map(column => ({
    ...column,
    tasks: column.taskIds.map(taskId => tasks[taskId]).filter(Boolean)
  }))
}

export const selectKanbanTask = (state, taskId) => {
  return state.kanban.tasks[taskId]
}

export const selectKanbanStatus = (state) => state.kanban.status

export default kanbanSlice.reducer
