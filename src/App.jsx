import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import Layout from './ui/layouts/Layout.jsx'
import HomePage from './ui/pages/HomePage.jsx'
import ThreadDetailPage from './ui/pages/ThreadDetailPage.jsx'
import AddThreadPage from './ui/pages/AddThreadPage.jsx'
import LeaderboardsPage from './ui/pages/LeaderboardsPage.jsx'
import LoginPage from './ui/pages/LoginPage.jsx'
import RegisterPage from './ui/pages/RegisterPage.jsx'
import NotFoundPage from './ui/pages/NotFoundPage.jsx'
import ProtectedRoute from './ui/components/ProtectedRoute.jsx'
import { initApp } from './states/app/thunks.js'

export default function App () {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initApp())
  }, [dispatch])

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<HomePage />} />
        <Route path='/threads/:id' element={<ThreadDetailPage />} />
        <Route
          path='/new'
          element={
            <ProtectedRoute>
              <AddThreadPage />
            </ProtectedRoute>
          }
        />
        <Route path='/leaderboards' element={<LeaderboardsPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
