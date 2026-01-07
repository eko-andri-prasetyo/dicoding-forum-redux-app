import { useSelector } from 'react-redux'

export default function LoadingBar () {
  const loadingCount = useSelector((s) => s.ui.loadingCount)
  const visible = loadingCount > 0

  return (
    <div className={`loadingBar ${visible ? 'loadingBar--visible' : ''}`}>
      <div className='loadingBar__inner' />
    </div>
  )
}
