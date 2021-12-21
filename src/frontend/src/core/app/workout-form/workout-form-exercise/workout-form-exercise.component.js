import React from 'react'
import SelectExercise from '../select-exercise/'
import WorkoutFormSet from '../workout-form-set/'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

function WorkoutFormExercise({handleRemoveExercise}) {
  return (
    <>
      <Stack spacing={1} direction='row' justifyContent='start' sx={{marginBottom: '10px'}}>
        <SelectExercise />
        <Button variant='outlined'>Add set</Button>
        <Button variant='outlined' color='error' onClick={handleRemoveExercise}>
          Remove exercise
        </Button>
      </Stack>
      <Stack spacing={0}>
        <WorkoutFormSet />
        <WorkoutFormSet />
      </Stack>
    </>
  )
}

export default WorkoutFormExercise
