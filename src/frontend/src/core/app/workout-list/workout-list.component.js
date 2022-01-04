import React, { useState, useEffect } from 'react'
import Workout from './workout'
import OrderOptions from './order-options/'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import { getWorkouts, deleteWorkoutById, updateWorkoutById } from '../../../shared/api'

function WorkoutList () {
  // vars used in data fetch call
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)
  const [ascending, setAscending] = useState(false)
  const [olderThan, setOlderThan] = useState(false)
  const [cutoffDate, setCutoffDate] = useState('')
  // vars related to data fetching status and data
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [workouts, setWorkouts] = useState([])
  // if there's next page of workouts
  const [isNext, setIsNext] = useState(true)

  useEffect(() => {
    async function call() {
      try {
        const data = await getWorkouts(
          offset,
          limit,
          ascending,
          olderThan,
          cutoffDate
        )
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
  }, [offset, ascending, olderThan, cutoffDate])

  function handleRemoveWorkout(workoutId) {
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

  function handleUpdateWorkout(workoutId, editedEntries, date) {
    const entries = editedEntries.filter((entry) => {
      return Object.keys(entry).length > 1
    })
    const updatedWorkout = {
      date: date ? date : undefined,
      entries: entries.length > 0 ? entries : undefined
    }
    updateWorkoutById(workoutId, updatedWorkout)
  }

  if (loading) {
    return <div>Loading your data...</div>
  }

  if (error) {
    return <div>An error occured while retrieving workouts</div>
  }

  return (
    <>
      <OrderOptions
        ascending={ascending}
        setAscending={setAscending}
        olderThan={olderThan}
        setOlderThan={setOlderThan}
        cutoffDate={cutoffDate}
        setCutoffDate={setCutoffDate}
      />
      <Stack spacing={1}>
        {workouts.length === 0 ? (
          <div>No workouts, yet!</div>
        ) : (
          workouts.map((workout) => (
            <Workout
              key={`workout${workout.workout_id}`}
              workoutData={workout}
              handleRemoveWorkout={handleRemoveWorkout}
              handleUpdateWorkout={handleUpdateWorkout}
            />
          ))
        )}
        <Stack direction='row' spacing={2} justifyContent='center'>
          {offset > 0 ? (
            <Button variant='text' onClick={() => setOffset(offset - limit)}>
              Previous
            </Button>
          ) : (
            ''
          )}
          {isNext ? (
            <Button variant='text' onClick={() => setOffset(offset + limit)}>
              Next
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
