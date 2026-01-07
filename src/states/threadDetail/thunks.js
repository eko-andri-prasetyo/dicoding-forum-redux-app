import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api.js'
import { uiActions } from '../ui/slice.js'
import { threadDetailActions } from './slice.js'

export const fetchThreadDetail = createAsyncThunk(
  'threadDetail/fetchThreadDetail',
  async (threadId, { dispatch, rejectWithValue }) => {
    dispatch(uiActions.startLoading())
    dispatch(uiActions.clearError())
    try {
      const res = await api.getThreadDetail(threadId)
      const thread = res?.data?.detailThread || res?.data?.thread || res?.thread || res?.detailThread || null
      return thread
    } catch (e) {
      dispatch(uiActions.setError(e.message))
      return rejectWithValue(e.message)
    } finally {
      dispatch(uiActions.stopLoading())
    }
  }
)

export const addComment = createAsyncThunk(
  'threadDetail/addComment',
  async ({ threadId, content }, { dispatch, rejectWithValue }) => {
    dispatch(uiActions.startLoading())
    dispatch(uiActions.clearError())
    try {
      const res = await api.createComment({ threadId, content })
      const comment =
        res?.data?.comment ||
        res?.data?.addedComment ||
        res?.comment ||
        res?.addedComment ||
        null
      return comment
    } catch (e) {
      dispatch(uiActions.setError(e.message))
      return rejectWithValue(e.message)
    } finally {
      dispatch(uiActions.stopLoading())
    }
  }
)

// Thread vote from detail page (optimistic)
export const voteThreadFromDetail = createAsyncThunk(
  'threadDetail/voteThread',
  async ({ threadId, voteType }, { dispatch, getState, rejectWithValue }) => {
    const state = getState()
    const userId = state.auth.user?.id
    if (!userId) return rejectWithValue('Anda harus login untuk vote.')

    const item = state.threadDetail.item
    const previous = { upVotesBy: item?.upVotesBy || [], downVotesBy: item?.downVotesBy || [] }

    dispatch(threadDetailActions.applyOptimisticThreadVote({ userId, voteType }))

    try {
      if (voteType === 'up') await api.upVoteThread(threadId)
      else if (voteType === 'down') await api.downVoteThread(threadId)
      else await api.neutralVoteThread(threadId)
      return true
    } catch (e) {
      dispatch(threadDetailActions.rollbackOptimisticThreadVote({ previous }))
      dispatch(uiActions.setError(e.message))
      return rejectWithValue(e.message)
    }
  }
)

// Comment vote (optimistic)
export const voteComment = createAsyncThunk(
  'threadDetail/voteComment',
  async ({ threadId, commentId, voteType }, { dispatch, getState, rejectWithValue }) => {
    const state = getState()
    const userId = state.auth.user?.id
    if (!userId) return rejectWithValue('Anda harus login untuk vote.')

    const c = state.threadDetail.item?.comments?.find((it) => it.id === commentId)
    const previous = { upVotesBy: c?.upVotesBy || [], downVotesBy: c?.downVotesBy || [] }

    dispatch(threadDetailActions.applyOptimisticCommentVote({ commentId, userId, voteType }))

    try {
      if (voteType === 'up') await api.upVoteComment({ threadId, commentId })
      else if (voteType === 'down') await api.downVoteComment({ threadId, commentId })
      else await api.neutralVoteComment({ threadId, commentId })
      return true
    } catch (e) {
      dispatch(threadDetailActions.rollbackOptimisticCommentVote({ commentId, previous }))
      dispatch(uiActions.setError(e.message))
      return rejectWithValue(e.message)
    }
  }
)
