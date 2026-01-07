import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../states/auth/slice.js'
import usersReducer from '../states/users/slice.js'
import threadsReducer from '../states/threads/slice.js'
import threadDetailReducer from '../states/threadDetail/slice.js'
import leaderboardsReducer from '../states/leaderboards/slice.js'
import uiReducer from '../states/ui/slice.js'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    ui: uiReducer
  }
})
