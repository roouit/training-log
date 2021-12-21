import React from 'react'
import Set from '../set'
import List from '@mui/material/List'
import Typography from '@mui/material/Typography'
import { useExercise } from '../../../../shared/hooks'

function Exercise({ data }) {
  const { exerciseData, isLoading, isError } = useExercise(data[0].exercise_id)
  return (
    <>
      {isLoading && !isError
        ? 'Lataa..'
        : <List dense={true}>
            <Typography variant='h6'>{exerciseData.exercise_name}</Typography>
            {data.map((set) => {
              return (
                <Set key={`ex${set.exercise_id}set${set.set_number}`} data={set} />
              )
            })}
          </List>
      }
    </>
  )
}

export default Exercise
