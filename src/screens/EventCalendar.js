import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useState, useEffect } from 'react';
import EventForm from '../components/EventForm'
import { Typography, Container, Grid } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { set, ref, onValue, remove, update } from "firebase/database";
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
      // else {
      //   onValue(ref(db, `${auth.currentUser.uid}`), (dataView) => {
      //     setEventsList([])
      //     const data = dataView.val()
      //     if (data !== null) {
      //       Object.values(data).map((event) => {
      //         setEventsList((oldArray) => [...oldArray, event]);
      //       });
      //     }
      //   })

      // }
    });
  });

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
          <EventForm EventsList={EventsList} setEventsList={setEventsList} />
        </Grid>
      </Grid>
    </Container>
  );
}
