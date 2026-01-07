import ThreadItem from './ThreadItem.jsx'

export default function ThreadList ({ threads }) {
  if (!threads || threads.length === 0) {
    return <div className='empty'>Belum ada thread. Yuk bikin thread pertama!</div>
  }

  return (
    <div className='stack'>
      {threads.map((t) => (
        <ThreadItem key={t.id} thread={t} />
      ))}
    </div>
  )
}
