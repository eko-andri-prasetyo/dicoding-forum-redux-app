import { createSlice } from '@reduxjs/toolkit'
import { addComment, fetchThreadDetail, voteComment, voteThreadFromDetail } from './thunks.js'

const initialState = {
  item: null,
  status: 'idle'
}

function updateVoteArrays ({ upVotesBy = [], downVotesBy = [], userId, voteType }) {
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

const threadDetailSlice = createSlice({
  name: 'threadDetail',
  initialState,
  reducers: {
    clearThreadDetail: (state) => {
      state.item = null
      state.status = 'idle'
    },
    applyOptimisticThreadVote: (state, action) => {
      if (!state.item) return
      const { userId, voteType } = action.payload
      const prev = { upVotesBy: state.item.upVotesBy || [], downVotesBy: state.item.downVotesBy || [] }
      const updated = updateVoteArrays({ ...prev, userId, voteType })
      state.item.upVotesBy = updated.upVotesBy
      state.item.downVotesBy = updated.downVotesBy
    },
    rollbackOptimisticThreadVote: (state, action) => {
      if (!state.item) return
      const { previous } = action.payload
      state.item.upVotesBy = previous.upVotesBy
      state.item.downVotesBy = previous.downVotesBy
    },
    applyOptimisticCommentVote: (state, action) => {
      if (!state.item) return
      const { commentId, userId, voteType } = action.payload
      const c = state.item.comments?.find((it) => it.id === commentId)
      if (!c) return
      const prev = { upVotesBy: c.upVotesBy || [], downVotesBy: c.downVotesBy || [] }
      const updated = updateVoteArrays({ ...prev, userId, voteType })
      c.upVotesBy = updated.upVotesBy
      c.downVotesBy = updated.downVotesBy
    },
    rollbackOptimisticCommentVote: (state, action) => {
      if (!state.item) return
      const { commentId, previous } = action.payload
      const c = state.item.comments?.find((it) => it.id === commentId)
      if (!c) return
      c.upVotesBy = previous.upVotesBy
      c.downVotesBy = previous.downVotesBy
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchThreadDetail.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchThreadDetail.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.item = action.payload
      })
      .addCase(fetchThreadDetail.rejected, (state) => {
        state.status = 'failed'
      })
      .addCase(addComment.fulfilled, (state, action) => {
        if (!state.item) return
        const comment = action.payload
        if (comment) {
          state.item.comments = [comment, ...(state.item.comments || [])]
        }
      })
      .addCase(voteThreadFromDetail.fulfilled, () => {})
      .addCase(voteComment.fulfilled, () => {})
  }
})

export const threadDetailActions = threadDetailSlice.actions
export default threadDetailSlice.reducer
