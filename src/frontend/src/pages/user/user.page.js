import React from 'react'
import UserNavigation from '../../core/app/navigation/user'
import WorkoutForm from '../../core/app/workout-form/workout-form.component'
import WorkoutList from '../../core/app/workout-list/'
import Typography from '@mui/material/Typography'

function UserPage() {
  return (
    <>
      <UserNavigation/>
      <Typography variant='h5' textAlign='center' gutterBottom={true}>
        Add a new workout
      </Typography>
      <WorkoutForm />
      <Typography variant='h5' textAlign='center' gutterBottom={true}>
        List of your workouts
      </Typography>
      <WorkoutList />
    </>
  )
}

export default UserPage
