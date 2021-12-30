import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function Navigation () {
  return (
    <AppBar position='static' sx={{ marginBottom: '20px' }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          TRAINING LOG
        </Typography>
        <Button variant='outlined' color='inherit' sx={{ marginRight: '10px' }}>
          Workouts
        </Button>
        <Button variant='outlined' color='inherit'>
          Settings
        </Button>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
