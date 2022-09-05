import React, { useState } from 'react'
import DatePicker from './DatePicker';
import moment from 'moment';
import { Box, Stack, TextField, Button, Typography, MenuItem, Menu } from '@mui/material'
import { FaChevronDown } from "react-icons/fa"
import { uid } from 'uid'
import { auth, db } from '../firebase'
import { set, ref } from "firebase/database";
import { BlockPicker } from 'react-color';

export default function EventForm() {
    const [NewEvent, setNewEvent] = useState({title: "", start: null, end: null, color: ""})
    const [EventType, setEventType] = useState(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const open = Boolean(anchorEl)

    const handleClose = (e) => {
      setAnchorEl(null)
      setEventType(e.currentTarget.dataset.value)
    }

    const HandleSubmit = async(e) => {
      e.preventDefault()

      if (NewEvent.title === "" || NewEvent.start === null || NewEvent.end === null) {
        return alert("Please enter values for all form fields!")
      } 

      const uidd = uid();
      const db_event = {...NewEvent, id: uidd}
      db_event.start = moment(db_event.start).unix()
      db_event.end = moment(db_event.end).unix()
      await set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
        event: db_event,
        uidd: uidd
      });
      setNewEvent({title: "", start: null, end: null, color: ""})
    }

    return (
          <Box sx={{ width: '100%'}}>
            <Stack direction="column" justifyContent="center" alignItems="stretch" spacing={2}>
              <Typography  align="center" variant="h4"> Add New Event </Typography>
              <Button variant="contained" onClick={(e)=>setAnchorEl(e.currentTarget)}>Create{'\u00A0'}<FaChevronDown/></Button>
              <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={handleClose} data-value="event">Event</MenuItem>
                <MenuItem onClick={handleClose} data-value="dudedate">Due Date</MenuItem>
              </Menu>

              {EventType ? 
              <>
                <TextField variant="outlined" type="text" placeholder="Event Title" value={NewEvent.title} onChange={(e) => setNewEvent({...NewEvent, title: e.target.value})} />
                <DatePicker value={NewEvent.start} text={EventType === "event" ? "Start Date": "Due Date"} handleChange={(newValue) => {setNewEvent({...NewEvent, start: newValue.toDate()});}}/>
                {EventType === "event" ? 
                <DatePicker value={NewEvent.end} text="End Date" handleChange={(newValue) => {setNewEvent({...NewEvent, end: newValue.toDate()});}}/>
                : null}
                <Typography  align="center" variant="h6">Event Color</Typography>
                <BlockPicker triangle="hide" width="100%" color={NewEvent.color} onChange={(color)=>setNewEvent({...NewEvent, color: color.hex})} />
                <Button variant="contained" onClick={HandleSubmit} color="success" >Create Event</Button>
              </>
              : null}
              </Stack>
          </Box>
  )
}