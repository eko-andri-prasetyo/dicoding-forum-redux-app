import { createSlice } from '@reduxjs/toolkit'
import { createThread, fetchThreads, voteThread } from './thunks.js'

const initialState = {
  items: [],
  status: 'idle',
  filterCategory: 'ALL'
}

function updateVoteArrays ({ upVotesBy = [], downVotesBy = [], userId, voteType }) {
  // voteType: 'up' | 'down' | 'neutral'
  const up = new Set(upVotesBy)
  const down = new Set(downVotesBy)

  if (voteType === 'up') {
    up.add(userId)
    down.delete(userId)
  } else if (voteType === 'down') {
    down.add(userId)
    up.delete(userId)
  } else {
    up.delete(userId)
    down.delete(userId)
  }

  return { upVotesBy: Array.from(up), downVotesBy: Array.from(down) }
}

const threadsSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    setFilterCategory: (state, action) => {
      state.filterCategory = action.payload
    },
    applyOptimisticVote: (state, action) => {
      const { threadId, userId, voteType } = action.payload
      const t = state.items.find((it) => it.id === threadId)
      if (!t) return
      const updated = updateVoteArrays({ upVotesBy: t.upVotesBy, downVotesBy: t.downVotesBy, userId, voteType })
      t.upVotesBy = updated.upVotesBy
      t.downVotesBy = updated.downVotesBy
    },
    rollbackOptimisticVote: (state, action) => {
      const { threadId, previous } = action.payload
      const t = state.items.find((it) => it.id === threadId)
      if (!t) return
      t.upVotesBy = previous.upVotesBy
      t.downVotesBy = previous.downVotesBy
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreads.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchThreads.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchThreads.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(createThread.fulfilled, (state, action) => {
        // Prepend newly created thread stub if returned
        const thread = action.payload
        if (thread) state.items.unshift(thread)
      })
      .addCase(voteThread.fulfilled, () => {})
  }
})

export const threadsActions = threadsSlice.actions
export default threadsSlice.reducer
