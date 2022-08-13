import React from 'react'
import EventCalendar from '../screens/EventCalendar'
import Welcome from '../screens/Welcome'
import CreateAccount from '../screens/CreateAccount'
import Login from '../screens/Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/calendar" element={<EventCalendar/>} />
        <Route path="/create_account" element={<CreateAccount/>} />
        <Route path="/login" element={<Login/>} />
      </Routes>
    </BrowserRouter>
  )
}
