import React, { useState, useEffect } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Workout from './workout'
import { getWorkouts, deleteWorkoutById } from '../../../shared/api'

function WorkoutList () {
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [isNext, setIsNext] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [workouts, setWorkouts] = useState([])

  useEffect(() => {
    async function call() {
      try {
        const data = await getWorkouts(offset, limit)
        data.length < limit ? setIsNext(false) : setIsNext(true)
        setWorkouts(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    setLoading(true)
    call()
  }, [offset])

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

  function handleUpdateWorkout (workoutId) {
    const updatedWorkout = {
      workout_id: undefined,
      user_id: undefined,
      date: undefined,
      entries: undefined
    }
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
                handleUpdateWorkout={handleUpdateWorkout}
              />
            ))}
        <Stack direction='row' spacing={2} justifyContent='center'>
          {offset > 0 ? (
            <Button variant='text' onClick={() => setOffset(offset - limit)}>
              Newer
            </Button>
          ) : (
            ''
          )}
          {isNext ? (
            <Button variant='text' onClick={() => setOffset(offset + limit)}>
              Older
            </Button>
          ) : (
            ''
          )}
        </Stack>
      </Stack>
    </>
  )
}

export default WorkoutList
