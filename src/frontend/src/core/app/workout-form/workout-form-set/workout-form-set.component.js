import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

function WorkoutFormSet ({ setNumber, handleUpdateLoadAndReps, handleRemoveSet }) {
  const [reps, setReps] = useState(0)
  const [load, setLoad] = useState(0)

  WorkoutFormSet.propTypes = {
    setNumber: PropTypes.func.isRequired,
    handleUpdateLoadAndReps: PropTypes.func.isRequired,
    handleRemoveSet: PropTypes.func.isRequired
  }

  useEffect(() => {
    handleUpdateLoadAndReps(setNumber, reps, load)
  }, [reps, load])

  return (
    <>
      <Stack
        spacing={1}
        direction='row'
        justifyContent='start'
        alignItems='center'
        sx={{ margin: '0 0 5px 25px' }}
      >
        <TextField
          focused
          sx={{
            maxWidth: '80px',
            marginRight: '15px'
          }}
          variant='standard'
          type='number'
          label='Repetitions'
          size='small'
          inputProps={{ style: { fontSize: '0.8em' } }}
          onChange={(e) => setReps(parseInt(e.target.value))}
        ></TextField>
        <TextField
          focused
          sx={{
            maxWidth: '80px'
          }}
          variant='standard'
          type='number'
          label='Load'
          size='small'
          inputProps={{ style: { fontSize: '0.8em' } }}
          onChange={(e) => setLoad(parseInt(e.target.value))}
        ></TextField>
        <IconButton onClick={() => handleRemoveSet(setNumber)}>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </>
  )
}

export default WorkoutFormSet
