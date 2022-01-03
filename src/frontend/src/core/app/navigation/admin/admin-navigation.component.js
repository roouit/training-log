import React from 'react'
import '../navigation.styles.css'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

function AdminNavigation () {
  return (
    <AppBar position='static' sx={{ marginBottom: '20px' }}>
      <Toolbar>
        <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
          TRAINING LOG
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default AdminNavigation
