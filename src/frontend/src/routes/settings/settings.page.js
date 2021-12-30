import React from 'react'
import UserSettings from '../../core/app/settings/'
import Typography from '@mui/material/Typography'

function SettingsPage() {
  return (
    <>
      <Typography variant='h4' textAlign='center' gutterBottom={true}>Your user settings</Typography>
      <UserSettings />
    </>
  )
}

export default SettingsPage
