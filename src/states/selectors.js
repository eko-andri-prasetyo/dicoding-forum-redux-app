import dayjs from 'dayjs'
import { stripHtml, truncate } from '../utils/text.js'

export function selectUserById (state, userId) {
  return state.users.items.find((u) => u.id === userId) || null
}

export function selectThreadListView (state) {
  const { items, filterCategory } = state.threads
  const users = state.users.items

  const enriched = items.map((t) => {
    const owner = users.find((u) => u.id === t.ownerId) || t.owner || null
    const createdAt = t.createdAt || t.date || t.createdAt || t.created_at
    const upVotesBy = t.upVotesBy || []
    const downVotesBy = t.downVotesBy || []
    const voteCount = upVotesBy.length - downVotesBy.length

    return {
      ...t,
      owner,
      createdAt,
      createdAtLabel: createdAt ? dayjs(createdAt).format('DD MMM YYYY HH:mm') : '-',
      bodySnippet: truncate(stripHtml(t.body || ''), 140),
      voteCount
    }
  })

  if (!filterCategory || filterCategory === 'ALL') return enriched
  return enriched.filter((t) => (t.category || 'Uncategorized') === filterCategory)
}

export function selectCategories (state) {
  const cats = state.threads.items
    .map((t) => t.category)
    .filter(Boolean)
  const unique = Array.from(new Set(cats))
  unique.sort((a, b) => a.localeCompare(b))
  return ['ALL', ...unique]
}

export function selectThreadDetailView (state) {
  const item = state.threadDetail.item
  if (!item) return null
  const users = state.users.items

  const owner =
    users.find((u) => u.id === item.ownerId) ||
    item.owner ||
    null

  const upVotesBy = item.upVotesBy || []
  const downVotesBy = item.downVotesBy || []
  const voteCount = upVotesBy.length - downVotesBy.length

  const comments = (item.comments || []).map((c) => {
    const commentOwner =
      users.find((u) => u.id === c.ownerId) ||
      c.owner ||
      null

    const cu = c.upVotesBy || []
    const cd = c.downVotesBy || []
    const cVoteCount = cu.length - cd.length

    return {
      ...c,
      owner: commentOwner,
      createdAt: c.createdAt || c.date || c.createdAt || c.created_at,
      createdAtLabel: (c.createdAt || c.date) ? dayjs(c.createdAt || c.date).format('DD MMM YYYY HH:mm') : '-',
      voteCount: cVoteCount
    }
  })

  return {
    ...item,
    owner,
    createdAt: item.createdAt || item.date || item.createdAt || item.created_at,
    createdAtLabel: (item.createdAt || item.date) ? dayjs(item.createdAt || item.date).format('DD MMM YYYY HH:mm') : '-',
    voteCount,
    comments
  }
}
