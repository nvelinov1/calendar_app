import { Container, Modal, Typography, Box, Button } from '@mui/material'
import { auth, db } from "../firebase"
import { ref, remove } from "firebase/database"
import React from 'react'
import moment from 'moment'

export default function PopUp({ handleClose, openState, ClickedEvent }) {

  const styles = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 300,
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const onDelete = async() => {
    await remove(ref(db, `/${auth.currentUser.uid}/${ClickedEvent.id}`));
    window.location.reload(false)
  }

  return (
    <Modal open={openState} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Container>
          <Box sx={styles}>
          <Typography align="center" id="modal-modal-title" variant="h4"> 
              Single Event View
            </Typography>
            <Typography align="center" id="modal-modal-description" variant="h6"> 
            <strong>Event title:</strong> {ClickedEvent.title} 
            </Typography>
            <Typography align="center" id="modal-modal-description" variant="h6"> 
              <strong>Event start:</strong> {moment(ClickedEvent.start).format('DD-MM-YYYY')} 
            </Typography>
            <Typography align="center" id="modal-modal-description" variant="h6"> 
              <strong>Event end:</strong> {moment(ClickedEvent.end).format('DD-MM-YYYY')}
            </Typography>
            <Typography align="center">
              <Button variant="contained" align="center" onClick={()=>onDelete()}>Delete Event</Button>
            </Typography>
          </Box>
        </Container>
    </Modal>
  )
}
