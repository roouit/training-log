import React, { useState } from 'react'
import { saveExercise } from '../../../../shared/api'
import ToastNotification from '../../../../shared/components/toast'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

function AddExercise () {
  const [name, setName] = useState('')

  async function handleAddExercise () {
    if (name) {
      const result = await saveExercise({
        exercise_name: name
      })
      if (result.status === 201) {
        setName('')
        ToastNotification(true, 'Exercise added')
      } else if (result.status === 400) {
        ToastNotification(false, result.data.message)
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
        Add exercise
      </Typography>
      <Stack
        spacing={2}
        direction='row'
        justifyContent='start'
        alignItems='center'
      >
        <TextField
          variant='standard'
          type='text'
          label='New exercise name'
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></TextField>
        <Button variant='contained' color='success' onClick={handleAddExercise}>
          Add exercise
        </Button>
      </Stack>
    </>
  )
}

export default AddExercise
