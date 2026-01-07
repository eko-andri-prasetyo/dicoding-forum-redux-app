import { Link } from 'react-router-dom'
import Avatar from './Avatar.jsx'

export default function ThreadItem ({ thread }) {
  const owner = thread.owner
  const title = thread.title || '(Tanpa judul)'
  const category = thread.category || 'Uncategorized'

  return (
    <article className='card'>
      <div className='card__header'>
        <div className='threadMeta'>
          <span className='badge'>{category}</span>
          <span className='muted'>{thread.createdAtLabel}</span>
          <span className='muted'>· {thread.totalComments || 0} komentar</span>
        </div>
        <h2 className='card__title'>
          <Link to={`/threads/${thread.id}`} className='link'>
            {title}
          </Link>
        </h2>
      </div>

      {thread.bodySnippet
        ? <p className='card__body'>{thread.bodySnippet}</p>
        : null}

      <div className='card__footer'>
        <div className='userMini'>
          <Avatar src={owner?.avatar} alt={owner?.name || 'User'} size={28} />
          <span className='userMini__name'>{owner?.name || 'Unknown'}</span>
        </div>
      </div>
    </article>
  )
}
