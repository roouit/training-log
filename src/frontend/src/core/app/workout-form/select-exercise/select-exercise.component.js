import React from 'react'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'

function SelectExercise() {
  return (
    <>
      <FormControl>
        <InputLabel id='select-exercise-label'>Exercise</InputLabel>
        <Select
          labelId='select-exercise-label'
          id='select-exercise'
          value=''
          label='Exercise'
          // onChange={handleChange}
        >
          <MenuItem value={10}>Back squat</MenuItem>
          <MenuItem value={20}>Front squat</MenuItem>
          <MenuItem value={30}>OHS</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

export default SelectExercise
