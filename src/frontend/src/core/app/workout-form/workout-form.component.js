import React, { useState, useEffect } from 'react'
import WorkoutFormExercise from './workout-form-exercise'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Typography from '@mui/material/Typography'

function FormHeader({handleAddExercise}) {
  const [value, setValue] = useState(null)

  return (
    <div className='workout-form-header' style={{ marginBottom: '10px' }}>
      <Typography variant='h6' align='center' gutterBottom={true}>
        New workout
      </Typography>
      <Stack spacing={2} direction='row' justifyContent='center'>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DateTimePicker
            inputFormat='dd.MM.yyyy HH:mm'
            renderInput={(props) => <TextField size='small' {...props} />}
            label='Date and time of workout'
            value={value}
            onChange={(newValue) => {
              setValue(newValue)
            }}
          />
        </LocalizationProvider>
        <Button variant='outlined' onClick={handleAddExercise}>
          Add exercise
        </Button>
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
  const [exerNumber, setExerNumber] = useState(0)
  const [workout, setWorkout] = useState({})

  useEffect(() => {
    setWorkout({
      user_id: 2,
      date: "2021-10-20T11:59:00",
      entries: []
    })
  }, [])

  function handleAddExercise () {
    setExerNumber(exerNumber + 1)
  }

  function handleRemoveExercise() {
    setExerNumber(exerNumber - 1)
  }

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
        <FormHeader handleAddExercise={handleAddExercise} />
        <WorkoutFormExercise handleRemoveExercise={handleRemoveExercise} />
        <FormFooter />
      </Box>
    </>
  )
}

export default WorkoutForm
