import React, { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { saveWorkout } from '../../../shared/api'
import WorkoutFormHeader from './workout-form-header'
import WorkoutFormFooter from './workout-form-footer'
import WorkoutFormExercise from './workout-form-exercise'
import Box from '@mui/material/Box'

function WorkoutForm() {
  const [exercises, setExercises] = useState([])
  const [date, setDate] = useState(null)
  const [workout, setWorkout] = useState({})

  useEffect(() => {
    setWorkout({
      user_id: 2,
      date: date,
      entries: []
    })
  }, [])

  useEffect(() => {
    if (date) {
      const newWorkout = {
        ...workout,
        date: date
      }
      setWorkout(newWorkout)
    }
  }, [date])

  function handleAddExercise () {
    const newExercises = [...exercises]
    newExercises.push({
      exercise_uuid: uuidv4(),
      sets: []
    })
    setExercises(newExercises)
  }

  function handleRemoveExercise(exerciseUuid) {
    const newExercises = [...exercises]
    let indexToDel = null
    newExercises.forEach((exer, index) => {
      if (exer.exercise_uuid === exerciseUuid) {
        indexToDel = index
      }
    })
    newExercises.splice(indexToDel, 1)
    setExercises(newExercises)
  }

  function handleSaveWorkout () {
    const workoutToSave = {...workout}
    exercises.forEach(exer => {
      exer.sets.forEach(set => {
        delete set.entry_uuid
        workoutToSave.entries.push(set)
      })
    })
    saveWorkout(workoutToSave)
    setExercises([])
    setDate(null)
    setWorkout({
      user_id: 2,
      date: date,
      entries: []
    })
  }

  function updateExercise(exerciseUuid, newSets) {
    const newExercises = [...exercises]
    let indexToUpdate = null
    newExercises.forEach((exer, index) => {
      if (exer.exercise_uuid === exerciseUuid) {
        indexToUpdate = index
      }
    })
    newExercises[indexToUpdate].sets = newSets
    setExercises(newExercises)
  }

  return (
    <>
      <Box
        sx={{
          width: '100%',
          padding: '10px',
          marginBottom: '10px',
          border: '1px solid grey',
          borderRadius: '5px'
        }}
      >
        <WorkoutFormHeader
          date={date}
          setDate={setDate}
          handleAddExercise={handleAddExercise}
        />
        {exercises.map((exer) => {
          return (
            <WorkoutFormExercise
              key={exer.exercise_uuid}
              exerciseUuid={exer.exercise_uuid}
              handleRemoveExercise={handleRemoveExercise}
              updateExercise={updateExercise}
            />
          )
        })}

        <WorkoutFormFooter handleSaveWorkout={handleSaveWorkout} />
      </Box>
    </>
  )
}

export default WorkoutForm
