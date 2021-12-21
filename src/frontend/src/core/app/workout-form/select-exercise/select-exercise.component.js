import React, { useState } from 'react'
import { useExercise } from '../../../../shared/hooks'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

function SelectExercise() {
  const [exercise, setExercise] = useState('')
  const { exerciseData, isLoading, isError } = useExercise()

  const handleChange = (event) => {
    setExercise(event.target.value)
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
          {isLoading && !isError ? '' : (
            exerciseData.map(exercise => {
              return (
                <MenuItem key={exercise.exercise_name} value={exercise.exercise_name}>
                  {exercise.exercise_name}
                </MenuItem>
              )
            })
          )}
        </Select>
      </FormControl>
    </>
  )
}

export default SelectExercise
