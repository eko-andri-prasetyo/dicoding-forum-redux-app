/*
Skenario pengujian reducer threads (minimal 2):
1) setFilterCategory harus mengubah filterCategory sesuai payload.
2) applyOptimisticVote harus mengubah upVotesBy/downVotesBy sesuai voteType.
*/

import reducer, { threadsActions } from './slice.js'
import { describe, expect, it } from 'vitest'

describe('threads reducer', () => {
  it('should handle setFilterCategory', () => {
    const prev = { items: [], status: 'idle', filterCategory: 'ALL' }
    const next = reducer(prev, threadsActions.setFilterCategory('redux'))
    expect(next.filterCategory).toBe('redux')
  })

  it('should handle applyOptimisticVote (up)', () => {
    const prev = {
      items: [{ id: 't-1', upVotesBy: [], downVotesBy: [] }],
      status: 'idle',
      filterCategory: 'ALL'
    }
    const next = reducer(prev, threadsActions.applyOptimisticVote({ threadId: 't-1', userId: 'u-1', voteType: 'up' }))
    expect(next.items[0].upVotesBy).toContain('u-1')
    expect(next.items[0].downVotesBy).not.toContain('u-1')
  })
})
