import React, { useState, useEffect } from 'react'
import { getUserById } from '../../../shared/api/user'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function UserSettings () {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [user, setUser] = useState({})

  useEffect(() => {
    async function call() {
      try {
        const response = await getUserById(1)
        console.log(response)
        setUser(response)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    call()
  }, [])

  if (loading) {
    return error ? (
      <div>An error occured while retrieving user data</div>
    ) : (
      <div>Loading...</div>
    )
  }
  
  return (
    <>
      {!user ? (
        'No user data found'
      ) : (
        <Stack
          spacing={1}
          direction='column'
          justifyContent='start'
          // alignItems='center'
          sx={{}}
        >
          <TextField
            variant='standard'
            type='text'
            label='User name'
            defaultValue={user.username}
          ></TextField>
          <TextField
            variant='standard'
            type='text'
            label='Email'
            defaultValue={user.email}
          ></TextField>
          <TextField
            variant='standard'
            type='text'
            label='First name'
            defaultValue={user.first_name}
          ></TextField>
          <TextField
            variant='standard'
            type='text'
            label='Last name'
            defaultValue={user.last_name}
          ></TextField>
          <Button
            variant='contained'
            color='success'
            sx={{
              maxWidth: '200px',
              alignSelf: 'center'
            }}
          >
            Save settings
          </Button>
        </Stack>
      )}
    </>
  )
}

export default UserSettings
