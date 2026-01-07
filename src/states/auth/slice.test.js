import { describe, it, expect } from 'vitest'
import reducer, { authActions } from './slice'

describe('auth reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, { type: '@@INIT' })).toEqual({
      token: null,
      user: null
    })
  })

  it('should handle setAuth', () => {
    const prev = { token: null, user: null }
    const payload = { token: 'token-123', user: { id: 'u1', name: 'Eko' } }

    const next = reducer(prev, authActions.setAuth(payload))

    expect(next.token).toBe('token-123')
    expect(next.user).toEqual({ id: 'u1', name: 'Eko' })
  })

  it('should handle clearAuth', () => {
    const prev = { token: 'token-123', user: { id: 'u1', name: 'Eko' } }

    const next = reducer(prev, authActions.clearAuth())

    expect(next).toEqual({ token: null, user: null })
  })
})
