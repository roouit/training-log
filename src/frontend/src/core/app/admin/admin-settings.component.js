import React, { useState } from 'react'
import UpdateExercise from './update-exercise/update-exercise.component'
import Typography from '@mui/material/Typography'

function AdminSettings() {
  return (
    <>
      <Typography variant='h6'>Update exercise</Typography>
      <UpdateExercise/>
    </>
  )
}

export default AdminSettings
