import { createSlice } from '@reduxjs/toolkit'
import { fetchUsers } from './thunks.js'

const initialState = {
  items: [],
  status: 'idle' // idle | loading | succeeded | failed
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = 'failed'
      })
  }
})

export default usersSlice.reducer
