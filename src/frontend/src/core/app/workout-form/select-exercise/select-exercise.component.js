import React, { useState, useEffect } from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import { getAllExercises } from '../../../../shared/api'

function SelectExercise({handleSetExercise}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [allExercises, setAllExercises] = useState([])
  const [exercise, setExercise] = useState('')

  useEffect(() => {
    async function call() {
      try {
        const response = await getAllExercises()
        setAllExercises(response)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    call()
  }, [])

  const handleChange = (e) => {
    const newExer = allExercises.find(
      (exer) => exer.exercise_name === e.target.value
    )
    setExercise(e.target.value)
    handleSetExercise(newExer)
  }

  return (
    <>
      <FormControl sx={{ minWidth: 120 }} size='small'>
        <InputLabel id='select-exercise-label'>Exercise</InputLabel>
        <Select
          labelId='select-exercise-label'
          id='select-exercise'
          value={exercise}
          label='Exercise'
          onChange={handleChange}
        >
          {loading && !error
            ? ''
            : allExercises.map((exercise) => {
                return (
                  <MenuItem
                    key={exercise.exercise_name}
                    value={exercise.exercise_name}
                  >
                    {exercise.exercise_name}
                  </MenuItem>
                )
              })}
        </Select>
      </FormControl>
    </>
  )
}

export default SelectExercise
