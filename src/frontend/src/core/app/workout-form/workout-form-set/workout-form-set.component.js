import React from 'react'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

function WorkoutFormSet () {
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
        ></TextField>
        <IconButton>
          <DeleteIcon />
        </IconButton>
      </Stack>
    </>
  )
}

export default WorkoutFormSet
