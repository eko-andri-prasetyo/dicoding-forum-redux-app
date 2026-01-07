import { createAsyncThunk } from '@reduxjs/toolkit'
import { restoreSession } from '../auth/thunks.js'
import { fetchUsers } from '../users/thunks.js'
import { fetchThreads } from '../threads/thunks.js'

// Init app: restore session then preload users+threads for home list
export const initApp = createAsyncThunk(
  'app/init',
  async (_, { dispatch }) => {
    await dispatch(restoreSession())
    // Preload users & threads (parallel-ish)
    dispatch(fetchUsers())
    dispatch(fetchThreads())
    return true
  }
)
