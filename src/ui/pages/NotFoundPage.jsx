import { Link } from 'react-router-dom'

export default function NotFoundPage () {
  return (
    <div className='empty'>
      Halaman tidak ditemukan. Kembali ke <Link to='/' className='link'>Home</Link>.
    </div>
  )
}
