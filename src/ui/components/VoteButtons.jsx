export default function VoteButtons ({ myVote, voteCount, onUp, onDown }) {
  return (
    <div className='votes'>
      <button
        type='button'
        className={`voteBtn ${myVote === 'up' ? 'voteBtn--activeUp' : ''}`}
        onClick={onUp}
        aria-label='Up vote'
      >
        ▲
      </button>
      <span className='voteCount' aria-label='Vote count'>{voteCount}</span>
      <button
        type='button'
        className={`voteBtn ${myVote === 'down' ? 'voteBtn--activeDown' : ''}`}
        onClick={onDown}
        aria-label='Down vote'
      >
        ▼
      </button>
    </div>
  )
}
