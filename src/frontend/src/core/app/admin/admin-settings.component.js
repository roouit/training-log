import React from 'react'
import UpdateExercise from './update-exercise'
import AddExercise from './add-exercise'
import DeleteExercise from './delete-exercise'
import Stack from '@mui/material/Stack'

function AdminSettings () {
  return (
    <>
      <Stack
        spacing={2}
        direction='column'
        alignItems='start'
      >
        <UpdateExercise />
        <AddExercise />
        <DeleteExercise />
      </Stack>
    </>
  )
}

export default AdminSettings
