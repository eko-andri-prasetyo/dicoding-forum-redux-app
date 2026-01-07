import { MemoryRouter } from 'react-router-dom'
import ThreadItem from './ThreadItem.jsx'

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    )
  ]
}

const sampleThread = {
  id: 'thread-1',
  title: 'Halo, ini thread contoh',
  category: 'storybook',
  createdAtLabel: '01 Jan 2026 10:00',
  totalComments: 3,
  bodySnippet: 'Ini snippet dari body thread untuk keperluan preview komponen.',
  owner: { name: 'Cypress Tester', avatar: 'https://ui-avatars.com/api/?name=Storybook' }
}

export function Default () {
  return <ThreadItem thread={sampleThread} />
}
