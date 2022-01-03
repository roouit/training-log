import React from 'react'
import AdminNavigation from '../../core/app/navigation/admin'
import Typography from '@mui/material/Typography'

function AdminPage() {
  return (
    <>
      <AdminNavigation />
      <Typography variant='h4' textAlign='center' gutterBottom={true}>
        Admin settings
      </Typography>
    </>
  )
}

export default AdminPage