import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

function Set ({ data }) {
  const [description, setDescription] = useState('')

  Set.propTypes = {
    data: PropTypes.object.isRequired
  }

  useEffect(() => {
    const newDescription = `${data.repetitions} reps @ ${data.load} kg`
    setDescription(newDescription)
  }, [data])

  return (
    <>
      <ListItem sx={{
        padding: '0 10px'
      }}>
        <ListItemText primary={description} />
      </ListItem>
    </>
  )
}

export default Set
