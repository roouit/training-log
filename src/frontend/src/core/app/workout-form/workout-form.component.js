import React, { useState } from 'react'
import SelectExercise from './select-exercise/'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Typography from '@mui/material/Typography'

function FormHeader() {
  const [value, setValue] = useState(null)

  return (
    <div className='workout-form-header' style={{marginBottom: '10px'}}>
      <Typography variant='h6' align='center' gutterBottom={true}>New workout</Typography>
      <Stack spacing={2} direction='row' justifyContent='center'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            inputFormat='dd.MM.yyyy HH:mm'
            renderInput={(props) => <TextField size='small' {...props} />}
            label='Date and time of workout'
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            } } />
        </LocalizationProvider>
        <Button variant='outlined'>Add exercise</Button>
      </Stack>
    </div>
  )
}

function FormFooter() {
  return (
    <>
      <Stack direction='row' justifyContent='end'>
        <Button
          variant='contained'
          color='success'
          sx={{
            marginTop: '10px',
            textAlign: 'right'
          }}
        >
          Save workout
        </Button>
      </Stack>
    </>
  )
}

function WorkoutForm() {
  

  return (
    <>
      <Box
        sx={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          border: '1px solid grey',
          borderRadius: '5px'
        }}
      >
        <FormHeader />

        <SelectExercise />
        <TextField
          id='outlined-number'
          label='Number'
          type='number'
          InputLabelProps={{
            shrink: true
          }}
        />

        <FormFooter />
      </Box>
    </>
  )
}

export default WorkoutForm
