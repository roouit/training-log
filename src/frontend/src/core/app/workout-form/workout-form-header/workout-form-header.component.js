import React from 'react'
import moment from 'moment'
import fi from 'date-fns/locale/fi'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

function WorkoutFormHeader({ date, setDate, handleAddExercise }) {
  function handleDateChange(newDate) {
    setDate(moment(newDate).format('YYYY-MM-DD HH:mm'))
  }

  return (
    <div className='workout-form-header' style={{ marginBottom: '10px' }}>
      <Stack spacing={2} direction='row' justifyContent='center'>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={fi}>
          <DateTimePicker
            inputFormat='dd.MM.yyyy HH:mm'
            renderInput={(props) => <TextField size='small' {...props} />}
            label='Date and time of workout'
            value={date}
            onChange={handleDateChange}
          />
        </LocalizationProvider>
        <Button variant='outlined' onClick={handleAddExercise}>
          Add exercise
        </Button>
      </Stack>
    </div>
  )
}

export default WorkoutFormHeader
