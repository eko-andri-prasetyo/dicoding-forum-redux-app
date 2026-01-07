import VoteButtons from './VoteButtons.jsx'

export default {
  title: 'Components/VoteButtons',
  component: VoteButtons
}

export function Neutral () {
  return <VoteButtons myVote='none' voteCount={0} onUp={() => {}} onDown={() => {}} />
}

export function UpVoted () {
  return <VoteButtons myVote='up' voteCount={5} onUp={() => {}} onDown={() => {}} />
}

export function DownVoted () {
  return <VoteButtons myVote='down' voteCount={-2} onUp={() => {}} onDown={() => {}} />
}
