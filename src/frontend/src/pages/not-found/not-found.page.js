import React from 'react'
import AdminNavigation from '../../core/app/navigation/admin'
import { Link } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'

function NotFoundPage () {
  return (
    <>
      <AdminNavigation />
      <Typography variant='h3' textAlign='center' gutterBottom={true}>
        Page not found!
      </Typography>
      <Link to='/' style={{ color: 'black', display: 'flex', justifyContent: 'center' }}>
        <Button variant='outlined' color='inherit'>
          Back to home page
        </Button>
      </Link>
    </>
  )
}

export default NotFoundPage
