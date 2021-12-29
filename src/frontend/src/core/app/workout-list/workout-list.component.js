import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Workout from './workout'
import { getWorkouts } from '../../../shared/api'

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

  return (
    <>
      <Stack spacing={1}>
        {error ? <div>virhe</div> : ''}
        {loading
          ? 'Lataa'
          : workouts.map((workout) => (
              <Workout key={`workout${workout.workout_id}`} data={workout} />
            ))}
      </Stack>
    </>
  )
}

export default WorkoutList
