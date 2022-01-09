import React, { useState, useEffect } from 'react'
import Exercise from '../exercise'
import ExerciseEdit from '../exercise-edit'
import moment from 'moment'
import fi from 'date-fns/locale/fi'
import Paper from '@mui/material/Paper'
import Button from '@mui/material/Button'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import TextField from '@mui/material/TextField'

function getWorkoutHeader (datetime) {
  const utcTime = moment(datetime).utc()
  const date = utcTime.format('DD.MM.Y')
  const day = utcTime.format('dddd')
  const time = utcTime.format('H:mm')
  const header = `${day} ${date} @ ${time}`
  return header
}

function Workout({ workoutData, handleRemoveWorkout, handleUpdateWorkout }) {
  const [exercises, setExercises] = useState([])
  const [editedEntries, setEditedEntries] = useState([])
  const [editedDate, setEditedDate] = useState('')
  const [editView, setEditView] = useState(false)
  console.log(moment.utc(workoutData.date).format())
  console.log(moment.utc(moment(workoutData.date)).format())
  console.log(
    moment.utc(workoutData.date).utcOffset(-2, true).format()
  )

  useEffect(() => {
    const newExercises = []
    let temp = []
    let currentExerciseId = workoutData.entries[0].exercise_id
    workoutData.entries.forEach((entry, index) => {
      if (currentExerciseId !== entry.exercise_id) {
        currentExerciseId = entry.exercise_id
        newExercises.push(temp)
        temp = []
      }
      temp.push(entry)
      if (workoutData.entries.length - 1 === index) {
        newExercises.push(temp)
      }
    })
    setExercises(newExercises)
  }, [workoutData])

  function handleAddEntry (newEntry) {
    let entryIndex = -1
    const newEntries = [...editedEntries]
    newEntries.forEach((entry, index) => {
      if (entry.id === newEntry.id) {
        entryIndex = index
      }
    })
    if (entryIndex >= 0) {
      newEntries[entryIndex] = newEntry
    } else {
      newEntries.push(newEntry)
    }
    setEditedEntries(newEntries)
  }

  function handleSaveWorkout () {
    handleUpdateWorkout(workoutData.workout_id, editedEntries, editedDate)
    setEditView(false)
  }

  function handleDateChange(newDate) {
    const date = moment(newDate).format('YYYY-MM-DD HH:mm')
    if (date !== 'Invalid date') {
      setEditedDate(moment(newDate).format('YYYY-MM-DD HH:mm'))
    }
  }

  return (
    <>
      <Paper>
        {!editView ? (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>{getWorkoutHeader(workoutData.date)}</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{
                paddingTop: 0
              }}
            >
              {exercises.map((exercise, index) => (
                <Exercise key={`exercise${index}`} exerciseData={exercise} />
              ))}
              <Button
                color='error'
                onClick={() => handleRemoveWorkout(workoutData.workout_id)}
              >
                Remove workout
              </Button>
              <Button onClick={() => setEditView(true)}>Update workout</Button>
            </AccordionDetails>
          </Accordion>
        ) : (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Edit workout</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <LocalizationProvider dateAdapter={AdapterDateFns} locale={fi}>
                <DateTimePicker
                  inputFormat='dd.MM.yyyy HH:mm'
                  renderInput={(props) => <TextField size='small' {...props} />}
                  label='Date and time of workout'
                  value={
                    editedDate
                      ? moment.utc(editedDate).utcOffset(2, true).format()
                      : moment.utc(workoutData.date).utcOffset(2, true).format()
                  }
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
              {exercises.map((exercise, index) => (
                <ExerciseEdit
                  key={`exercise${index}`}
                  exerciseData={exercise}
                  handleAddEntry={handleAddEntry}
                />
              ))}
              <Button color='success' onClick={handleSaveWorkout}>
                Save workout
              </Button>
              <Button onClick={() => setEditView(false)}>Cancel</Button>
            </AccordionDetails>
          </Accordion>
        )}
      </Paper>
    </>
  )
}

export default Workout
