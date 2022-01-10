import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { v4 as uuidv4 } from 'uuid'
import SelectExercise from '../select-exercise/'
import WorkoutFormSet from '../workout-form-set/'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'

function WorkoutFormExercise ({
  exerciseUuid,
  handleRemoveExercise,
  updateExercise
}) {
  const [sets, setSets] = useState([])
  const [exerciseId, setExerciseId] = useState(null)
  const [nextSetNumber, setNextSetNumber] = useState(1)

  WorkoutFormExercise.propTypes = {
    exerciseUuid: PropTypes.string.isRequired,
    handleRemoveExercise: PropTypes.func.isRequired,
    updateExercise: PropTypes.func.isRequired
  }

  useEffect(() => {
    const newSets = sets.map((set) => {
      return {
        ...set,
        exercise_id: exerciseId
      }
    })
    setSets(newSets)
  }, [exerciseId])

  useEffect(() => {
    updateExercise(exerciseUuid, sets)
  }, [sets])

  function handleSetExercise (newExercise) {
    setExerciseId(newExercise.id)
  }

  function handleAddSet () {
    const newSets = [...sets]
    newSets.push({
      entry_uuid: uuidv4(),
      exercise_id: exerciseId,
      set_number: nextSetNumber,
      repetitions: null,
      load: null
    })
    setNextSetNumber(nextSetNumber + 1)
    setSets(newSets)
  }

  function handleRemoveSet (setNumber) {
    let indexToDel = null
    const newSets = [...sets]
    newSets.forEach((exer, index) => {
      if (exer.set_number === setNumber) {
        indexToDel = index
      }
    })
    newSets.splice(indexToDel, 1)
    for (let i = indexToDel; i < newSets.length; i++) {
      newSets[i].set_number -= 1
    }
    setNextSetNumber(nextSetNumber - 1)
    setSets(newSets)
  }

  function handleUpdateLoadAndReps (setNumber, reps, load) {
    const newSets = [...sets]
    newSets[setNumber - 1].repetitions = reps || 0
    newSets[setNumber - 1].load = load || 0
    setSets(newSets)
  }

  return (
    <>
      <Stack
        spacing={1}
        direction='row'
        justifyContent='start'
        sx={{ margin: '10px 0px' }}
      >
        <SelectExercise handleSetExercise={handleSetExercise} />
        <Button variant='outlined' onClick={handleAddSet}>
          Add set
        </Button>
        <Button
          variant='outlined'
          color='error'
          onClick={() => handleRemoveExercise(exerciseUuid)}
        >
          Remove exercise
        </Button>
      </Stack>
      <Stack spacing={0}>
        {sets.map((set) => (
          <WorkoutFormSet
            key={set.entry_uuid}
            setNumber={set.set_number}
            handleUpdateLoadAndReps={handleUpdateLoadAndReps}
            handleRemoveSet={handleRemoveSet}
          />
        ))}
      </Stack>
    </>
  )
}

export default WorkoutFormExercise
