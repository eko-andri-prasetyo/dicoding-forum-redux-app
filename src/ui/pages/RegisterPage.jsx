import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { registerUser } from '../../states/auth/thunks.js'

export default function RegisterPage () {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const loading = useSelector((s) => s.ui.loadingCount) > 0

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()
    const res = await dispatch(registerUser({ name: name.trim(), email: email.trim(), password }))
    if (res.meta.requestStatus === 'fulfilled') {
      navigate('/login')
    }
  }

  return (
    <section className='card'>
      <div className='card__header'>
        <h1 className='card__title'>Register</h1>
        <p className='muted'>Daftar akun baru. Endpoint: /register </p>
      </div>

      <form className='form' onSubmit={onSubmit}>
        <label htmlFor='name' className='label'>Nama</label>
        <input
          id='name'
          className='input'
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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
            {loading ? 'Memproses…' : 'Daftar'}
          </button>
        </div>
      </form>

      <div className='muted'>
        Sudah punya akun? <Link to='/login' className='link'>Login</Link>
      </div>
    </section>
  )
}
