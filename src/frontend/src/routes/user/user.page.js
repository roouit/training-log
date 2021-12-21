import React from 'react'
import WorkoutForm from '../../core/app/workout-form/workout-form.component'
import WorkoutList from '../../core/app/workout-list/'
import Divider from '@mui/material/Divider'

function UserPage() {
  return (
    <>
      <WorkoutForm />
      <WorkoutList />
    </>
  )
}

export default UserPage
