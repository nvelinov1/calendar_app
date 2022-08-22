import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useState, useEffect } from 'react';
import EventForm from '../components/EventForm'
import { Typography, Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { ref, onValue } from "firebase/database";
import 'react-big-calendar/lib/css/react-big-calendar.css';
import '@fontsource/roboto/300.css';

export default function EventCalendar() {

  const [EventsList, setEventsList] = useState([])
  const localizer = momentLocalizer(moment)

  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
      else if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (dataView) => {
          const data = dataView.val()
          console.log(data)
          if (data !== null) {
            setEventsList([])
            Object.values(data).map((event) => {
              event.event.start = new Date(event.event.start *1000)
              event.event.end = new Date(event.event.end * 1000)
              setEventsList((oldArray) => [...oldArray, event.event]);
            });
          }
        })

      }
    });
  },[]);

  return (
    <Container>
      <Typography align="center" variant="h2">
        Calendar App
      </Typography>
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
