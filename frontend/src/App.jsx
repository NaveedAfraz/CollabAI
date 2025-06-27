import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router'
import AuthCheck from './components/auth/authCheck'
import Tickets from './pages/tickets'
import Login from './pages/login'
import Signup from './pages/signup'
import TicketDetails from './pages/ticket'
import Admin from './pages/admin'
function App() {

  return (
    <Routes>
      <Route path="/" element={<AuthCheck protectedRoute={true}><Tickets /></AuthCheck>} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/tickets/:id" element={<AuthCheck protectedRoute={true}><TicketDetails /></AuthCheck>} />
      <Route path="/admin" element={<AuthCheck protectedRoute={true}><Admin /></AuthCheck>} />
    </Routes>
  )
}

export default App
