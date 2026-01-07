/*
Skenario pengujian komponen React (minimal 2):
1) ThreadItem menampilkan judul, kategori, dan link ke detail.
2) VoteButtons memanggil handler onUp/onDown saat tombol ditekan.
*/

import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import ThreadItem from './ThreadItem.jsx'
import VoteButtons from './VoteButtons.jsx'

describe('ui components', () => {
  it('ThreadItem should render title, category, and link', () => {
    const thread = {
      id: 'thread-1',
      title: 'Judul Thread',
      category: 'react',
      createdAtLabel: '01 Jan 2026 10:00',
      totalComments: 2,
      bodySnippet: 'Snippet',
      owner: { name: 'User' }
    }

    render(
      <MemoryRouter>
        <ThreadItem thread={thread} />
      </MemoryRouter>
    )

    expect(screen.getByText('react')).toBeInTheDocument()
    const link = screen.getByRole('link', { name: 'Judul Thread' })
    expect(link).toHaveAttribute('href', '/threads/thread-1')
  })

  it('VoteButtons should call handlers on click', async () => {
    const user = userEvent.setup()
    const onUp = vi.fn()
    const onDown = vi.fn()

    render(<VoteButtons myVote='none' voteCount={0} onUp={onUp} onDown={onDown} />)

    await user.click(screen.getByRole('button', { name: /up vote/i }))
    await user.click(screen.getByRole('button', { name: /down vote/i }))

    expect(onUp).toHaveBeenCalledTimes(1)
    expect(onDown).toHaveBeenCalledTimes(1)
  })
})
