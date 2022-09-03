import { Stack, Typography, Container, Button, Grid } from '@mui/material'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth } from '../firebase'
import { FaCalendarAlt } from "react-icons/fa"
import logo from '../n901241.gif'

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
      <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ backgroundImage: `url(${logo})`, height: '90vh', border: '2px solid black', backgroundPosition: 'center' }}>
        <Stack spacing={2} direction="column" sx={{ m: 2, p: 2, border: "2px solid black", backdropFilter: "blur(10px)" }} justifyContent="center" alignItems="center">
            <Typography align="center" variant="h2">NextEvent <FaCalendarAlt /></Typography>
            <Typography align="center" variant="h5"> Easily keep track of tasks & due dates</Typography>
            <Button sx={{ width: 600 }} variant="contained" color="success" component={Link} to="/create_account">Register</Button>
            <Button sx={{ width: 600 }} variant="contained" color="success" component={Link} to="/login">Log In</Button>
        </Stack>
      </Grid>
    </Container>
  )
}
