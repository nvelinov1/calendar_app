import React, { useRef } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useState, useEffect } from 'react';
import EventForm from '../components/EventForm'
import { Typography, Container, Grid, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { ref, onValue } from "firebase/database";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@fontsource/roboto/300.css';

export default function EventCalendar() {

  const [EventsList, setEventsList] = useState([])
  const localizer = momentLocalizer(moment)
  const emailRef = useRef("")
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
      else if (user) {
        emailRef.current = auth.currentUser.email
        onValue(ref(db, `/${auth.currentUser.uid}`), (dataView) => {
          const data = dataView.val()
          console.log(data)
          if (data !== null) {
            setEventsList([])
            Object.values(data).map((event) => {
              const event_database = event.event
              event_database.start = new Date(event_database.start *1000)
              event_database.end = new Date(event_database.end * 1000)
              setEventsList((oldArray) => [...oldArray, event.event]);
            });
          }
        })

      }
    });
  },[]);

  let signedIn = ""
  if (emailRef.current) {
    signedIn = <Typography align="center" variant="h6">Signed in as {emailRef.current}<Button sx={{ m: "5px" }} variant="contained" size="small" onClick={async()=>await auth.signOut()}>Sign Out</Button></Typography>
  }

  return (
    <Container>
      <Typography align="center" variant="h2">
        Calendar App
      </Typography>
      {signedIn}

      <Grid container spacing={2} alignItems="stretch" direction="row" justifyContent="center">
        <Grid item xs={8}>
          <Calendar
          localizer={localizer}
          events={EventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
          />
        </Grid>
            
        <Grid item xs={3} justifyContent="space-around">
          <EventForm />
        </Grid>
      </Grid>
    </Container>
  );
}
