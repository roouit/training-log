import React, { useState } from 'react'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'

function SetEdit({ setData, handleAddEntry }) {
  const [editedData, setEditedData] = useState({
    id: setData.id
  })

  function handleChange(e) {
    const newData = { ...editedData }
    if (!e.target.value) {
      delete newData[e.target.id]
      handleAddEntry(newData)
    } else {
      newData[e.target.id] = parseInt(e.target.value)
      handleAddEntry(newData)
    }
    setEditedData(newData)
  }

  return (
    <>
        <Stack
          spacing={1}
          direction='row'
          alignItems='center'
          sx={{ margin: '0 0 5px 15px' }}
        >
          <TextField
            focused
            id='repetitions'
            sx={{
              maxWidth: '80px',
              marginRight: '15px'
            }}
            variant='standard'
            type='number'
            label='Repetitions'
            size='small'
            placeholder={String(setData.repetitions)}
            inputProps={{ style: { fontSize: '0.8em' } }}
            onChange={handleChange}
          ></TextField>
          <TextField
            focused
            id='load'
            sx={{
              maxWidth: '80px'
            }}
            variant='standard'
            type='number'
            label='Load'
            size='small'
            placeholder={String(setData.load)}
            inputProps={{ style: { fontSize: '0.8em' } }}
            onChange={handleChange}
          ></TextField>
        </Stack>
    </>
  )
}

export default SetEdit
