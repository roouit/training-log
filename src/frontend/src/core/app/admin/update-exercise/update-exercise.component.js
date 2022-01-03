import React, { useState } from 'react'
import SelectExercise from '../../workout-form/select-exercise/'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

function UpdateExercise () {
  const [exercise, setExercise] = useState(null)
  const [name, setName] = useState('')

  function handleSetExercise(newExercise) {
    setExercise(newExercise)
  }

  function handleUpdateExercise(newName) {
    if (exercise) {
      console.log(newName)
    }
  }

  return (
    <>
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
          id='exercise_name'
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <Button
          variant='contained'
          color='success'
          onClick={() => handleUpdateExercise(name)}
        >
          Update exercise
        </Button>
      </Stack>
    </>
  )
}

export default UpdateExercise
