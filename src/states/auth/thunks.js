import { createAsyncThunk } from '@reduxjs/toolkit'
import { api } from '../../utils/api.js'
import { clearToken, getToken, setToken } from '../../utils/authStorage.js'
import { authActions } from './slice.js'
import { uiActions } from '../ui/slice.js'

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { dispatch, rejectWithValue }) => {
    dispatch(uiActions.startLoading())
    dispatch(uiActions.clearError())
    try {
      const res = await api.register({ name, email, password })
      return res
    } catch (e) {
      dispatch(uiActions.setError(e.message))
      return rejectWithValue(e.message)
    } finally {
      dispatch(uiActions.stopLoading())
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { dispatch, rejectWithValue }) => {
    dispatch(uiActions.startLoading())
    dispatch(uiActions.clearError())
    try {
      const { json, token } = await api.login({ email, password })
      if (!token) {
        throw new Error('Token tidak ditemukan dari response login.')
      }

      setToken(token)
      api.setToken(token)

      // Prefer user from login response (if provided), else call /users/me
      const user = json?.data?.user || json?.user || null
      if (user) {
        dispatch(authActions.setAuth({ token, user }))
        return { token, user }
      }

      const profile = await api.getOwnProfile()
      const me = profile?.data?.user || profile?.user || null
      dispatch(authActions.setAuth({ token, user: me }))
      return { token, user: me }
    } catch (e) {
      dispatch(uiActions.setError(e.message))
      return rejectWithValue(e.message)
    } finally {
      dispatch(uiActions.stopLoading())
    }
  }
)

export const logoutUser = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    clearToken()
    api.setToken(null)
    dispatch(authActions.clearAuth())
  }
)

export const restoreSession = createAsyncThunk(
  'auth/restoreSession',
  async (_, { dispatch }) => {
    const token = getToken()
    if (!token) return { token: null, user: null }

    api.setToken(token)

    dispatch(uiActions.startLoading())
    try {
      const profile = await api.getOwnProfile()
      const me = profile?.data?.user || profile?.user || null
      dispatch(authActions.setAuth({ token, user: me }))
      return { token, user: me }
    } catch (e) {
      // If token invalid, clear
      clearToken()
      api.setToken(null)
      dispatch(authActions.clearAuth())
      return { token: null, user: null }
    } finally {
      dispatch(uiActions.stopLoading())
    }
  }
)
