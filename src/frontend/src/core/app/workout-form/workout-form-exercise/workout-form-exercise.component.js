import React, { useState } from 'react'
import SelectExercise from '../select-exercise/'
import WorkoutFormSet from '../workout-form-set/'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

function WorkoutFormExercise({handleRemoveExercise}) {
  const [exercise, setExercise] = useState([])
  const [exerciseId, setExerciseId] = useState(null)
  const [nextSetNumber, setNextSetNumber] = useState(1)

  console.log(exercise)
  console.log(exerciseId, nextSetNumber)

  function handleSetExercise(newExercise) {
    setExerciseId(newExercise.id)
  }

  function handleAddSet () {
    const newExercise = [...exercise]
    newExercise.push({
      exercise_id: exerciseId,
      set_number: nextSetNumber,
      repetitions: null,
      load: null
    })
    setNextSetNumber(nextSetNumber + 1)
    setExercise(newExercise)
  }

  function handleRemoveSet (setNumber) {
    let indexToDel = null
    const newExercise = [...exercise]
    newExercise.forEach((exer, index) => {
      if (exer.set_number === setNumber) {
        indexToDel = index
      }
    })
    newExercise.splice(indexToDel, 1)
    for (let i = indexToDel; i < newExercise.length; i++) {
      newExercise[i].set_number -= 1
    }
    setNextSetNumber(nextSetNumber - 1)
    setExercise(newExercise)
  }

  return (
    <>
      <Stack
        spacing={1}
        direction='row'
        justifyContent='start'
        sx={{ marginBottom: '10px' }}
      >
        <SelectExercise handleSetExercise={handleSetExercise} />
        <Button variant='outlined' onClick={handleAddSet}>
          Add set
        </Button>
        <Button variant='outlined' color='error' onClick={handleRemoveExercise}>
          Remove exercise
        </Button>
      </Stack>
      <Stack spacing={0}>
        {exercise.map((set) => (
          <WorkoutFormSet key={set.set_number} setNumber={set.set_number} setExercise={setExercise} handleRemoveSet={handleRemoveSet} />
        ))}
      </Stack>
    </>
  )
}

export default WorkoutFormExercise
