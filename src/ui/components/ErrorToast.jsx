import { useDispatch, useSelector } from 'react-redux'
import { uiActions } from '../../states/ui/slice.js'

export default function ErrorToast () {
  const dispatch = useDispatch()
  const msg = useSelector((s) => s.ui.lastError)

  if (!msg) return null

  return (
    <div className='toast'>
      <div className='toast__content'>
        <strong>Terjadi error:</strong>
        <div className='toast__message'>{msg}</div>
      </div>
      <button
        type='button'
        className='btn btn--ghost'
        onClick={() => dispatch(uiActions.clearError())}
        aria-label='Tutup'
      >
        ✕
      </button>
    </div>
  )
}
