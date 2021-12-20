import React from 'react'
import Set from './set'
import List from '@mui/material/List'

function Exercise({ data }) {
  return (
    <>
      <List dense={true}>
        {data.map(set => {
          return (
            <Set key={`ex${set.exercise_id}set${set.set_number}`} data={set}/>
          )
        })}
      </List>
    </>
  )
}

export default Exercise
