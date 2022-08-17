import React, {useState} from 'react'
import DatePicker from './DatePicker';
import { Box, Stack, TextField, Button, Typography } from '@mui/material'
import { uid } from 'uid'
import { auth, db } from '../firebase'
import { set, ref, onValue, remove, update } from "firebase/database";

export default function EventForm({ EventsList, setEventsList }) {
    const [NewEvent, setNewEvent] = useState({title: "", start: "", end: ""})

    const HandleSubmit = (e) => {
      e.preventDefault()
      const uidd = uid();
      setEventsList([...EventsList, NewEvent])
      console.log(NewEvent)
      set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        event: NewEvent,
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