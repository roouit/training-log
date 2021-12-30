import React from 'react'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

function WorkoutFormFooter({ handleSaveWorkout }) {
  return (
    <>
      <Stack direction='row' justifyContent='end'>
        <Button
          variant='contained'
          color='success'
          sx={{
            marginTop: '10px',
            textAlign: 'right'
          }}
          onClick={handleSaveWorkout}
        >
          Save workout
        </Button>
      </Stack>
    </>
  )
}

export default WorkoutFormFooter
