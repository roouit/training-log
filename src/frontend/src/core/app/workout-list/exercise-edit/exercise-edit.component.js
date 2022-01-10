import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import SetEdit from '../set-edit'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { getExerciseById } from '../../../../shared/api'

function ExerciseEdit ({ exerciseData, handleAddEntry }) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [exercise, setExercise] = useState([])

  ExerciseEdit.propTypes = {
    exerciseData: PropTypes.object.isRequired,
    handleAddEntry: PropTypes.object.isRequired
  }

  useEffect(() => {
    async function call () {
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
      {loading && !error
        ? (
            'Loading workout data...'
          )
        : (
        <List dense={true}>
          <Typography variant='h6'>{exercise.exercise_name}</Typography>
          {exerciseData.map((set) => {
            return (
              <SetEdit
                key={`ex${set.exercise_id}set${set.set_number}`}
                setData={set}
                handleAddEntry={handleAddEntry}
              />
            )
          })}
        </List>
          )}
    </>
  )
}

export default ExerciseEdit
