import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Workout from './workout'
import { getWorkouts, deleteWorkoutById } from '../../../shared/api'

function WorkoutList () {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    async function call() {
      try {
        const data = await getWorkouts()
        setWorkouts(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    call()
  }, [])

  function handleRemoveWorkout (workoutId) {
    const newWorkouts = [...workouts]
    let indexToDel = null
    workouts.forEach((workout, index) => {
      if (workout.workout_id === workoutId) {
        indexToDel = index
      }
    })
    if (indexToDel !== null) {
      newWorkouts.splice(indexToDel, 1)
    }
    setWorkouts(newWorkouts)
    deleteWorkoutById(workoutId)
  }

  return (
    <>
      <Stack spacing={1}>
        {error ? <div>virhe</div> : ''}
        {loading
          ? 'Lataa'
          : workouts.map((workout) => (
              <Workout
                key={`workout${workout.workout_id}`}
                data={workout}
                handleRemoveWorkout={handleRemoveWorkout}
              />
            ))}
      </Stack>
    </>
  )
}

export default WorkoutList
