import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// Async thunk for example API call
export const fetchCounterValue = createAsyncThunk(
  'counter/fetchValue',
  async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    return Math.floor(Math.random() * 100)
  }
)

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0,
    status: 'idle',
    error: null,
  },
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounterValue.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchCounterValue.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = action.payload
      })
      .addCase(fetchCounterValue.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const { increment, decrement, incrementByAmount } = counterSlice.actions
export default counterSlice.reducer
