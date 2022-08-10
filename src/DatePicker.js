import React from 'react'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';

export default function DatePicker({ value, handleChange, text }) {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
        <DateTimePicker
          label={text}
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
  )
}
