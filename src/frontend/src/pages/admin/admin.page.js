import React from 'react'
import AdminNavigation from '../../core/app/navigation/admin'
import AdminSettings from '../../core/app/admin'
import Typography from '@mui/material/Typography'

function AdminPage() {
  return (
    <>
      <AdminNavigation />
      <Typography variant='h4' textAlign='center' gutterBottom={true}>
        Admin settings
      </Typography>
      <AdminSettings/>
    </>
  )
}

export default AdminPage