import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLeaderboards } from '../../states/leaderboards/thunks.js'
import Avatar from '../components/Avatar.jsx'

export default function LeaderboardsPage () {
  const dispatch = useDispatch()
  const items = useSelector((s) => s.leaderboards.items)
  const status = useSelector((s) => s.leaderboards.status)

  useEffect(() => {
    dispatch(fetchLeaderboards())
  }, [dispatch])

  return (
    <section className='card'>
      <div className='card__header'>
        <h1 className='card__title'>Leaderboards</h1>
        <p className='muted'>Daftar pengguna dengan score tertinggi. </p>
      </div>

      {status === 'loading'
        ? <div className='spinner'>Memuat leaderboard…</div>
        : (
          <div className='table'>
            <div className='table__row table__head'>
              <div>#</div>
              <div>Pengguna</div>
              <div className='table__right'>Score</div>
            </div>

            {items.map((it, idx) => (
              <div key={idx} className='table__row'>
                <div>{idx + 1}</div>
                <div className='userMini'>
                  <Avatar src={it.user?.avatar} alt={it.user?.name || 'User'} size={28} />
                  <span className='userMini__name'>{it.user?.name || 'Unknown'}</span>
                </div>
                <div className='table__right'>{it.score}</div>
              </div>
            ))}
          </div>
          )}
    </section>
  )
}
