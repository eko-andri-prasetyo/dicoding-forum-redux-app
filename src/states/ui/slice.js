import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  loadingCount: 0,
  lastError: null
}

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    startLoading: (state) => {
      state.loadingCount += 1
    },
    stopLoading: (state) => {
      state.loadingCount = Math.max(0, state.loadingCount - 1)
    },
    setError: (state, action) => {
      state.lastError = action.payload
    },
    clearError: (state) => {
      state.lastError = null
    }
  }
})

export const uiActions = uiSlice.actions
export default uiSlice.reducer
