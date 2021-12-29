import React, { useState, useEffect } from 'react'
import Set from '../set'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { getExerciseById } from '../../../../shared/api'

function Exercise({ exerciseData }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [exercise, setExercise] = useState([])

  useEffect(() => {
    async function call() {
      try {
        const response = await getExerciseById(exerciseData[0].exercise_id)
        setExercise(response)
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
      {loading && !error ? (
        'Loading workout data...'
      ) : (
        <List dense={true}>
          <Typography variant='h6'>{exercise.exercise_name}</Typography>
          {exerciseData.map((set) => {
            return (
              <Set
                key={`ex${set.exercise_id}set${set.set_number}`}
                data={set}
              />
            )
          })}
        </List>
      )}
    </>
  )
}

export default Exercise
