import React, { useState } from 'react'
import DatePicker from './DatePicker';
import moment from 'moment';
import { Box, Stack, TextField, Button, Typography } from '@mui/material'
import { uid } from 'uid'
import { auth, db } from '../firebase'
import { set, ref } from "firebase/database";

export default function EventForm() {
    const [NewEvent, setNewEvent] = useState({title: "", start: "", end: ""})

    const HandleSubmit = async(e) => {
      e.preventDefault()
      const uidd = uid();
      const db_event = {...NewEvent, id: uidd}
      db_event.start = moment(db_event.start).unix()
      db_event.end = moment(db_event.end).unix()
      await set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        event: db_event,
        uidd: uidd
      });
    }

    return (
          <Box sx={{ width: '100%'}}>
            <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
              <Typography align="center" variant="h4"> Add New Event </Typography>
              <TextField id="outlined-basic" variant="outlined" type="text" placeholder="Event Title" value={NewEvent.title} onChange={(e) => setNewEvent({...NewEvent, title: e.target.value})} />
              <DatePicker value={NewEvent.start} text="Start Date" handleChange={(newValue) => {setNewEvent({...NewEvent, start: newValue.toDate()});}}/>
              <DatePicker value={NewEvent.end} text="End Date" handleChange={(newValue) => {setNewEvent({...NewEvent, end: newValue.toDate()});}}/>
              <Button variant="contained" onClick={HandleSubmit}>Create Event</Button>
            </Stack>
          </Box>
  )
}