import { Outlet } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import LoadingBar from '../components/LoadingBar.jsx'
import ErrorToast from '../components/ErrorToast.jsx'

export default function Layout () {
  return (
    <div className='appShell'>
      <LoadingBar />
      <Navbar />
      <main className='container'>
        <ErrorToast />
        <Outlet />
      </main>
      <footer className='footer'>
        <span>Forum Diskusi · React + Redux</span>
      </footer>
    </div>
  )
}
