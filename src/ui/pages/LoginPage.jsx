import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { loginUser } from '../../states/auth/thunks.js'

export default function LoginPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const loading = useSelector((s) => s.ui.loadingCount) > 0

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await dispatch(loginUser({ email: email.trim(), password }))
    if (res.meta.requestStatus === 'fulfilled') {
      const target = location.state?.from || '/'
      navigate(target, { replace: true })
    }
  }

  return (
    <section className='card'>
      <div className='card__header'>
        <h1 className='card__title'>Login</h1>
        <p className='muted'>Masuk untuk membuat thread, komentar, dan vote.</p>
      </div>

      <form className='form' onSubmit={onSubmit}>
        <label htmlFor='email' className='label'>Email</label>
        <input
          id='email'
          type='email'
          className='input'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor='password' className='label'>Password</label>
        <input
          id='password'
          type='password'
          className='input'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <div className='form__actions'>
          <button type='submit' className='btn' disabled={loading}>
            {loading ? 'Memproses…' : 'Login'}
          </button>
        </div>
      </form>

      <div className='muted'>
        Belum punya akun? <Link to='/register' className='link'>Register</Link>
      </div>
    </section>
  )
}
