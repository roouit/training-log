import React, { useState } from 'react'
import SelectExercise from '../../workout-form/select-exercise/'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function DeleteExercise () {
  const [exerciseId, setExerciseId] = useState(null)

  function handleSetExercise(newExercise) {
    setExerciseId(newExercise.id)
  }

  function handleUpdateExercise() {
    if (exerciseId) {
      console.log(exerciseId)
    }
  }

  return (
    <>
      <Typography variant='h6' gutterBottom={true}>
        Delete exercise
      </Typography>
      <Stack
        spacing={2}
        direction='row'
        justifyContent='start'
        alignItems='center'
      >
        <SelectExercise handleSetExercise={handleSetExercise} />
        <Button
          variant='contained'
          color='error'
          onClick={handleUpdateExercise}
        >
          Delete exercise
        </Button>
      </Stack>
    </>
  )
}

export default DeleteExercise
