/*
Skenario pengujian thunk (minimal 2):
1) fetchThreads sukses: mengembalikan daftar threads dari API.
2) fetchThreads gagal: me-return rejected dan mengirim ui/setError.
*/

import { describe, expect, it, vi } from 'vitest'

vi.mock('../../utils/api.js', () => {
  return {
    api: {
      getAllThreads: vi.fn()
    }
  }
})

import { api } from '../../utils/api.js'
import { fetchThreads } from './thunks.js'

describe('threads thunks', () => {
  it('fetchThreads should return threads on success', async () => {
    api.getAllThreads.mockResolvedValueOnce({
      data: { threads: [{ id: 't-1', title: 'Hello' }] }
    })

    const dispatch = vi.fn()
    const getState = vi.fn(() => ({}))

    const action = await fetchThreads()(dispatch, getState, undefined)

    expect(action.type).toBe('threads/fetchThreads/fulfilled')
    expect(action.payload).toHaveLength(1)
    expect(action.payload[0].id).toBe('t-1')
  })

  it('fetchThreads should return rejected and dispatch ui/setError on failure', async () => {
    api.getAllThreads.mockRejectedValueOnce(new Error('boom'))

    const dispatch = vi.fn()
    const getState = vi.fn(() => ({}))

    const action = await fetchThreads()(dispatch, getState, undefined)

    expect(action.type).toBe('threads/fetchThreads/rejected')
    expect(action.payload).toBe('boom')

    const calledTypes = dispatch.mock.calls.map((c) => c[0]?.type).filter(Boolean)
    expect(calledTypes).toContain('ui/setError')
  })
})
