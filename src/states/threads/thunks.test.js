import { describe, it, expect, vi, beforeEach } from 'vitest'
import { fetchThreads, createThread } from './thunks'
import { api } from '../../utils/api.js'

describe('threads thunks', () => {
  const dispatch = vi.fn()
  const getState = vi.fn(() => ({ auth: { user: null } }))

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('fetchThreads should call api.getAllThreads and return fulfilled payload', async () => {
    vi.spyOn(api, 'getAllThreads').mockResolvedValue({
      data: { threads: [{ id: 't1', title: 'Halo' }] }
    })

    const result = await fetchThreads()(dispatch, getState, undefined)

    expect(api.getAllThreads).toHaveBeenCalledTimes(1)
    expect(result.type).toBe('threads/fetchThreads/fulfilled')
    expect(result.payload).toEqual([{ id: 't1', title: 'Halo' }])
  })

  it('createThread should call api.createThread and return fulfilled payload', async () => {
    vi.spyOn(api, 'createThread').mockResolvedValue({
      data: { thread: { id: 't2', title: 'Judul', body: 'Isi', category: 'cat' } }
    })

    const payload = { title: 'Judul', body: 'Isi', category: 'cat' }
    const result = await createThread(payload)(dispatch, getState, undefined)

    expect(api.createThread).toHaveBeenCalledWith(payload)
    expect(result.type).toBe('threads/createThread/fulfilled')
    expect(result.payload).toEqual({ id: 't2', title: 'Judul', body: 'Isi', category: 'cat' })
  })
})
