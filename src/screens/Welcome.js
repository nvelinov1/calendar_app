import React from 'react'
import { Link } from 'react-router-dom'

export default function Welcome() {
  return (
    <>
        <h1>Calendar App</h1>
        <Link to="/create_account">Sign Up</Link><br></br>
        <Link to="/login">Login</Link>

    </>
  )
}
