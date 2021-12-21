import React from 'react'
import SelectExercise from '../select-exercise/'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

function WorkoutFormExercise({handleRemoveExercise}) {
  return (
    <>
      <Stack spacing={1} direction='row' justifyContent='start'>
        <SelectExercise />
        <Button variant='outlined'>Add set</Button>
        <Button variant='outlined' color='error' onClick={handleRemoveExercise}>
          Remove exercise
        </Button>
      </Stack>
    </>
  )
}

export default WorkoutFormExercise
