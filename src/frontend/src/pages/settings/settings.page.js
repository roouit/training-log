import React from 'react'
import UserNavigation from '../../core/app/navigation/user'
import UserSettings from '../../core/app/settings/'
import Typography from '@mui/material/Typography'

function SettingsPage() {
  return (
    <>
      <UserNavigation/>
      <Typography variant='h4' textAlign='center' gutterBottom={true}>User data</Typography>
      <UserSettings />
    </>
  )
}

export default SettingsPage
