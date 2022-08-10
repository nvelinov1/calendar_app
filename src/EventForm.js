import React, {useState} from 'react'
import DatePicker from './DatePicker';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'

export default function EventForm({ EventsList, setEventsList }) {
    const [NewEvent, setNewEvent] = useState({title: "", start: "", end: ""})

  return (
      <form onSubmit={(e)  => {
          e.preventDefault(); 
          setEventsList([...EventsList, NewEvent])}
        }>
        <Box sx={{ width: '100%'}}>
          <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
            <input type="text" placeholder="Event Title" value={NewEvent.title} onChange={(e) => setNewEvent({...NewEvent, title: e.target.value})}></input>
            <DatePicker value={NewEvent.start} text={"Start Date"} handleChange={(newValue) => {setNewEvent({...NewEvent, start: newValue});}}/>
            <DatePicker value={NewEvent.end} text={"End Date"} handleChange={(newValue) => {setNewEvent({...NewEvent, end: newValue});}}/>
            <button type="submit">Submit</button>
          </Stack>
        </Box>
      </form>

  )
}
