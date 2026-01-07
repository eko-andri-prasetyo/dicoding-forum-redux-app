import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { logoutUser } from '../../states/auth/thunks.js'

export default function Navbar () {
  const auth = useSelector((s) => s.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onLogout = async () => {
    await dispatch(logoutUser())
    navigate('/')
  }

  return (
    <header className='navbar'>
      <div className='container navbar__inner'>
        <Link to='/' className='navbar__brand'>
          <span className='brandDot' /> Forum Diskusi
        </Link>

        <nav className='navbar__nav'>
          <NavLink to='/' className={({ isActive }) => isActive ? 'navlink navlink--active' : 'navlink'}>
            Threads
          </NavLink>
          <NavLink to='/leaderboards' className={({ isActive }) => isActive ? 'navlink navlink--active' : 'navlink'}>
            Leaderboards
          </NavLink>

          {auth.token
            ? (
              <>
                <NavLink to='/new' className={({ isActive }) => isActive ? 'navlink navlink--active' : 'navlink'}>
                  + Thread
                </NavLink>
                <button type='button' className='btn btn--danger' onClick={onLogout}>
                  Logout
                </button>
              </>
              )
            : (
              <>
                <NavLink to='/login' className={({ isActive }) => isActive ? 'navlink navlink--active' : 'navlink'}>
                  Login
                </NavLink>
                <NavLink to='/register' className={({ isActive }) => isActive ? 'navlink navlink--active' : 'navlink'}>
                  Register
                </NavLink>
              </>
              )}
        </nav>
      </div>
    </header>
  )
}
