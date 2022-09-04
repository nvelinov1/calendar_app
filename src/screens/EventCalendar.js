import React from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import { useState, useEffect } from 'react';
import EventForm from '../components/EventForm'
import { Typography, Grid, Button, AppBar, Toolbar, Container } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { ref, onValue } from "firebase/database";
import PopUp from '../components/PopUp';
import '@fontsource/roboto/300.css';
import 'react-big-calendar/lib/css/react-big-calendar.css';

export default function EventCalendar() {

  const [EventsList, setEventsList] = useState([])
  const [ModalOpen, setModalOpen] = useState(false)
  const [ClickedEvent, setClickedEvent] = useState([])
  const [Email, setEmail] = useState()
  const localizer = momentLocalizer(moment)
  const navigate = useNavigate()

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (!user) {
        navigate("/");
      }
      else if (user) {
        setEmail(auth.currentUser.email)
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          const data = snapshot.val()
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
  },[navigate]);

  const handleEventClick = (event) => {
    setModalOpen(true)
    setClickedEvent(event)
  }

  const renderSignedIn = () => {
    if (Email) {   
      return <Typography sx={{ flexGrow: 1 }} align="right" variant="h6">{Email}<Button sx={{ m: "5px" }} variant="contained" color="success" size="small" onClick={async()=>await auth.signOut()}>Sign Out</Button></Typography>
    }
  }

  return (
    <>
    <AppBar position="static" sx={{ width: '100%', b: 3 }}>
        <Toolbar>
          <Typography sx={{ flexGrow: 1 }} variant="h2">NextEvent</Typography>
          {renderSignedIn()}
        </Toolbar>
    </AppBar>
    <Container>
      <PopUp handleClose={()=>setModalOpen(false)} openState={ModalOpen} ClickedEvent={ClickedEvent} />
      <Grid container spacing={2} alignItems="stretch" direction="row" justifyContent="center" >
        <Grid item xs={8}>
          <Calendar 
          localizer={localizer}
          events={EventsList}
          style={{ height: 500, marginTop: 10 }}
          onSelectEvent={(e)=>handleEventClick(e)}
          eventPropGetter={(event)=> {
            const backgroundColor = event.color 
            return { style: { backgroundColor }}
          }}
          />
        </Grid>
            
        <Grid item xs={3} justifyContent="space-around">
          <EventForm />
        </Grid>
      </Grid>
    </Container>
    </>
  );
}
