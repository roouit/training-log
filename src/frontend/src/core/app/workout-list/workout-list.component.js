import React from 'react'
import Stack from '@mui/material/Stack'
import Workout from './workout'

function WorkoutList () {
  return (
    <>
      <Stack spacing={1}>
        <Workout />
        <Workout />
      </Stack>
    </>
  )
}

export default WorkoutList
