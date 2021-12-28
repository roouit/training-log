import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import moment from 'moment'
import axios from 'axios'
import WorkoutFormExercise from './workout-form-exercise'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import Typography from '@mui/material/Typography'

function FormHeader({date, setDate, handleAddExercise}) {
  
  function handleDateChange (newDate) {
    setDate(moment(newDate).format('YYYY-MM-DD HH:mm'))
  }

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

function FormFooter({handleSaveWorkout}) {
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
          onClick={handleSaveWorkout}
        >
          Save workout
        </Button>
      </Stack>
    </>
  )
}

function WorkoutForm() {
  const [exercises, setExercises] = useState([])
  const [date, setDate] = useState(null)
  const [workout, setWorkout] = useState({})

  // console.log(workout)
  // console.log(exercises)

  useEffect(() => {
    setWorkout({
      user_id: 1,
      date: date,
      entries: []
    })
  }, [])

  useEffect(() => {
    if (date) {
      const newWorkout = {
        ...workout,
        date: date
      }
      setWorkout(newWorkout)
    }
  }, [date])

  function handleAddExercise () {
    const newExercises = [...exercises]
    newExercises.push({
      exercise_uuid: uuidv4(),
      sets: []
    })
    setExercises(newExercises)
  }

  function handleRemoveExercise(exerciseUuid) {
    const newExercises = [...exercises]
    let indexToDel = null
    newExercises.forEach((exer, index) => {
      if (exer.exercise_uuid === exerciseUuid) {
        indexToDel = index
      }
    })
    newExercises.splice(indexToDel, 1)
    setExercises(newExercises)
  }

  function handleSaveWorkout () {
    const workoutToSave = {...workout}
    exercises.forEach(exer => {
      exer.sets.forEach(set => {
        delete set.entry_uuid
        workoutToSave.entries.push(set)
      })
    })
    axios.post('http://localhost:8080/api/v1/users/2/workouts/', workoutToSave)
      .then(res => console.log(res.data))
  }

  function updateExercise(exerciseUuid, newSets) {
    const newExercises = [...exercises]
    let indexToUpdate = null
    newExercises.forEach((exer, index) => {
      if (exer.exercise_uuid === exerciseUuid) {
        indexToUpdate = index
      }
    })
    newExercises[indexToUpdate].sets = newSets
    setExercises(newExercises)
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
        <FormHeader date={date} setDate={setDate} handleAddExercise={handleAddExercise} />
        {exercises.map(exer => {
          return (
            <WorkoutFormExercise
              key={exer.exercise_uuid}
              exerciseUuid={exer.exercise_uuid}
              handleRemoveExercise={handleRemoveExercise}
              updateExercise={updateExercise}
            />
          )
        })}
        
        <FormFooter handleSaveWorkout={handleSaveWorkout}/>
      </Box>
    </>
  )
}

export default WorkoutForm
