import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <>
        <div>Welcome</div>
        <Link to="/calendar">Go to Calendar</Link>
    </>
  )
}
