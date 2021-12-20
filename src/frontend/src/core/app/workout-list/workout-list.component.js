import React from 'react'
import Stack from '@mui/material/Stack'
import Workout from './workout'
import { useWorkout } from '../../../shared/hooks'

function WorkoutList () {
  const { workoutData, isLoading, isError } = useWorkout()
  return (
    <>
      <Stack spacing={1}>
        {isError ? <div>virhe</div> : ''}
        {isLoading
          ? 'Lataa'
          : workoutData.map((workout) => (
              <Workout key={`workout${workout.workout_id}`} data={workout} />
            ))}
      </Stack>
    </>
  )
}

export default WorkoutList
