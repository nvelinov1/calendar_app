import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'

export default function Welcome() {

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/calendar");
      }
    });
  });

  return (
    <>
        <h1>Calendar App</h1>
        <Link to="/create_account">Sign Up</Link><br></br>
        <Link to="/login">Login</Link>

    </>
  )
}
