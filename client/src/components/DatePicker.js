import React, { useState, Fragment } from 'react';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import CalendarPicker from '@mui/lab/CalendarPicker';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import Workout from "./Workout"

export default function DatePicker() {
  const [value, setValue] = useState(new Date());

  function formatDate(dateToFormat) {
    const offset = dateToFormat.getTimezoneOffset()
    dateToFormat = new Date(dateToFormat.getTime() - (offset*60*1000))
    return dateToFormat.toISOString().split('T')[0]
  } 
  var formattedDate = formatDate(value)

  return (
    <Fragment>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <StaticDatePicker
                orientation='portrait'
                value={value} 
                onChange={(newValue) => {
                    setValue(newValue)
                    formattedDate = formatDate(newValue)
                    console.log(formattedDate)
                }} 
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
        <Workout date={formattedDate} />
    </Fragment>
  );
}