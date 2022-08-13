import React, {useState} from 'react'
import DatePicker from './DatePicker';
import { Box, Stack, TextField, Button, Typography } from '@mui/material'


export default function EventForm({ EventsList, setEventsList }) {
    const [NewEvent, setNewEvent] = useState({title: "", start: "", end: ""})

  return (
      <form onSubmit={(e)  => {
          e.preventDefault(); 
          setEventsList([...EventsList, NewEvent])}
        }>
        <Box sx={{ width: '100%'}}>
          <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
            <Typography align="center" variant="h4"> Add New Event </Typography>
            <TextField id="outlined-basic" variant="outlined" type="text" placeholder="Event Title" value={NewEvent.title} onChange={(e) => setNewEvent({...NewEvent, title: e.target.value})} />
            <DatePicker value={NewEvent.start} text="Start Date" handleChange={(newValue) => {setNewEvent({...NewEvent, start: newValue});}}/>
            <DatePicker value={NewEvent.end} text="End Date" handleChange={(newValue) => {setNewEvent({...NewEvent, end: newValue});}}/>
            <Button variant="contained">Create Event</Button>
          </Stack>
        </Box>
      </form>

  )
}
