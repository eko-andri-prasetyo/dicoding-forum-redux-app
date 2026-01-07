import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api.js'
import { uiActions } from '../ui/slice.js'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(uiActions.startLoading())
    dispatch(uiActions.clearError())
    try {
      const res = await api.getAllUsers()
      // Expected: data.users
      const users = res?.data?.users || res?.users || []
      return users
    } catch (e) {
      dispatch(uiActions.setError(e.message))
      return rejectWithValue(e.message)
    } finally {
      dispatch(uiActions.stopLoading())
    }
  }
)
