import React, { useState, useEffect } from 'react'
import { getUserById, updateUserById } from '../../../shared/api'
import ToastNotification from '../../../shared/components/toast'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function UserSettings () {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    async function call () {
      try {
        const response = await getUserById(2)
        setUser(response)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    call()
  }, [])

  function handleChange (e) {
    const newUser = { ...user }
    newUser[e.target.id] = e.target.value
    setUser(newUser)
  }

  async function handleSave () {
    const newUser = { ...user }
    delete newUser.id
    const result = await updateUserById(user.id, newUser)
    if (result.status === 200) {
      ToastNotification(true, 'User data updated')
    } else if (result.status === 404) {
      ToastNotification(false, result.data.message)
    } else if (result.status === 400) {
      ToastNotification(false, result.data.message)
    } else if (result.status === 500 && result.data.error.errno === 1062) {
      ToastNotification(false, 'Username or email already taken')
    } else {
      ToastNotification(false, 'Error when updating')
    }
  }

  if (loading) {
    return <div>Loading your data...</div>
  }

  if (error) {
    return <div>An error occured while retrieving workouts</div>
  }

  return (
    <>
      {!user
        ? (
            'No user data found'
          )
        : (
        <Stack
          spacing={1}
          direction='column'
          justifyContent='start'
        >
          <TextField
            variant='standard'
            type='text'
            label='User name'
            defaultValue={user.username}
            id='username'
            onChange={handleChange}
          ></TextField>
          <TextField
            variant='standard'
            type='text'
            label='Email'
            defaultValue={user.email}
            id='email'
            onChange={handleChange}
          ></TextField>
          <TextField
            variant='standard'
            type='text'
            label='First name'
            defaultValue={user.first_name}
            id='first_name'
            onChange={handleChange}
          ></TextField>
          <TextField
            variant='standard'
            type='text'
            label='Last name'
            defaultValue={user.last_name}
            id='last_name'
            onChange={handleChange}
          ></TextField>
          <Button
            variant='contained'
            color='success'
            sx={{
              maxWidth: '200px',
              alignSelf: 'center'
            }}
            onClick={handleSave}
          >
            Save data
          </Button>
        </Stack>
          )}
    </>
  )
}

export default UserSettings
