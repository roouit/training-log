import React, { useState } from 'react'
import SelectExercise from '../../workout-form/select-exercise/'
import ToastNotification from '../../../../shared/components/toast'
import { updateExerciseById } from '../../../../shared/api'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

function UpdateExercise () {
  const [exercise, setExercise] = useState(null)
  const [name, setName] = useState('')

  function handleSetExercise (newExercise) {
    setExercise(newExercise)
  }

  async function handleUpdateExercise () {
    if (exercise) {
      const result = await updateExerciseById(exercise.id, {
        exercise_name: name
      })
      if (result.status === 200) {
        setName('')
        setExercise(null)
        ToastNotification(true, 'Exercise updated')
      } else if (result.status === 404) {
        ToastNotification(false, 'Exercise not found')
      } else if (result.status === 500 && result.data.error.errno === 1062) {
        ToastNotification(false, 'Name already taken')
      } else {
        ToastNotification(false, 'Error when updating')
      }
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
