const BASE_URL = 'https://forum-api.dicoding.dev/v1'

function normalizeErrorMessage (json) {
  if (!json) return 'Unknown error'
  if (typeof json === 'string') return json
  return json.message || json.error || 'Unknown error'
}

function pickToken (data) {
  // Be tolerant to potential naming differences
  return (
    data?.token ||
    data?.accessToken ||
    data?.access_token ||
    data?.data?.token ||
    data?.data?.accessToken ||
    data?.data?.access_token
  )
}

export class DicodingForumAPI {
  constructor ({ token } = {}) {
    this._token = token || null
  }

  setToken (token) {
    this._token = token
  }

  async _request (path, { method = 'GET', body, auth = false } = {}) {
    const headers = {
      'Content-Type': 'application/json'
    }

    if (auth) {
      if (!this._token) throw new Error('Anda harus login terlebih dahulu.')
      headers.Authorization = `Bearer ${this._token}`
    }

    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined
    })

    const json = await res.json().catch(() => null)

    if (!res.ok) {
      const message = normalizeErrorMessage(json)
      throw new Error(message)
    }

    return json
  }

  // USERS
  async register ({ name, email, password }) {
    // POST /register
    return await this._request('/register', {
      method: 'POST',
      body: { name, email, password }
    })
  }

  async login ({ email, password }) {
    // POST /login
    const json = await this._request('/login', {
      method: 'POST',
      body: { email, password }
    })
    const token = pickToken(json)
    return { json, token }
  }

  async getAllUsers () {
    // GET /users
    return await this._request('/users')
  }

  async getOwnProfile () {
    // GET /users/me (Authorization)
    return await this._request('/users/me', { auth: true })
  }

  // THREADS
  async getAllThreads () {
    // GET /threads
    return await this._request('/threads')
  }

  async getThreadDetail (threadId) {
    // GET /threads/:id (commonly available, used by submission)
    return await this._request(`/threads/${threadId}`)
  }

  async createThread ({ title, body, category }) {
    // POST /threads (Authorization)
    return await this._request('/threads', {
      method: 'POST',
      auth: true,
      body: { title, body, category }
    })
  }

  async createComment ({ threadId, content }) {
    // POST /threads/:id/comments (Authorization)
    return await this._request(`/threads/${threadId}/comments`, {
      method: 'POST',
      auth: true,
      body: { content }
    })
  }

  // VOTES - Thread
  async upVoteThread (threadId) {
    // POST /threads/:id/up-vote
    return await this._request(`/threads/${threadId}/up-vote`, { method: 'POST', auth: true })
  }

  async downVoteThread (threadId) {
    return await this._request(`/threads/${threadId}/down-vote`, { method: 'POST', auth: true })
  }

  async neutralVoteThread (threadId) {
    return await this._request(`/threads/${threadId}/neutral-vote`, { method: 'POST', auth: true })
  }

  // VOTES - Comment
  async upVoteComment ({ threadId, commentId }) {
    return await this._request(`/threads/${threadId}/comments/${commentId}/up-vote`, { method: 'POST', auth: true })
  }

  async downVoteComment ({ threadId, commentId }) {
    return await this._request(`/threads/${threadId}/comments/${commentId}/down-vote`, { method: 'POST', auth: true })
  }

  async neutralVoteComment ({ threadId, commentId }) {
    return await this._request(`/threads/${threadId}/comments/${commentId}/neutral-vote`, { method: 'POST', auth: true })
  }

  // LEADERBOARDS
  async getLeaderboards () {
    // GET /leaderboards
    return await this._request('/leaderboards')
  }
}

export const api = new DicodingForumAPI()
