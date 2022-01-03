import React, { useState } from 'react'
import { saveExercise } from '../../../../shared/api'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'

function AddExercise () {
  const [name, setName] = useState('')

  function handleAddExercise () {
    if (name) {
      saveExercise({
        exercise_name: name
      })
      setName('')
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
