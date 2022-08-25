import { Stack, Typography, Container, Button } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { FaCalendarAlt } from "react-icons/fa"

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
    <Container>
      <Stack spacing={2} direction="column">
          <Typography align="center" variant="h2">Calendar App <FaCalendarAlt /></Typography>
          <Typography align="center" variant="h2"></Typography>
          <Button variant="contained" component={Link} to="/create_account">Register</Button>
          <Button variant="contained" component={Link} to="/login">Log In</Button>
      </Stack>
    </Container>
  )
}
