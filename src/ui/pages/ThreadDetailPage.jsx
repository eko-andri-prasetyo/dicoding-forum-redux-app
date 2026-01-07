import { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Avatar from '../components/Avatar.jsx'
import VoteButtons from '../components/VoteButtons.jsx'
import CommentItem from '../components/CommentItem.jsx'
import SafeHtml from '../components/SafeHtml.jsx'
import { fetchThreadDetail, addComment, voteComment, voteThreadFromDetail } from '../../states/threadDetail/thunks.js'
import { selectThreadDetailView } from '../../states/selectors.js'

function getMyVote (userId, upVotesBy = [], downVotesBy = []) {
  if (!userId) return 'none'
  if (upVotesBy.includes(userId)) return 'up'
  if (downVotesBy.includes(userId)) return 'down'
  return 'none'
}

export default function ThreadDetailPage () {
  const { id } = useParams()
  const dispatch = useDispatch()

  const authUserId = useSelector((s) => s.auth.user?.id)
  const token = useSelector((s) => s.auth.token)
  const status = useSelector((s) => s.threadDetail.status)
  const detail = useSelector(selectThreadDetailView)

  const [content, setContent] = useState('')

  useEffect(() => {
    dispatch(fetchThreadDetail(id))
  }, [dispatch, id])

  const myThreadVote = useMemo(() => {
    if (!detail) return 'none'
    return getMyVote(authUserId, detail.upVotesBy || [], detail.downVotesBy || [])
  }, [authUserId, detail])

  const onSubmitComment = async (e) => {
    e.preventDefault()
    if (!content.trim()) return
    await dispatch(addComment({ threadId: id, content: content.trim() }))
    setContent('')
  }

  if (status === 'loading') return <div className='spinner'>Memuat detail…</div>
  if (!detail) return <div className='empty'>Thread tidak ditemukan. Kembali ke <Link to='/' className='link'>Home</Link>.</div>

  const owner = detail.owner

  return (
    <section className='stack'>
      <div className='breadcrumb'>
        <Link to='/' className='link'>← Kembali</Link>
      </div>

      <article className='card'>
        <div className='card__header'>
          <div className='threadMeta'>
            <span className='badge'>{detail.category || 'Uncategorized'}</span>
            <span className='muted'>{detail.createdAtLabel}</span>
          </div>
          <h1 className='card__title'>{detail.title}</h1>
        </div>

        <div className='card__footer card__footer--space'>
          <div className='userMini'>
            <Avatar src={owner?.avatar} alt={owner?.name || 'User'} size={32} />
            <div>
              <div className='userMini__name'>{owner?.name || 'Unknown'}</div>
              <div className='muted'>Pembuat thread</div>
            </div>
          </div>

          <VoteButtons
            myVote={myThreadVote}
            voteCount={detail.voteCount || 0}
            onUp={() => {
              if (!token) return
              dispatch(voteThreadFromDetail({ threadId: id, voteType: myThreadVote === 'up' ? 'neutral' : 'up' }))
            }}
            onDown={() => {
              if (!token) return
              dispatch(voteThreadFromDetail({ threadId: id, voteType: myThreadVote === 'down' ? 'neutral' : 'down' }))
            }}
          />
        </div>

        <div className='content'>
          <SafeHtml className='content__body' html={detail.body} />
        </div>
      </article>

      <section className='card'>
        <div className='card__header'>
          <h2 className='card__title'>Komentar ({detail.comments?.length || 0})</h2>
        </div>

        {token
          ? (
            <form className='form' onSubmit={onSubmitComment}>
              <label htmlFor='comment' className='label'>Tulis komentar</label>
              <textarea
                id='comment'
                className='textarea'
                rows='3'
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder='Tulis komentar Anda…'
              />
              <div className='form__actions'>
                <button type='submit' className='btn'>Kirim</button>
              </div>
            </form>
            )
          : (
            <div className='empty'>
              Anda harus <Link to='/login' className='link'>login</Link> untuk berkomentar.
            </div>
            )}

        <div className='stack'>
          {(detail.comments || []).map((c) => {
            const myVote = getMyVote(authUserId, c.upVotesBy || [], c.downVotesBy || [])
            return (
              <CommentItem
                key={c.id}
                comment={c}
                myVote={myVote}
                onUp={() => {
                  if (!token) return
                  dispatch(voteComment({ threadId: id, commentId: c.id, voteType: myVote === 'up' ? 'neutral' : 'up' }))
                }}
                onDown={() => {
                  if (!token) return
                  dispatch(voteComment({ threadId: id, commentId: c.id, voteType: myVote === 'down' ? 'neutral' : 'down' }))
                }}
              />
            )
          })}
        </div>
      </section>
    </section>
  )
}
