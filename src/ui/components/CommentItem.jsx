import Avatar from './Avatar.jsx'
import VoteButtons from './VoteButtons.jsx'
import SafeHtml from './SafeHtml.jsx'

export default function CommentItem ({ comment, myVote, onUp, onDown }) {
  const owner = comment.owner
  return (
    <div className='comment'>
      <div className='comment__head'>
        <div className='userMini'>
          <Avatar src={owner?.avatar} alt={owner?.name || 'User'} size={28} />
          <div>
            <div className='userMini__name'>{owner?.name || 'Unknown'}</div>
            <div className='muted'>{comment.createdAtLabel}</div>
          </div>
        </div>
        <VoteButtons
          myVote={myVote}
          voteCount={comment.voteCount || 0}
          onUp={onUp}
          onDown={onDown}
        />
      </div>
      <div className='comment__body'>
        <SafeHtml html={comment.content} />
      </div>
    </div>
  )
}
