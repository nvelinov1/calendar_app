import React from 'react'
import EventCalendar from './screens/EventCalendar'
import Welcome from './screens/Welcome'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="/calendar" element={<EventCalendar/>} />
      </Routes>
    </BrowserRouter>
  )
}
