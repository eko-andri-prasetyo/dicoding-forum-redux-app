import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api.js'
import { uiActions } from '../ui/slice.js'
import { threadsActions } from './slice.js'

export const fetchThreads = createAsyncThunk(
  'threads/fetchThreads',
  async (_, { dispatch, rejectWithValue }) => {
    dispatch(uiActions.startLoading())
    dispatch(uiActions.clearError())
    try {
      const res = await api.getAllThreads()
      // Expected: data.threads
      const threads = res?.data?.threads || res?.threads || []
      return threads
    } catch (e) {
      dispatch(uiActions.setError(e.message))
      return rejectWithValue(e.message)
    } finally {
      dispatch(uiActions.stopLoading())
    }
  }
)

export const createThread = createAsyncThunk(
  'threads/createThread',
  async ({ title, body, category }, { dispatch, rejectWithValue }) => {
    dispatch(uiActions.startLoading())
    dispatch(uiActions.clearError())
    try {
      const res = await api.createThread({ title, body, category })
      // Might return data.thread or data.addedThread etc; normalize
      const thread =
        res?.data?.thread ||
        res?.data?.addedThread ||
        res?.thread ||
        res?.addedThread ||
        null
      return thread
    } catch (e) {
      dispatch(uiActions.setError(e.message))
      return rejectWithValue(e.message)
    } finally {
      dispatch(uiActions.stopLoading())
    }
  }
)

// Optimistic vote thunk for thread
// payload: { threadId, voteType: 'up' | 'down' | 'neutral' }
export const voteThread = createAsyncThunk(
  'threads/voteThread',
  async ({ threadId, voteType }, { dispatch, getState, rejectWithValue }) => {
    const state = getState()
    const userId = state.auth.user?.id
    if (!userId) return rejectWithValue('Anda harus login untuk vote.')

    const t = state.threads.items.find((it) => it.id === threadId)
    const previous = { upVotesBy: t?.upVotesBy || [], downVotesBy: t?.downVotesBy || [] }

    dispatch(threadsActions.applyOptimisticVote({ threadId, userId, voteType }))

    try {
      if (voteType === 'up') await api.upVoteThread(threadId)
      else if (voteType === 'down') await api.downVoteThread(threadId)
      else await api.neutralVoteThread(threadId)
      return true
    } catch (e) {
      dispatch(threadsActions.rollbackOptimisticVote({ threadId, previous }))
      dispatch(uiActions.setError(e.message))
      return rejectWithValue(e.message)
    }
  }
)
