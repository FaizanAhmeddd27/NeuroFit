import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'

// Pages
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Dashboard from './pages/Dashboard'
import Workouts from './pages/Workouts'
import Goals from './pages/Goals'
import Calories from './pages/Calories'
import Profile from './pages/Profile'

// Components
import Loader from './components/common/Loader'

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return <Loader />
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/dashboard" />}
      />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/login" />}
      />
      <Route
        path="/workouts"
        element={user ? <Workouts /> : <Navigate to="/login" />}
      />
      <Route
        path="/goals"
        element={user ? <Goals /> : <Navigate to="/login" />}
      />
      <Route
        path="/calories"
        element={user ? <Calories /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/login" />}
      />

      {/* Default Route */}
      <Route
        path="/"
        element={<Navigate to={user ? "/dashboard" : "/login"} />}
      />

      {/* 404 Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App