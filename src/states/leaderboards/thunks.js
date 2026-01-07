import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api.js'
import { uiActions } from '../ui/slice.js'

export const fetchLeaderboards = createAsyncThunk(
  'leaderboards/fetchLeaderboards',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(uiActions.startLoading())
    dispatch(uiActions.clearError())
    try {
      const res = await api.getLeaderboards()
      const items = res?.data?.leaderboards || res?.leaderboards || []
      return items
    } catch (e) {
      dispatch(uiActions.setError(e.message))
      return rejectWithValue(e.message)
    } finally {
      dispatch(uiActions.stopLoading())
    }
  }
)
