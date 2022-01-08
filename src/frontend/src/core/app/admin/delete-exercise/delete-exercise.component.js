import React, { useState } from 'react'
import SelectExercise from '../../workout-form/select-exercise/'
import { deleteExerciseById } from '../../../../shared/api'
import ToastNotification from '../../../../shared/components/toast'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

function DeleteExercise () {
  const [exerciseId, setExerciseId] = useState(null)

  function handleSetExercise(newExercise) {
    setExerciseId(newExercise.id)
  }

  async function handleUpdateExercise() {
    if (exerciseId) {
      const result = await deleteExerciseById(exerciseId)
      if (result.status === 200) {
        setExerciseId(null)
        ToastNotification(true, 'Exercise deleted')
      } else if (result.status === 404) {
        ToastNotification(false, 'Exercise not found')
      } else {
        ToastNotification(false, 'Error when deleting')
      }
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
