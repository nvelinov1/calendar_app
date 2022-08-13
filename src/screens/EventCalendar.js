import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography'
import EventForm from '../components/EventForm'
import Container from '@mui/material/Container'
import '@fontsource/roboto/300.css';

export default function EventCalendar() {
    const [EventsList, setEventsList] = useState([])
    const localizer = momentLocalizer(moment)

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
          <Typography align="center" variant="h4"> Add New Event </Typography>
          <EventForm EventsList={EventsList} setEventsList={setEventsList} />
        </Grid>
      </Grid>
    </Container>
  );
}
