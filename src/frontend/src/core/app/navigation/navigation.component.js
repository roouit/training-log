import React from 'react'
import { Link } from 'react-router-dom'
import './navigation.styles.css'
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
        <Link to='/'>
          <Button
            variant='outlined'
            color='inherit'
            sx={{ marginRight: '10px' }}
          >
            Workouts
          </Button>
        </Link>
        <Link to='/settings'>
          <Button variant='outlined' color='inherit'>
            User data
          </Button>
        </Link>
      </Toolbar>
    </AppBar>
  )
}

export default Navigation
