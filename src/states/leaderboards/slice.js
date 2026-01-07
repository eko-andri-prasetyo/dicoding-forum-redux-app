import { createSlice } from '@reduxjs/toolkit'
import { fetchLeaderboards } from './thunks.js'

const initialState = {
  items: [],
  status: 'idle'
}

const leaderboardsSlice = createSlice({
  name: 'leaderboards',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboards.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchLeaderboards.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchLeaderboards.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export default leaderboardsSlice.reducer
