import { useDispatch, useSelector } from 'react-redux'
import { threadsActions } from '../../states/threads/slice.js'
import { selectCategories, selectThreadListView } from '../../states/selectors.js'
import CategoryFilter from '../components/CategoryFilter.jsx'
import ThreadList from '../components/ThreadList.jsx'

export default function HomePage () {
  const dispatch = useDispatch()
  const threads = useSelector(selectThreadListView)
  const categories = useSelector(selectCategories)
  const filterCategory = useSelector((s) => s.threads.filterCategory)
  const status = useSelector((s) => s.threads.status)

  return (
    <section>
      <div className='pageHeader'>
        <h1 className='pageTitle'>Daftar Thread</h1>
        <p className='muted'>Pilih thread untuk melihat detail dan komentar.</p>
      </div>

      <CategoryFilter
        categories={categories}
        value={filterCategory}
        onChange={(v) => dispatch(threadsActions.setFilterCategory(v))}
      />

      {status === 'loading'
        ? <div className='spinner'>Memuat threads…</div>
        : <ThreadList threads={threads} />}
    </section>
  )
}
