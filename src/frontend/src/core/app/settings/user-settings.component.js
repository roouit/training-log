import React, { useState, useEffect } from 'react'
import { getUserById, updateUserById } from '../../../shared/api'
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
    const newUser = {...user}
    newUser[e.target.id] = e.target.value
    setUser(newUser)
  }

  function handleSave () {
    const newUser = {...user}
    delete newUser.id
    updateUserById(user.id, newUser)
  }

  if (loading) {
    return error ? (
      <div>An error occured while retrieving user data</div>
    ) : (
      <div>Loading your data...</div>
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
