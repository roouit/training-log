import React, { useState } from 'react'
import SelectExercise from '../../workout-form/select-exercise/'
import { updateExerciseById } from '../../../../shared/api'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

function UpdateExercise () {
  const [exercise, setExercise] = useState(null)
  const [name, setName] = useState('')

  function handleSetExercise(newExercise) {
    setExercise(newExercise)
  }

  function handleUpdateExercise() {
    if (exercise) {
      updateExerciseById(exercise.id, {
        exercise_name: name
      })
      setName('')
      setExercise(null)
    }
  }

  return (
    <>
      <Typography variant='h6' gutterBottom={true}>
        Update exercise
      </Typography>
      <Stack
        spacing={2}
        direction='row'
        justifyContent='start'
        alignItems='center'
      >
        <SelectExercise handleSetExercise={handleSetExercise} />
        <TextField
          variant='standard'
          type='text'
          label='New exercise name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <Button
          variant='contained'
          color='success'
          onClick={handleUpdateExercise}
        >
          Update exercise
        </Button>
      </Stack>
    </>
  )
}

export default UpdateExercise
