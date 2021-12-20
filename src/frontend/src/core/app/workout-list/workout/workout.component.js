import React, { useState, useEffect } from 'react'
import Exercise from './exercise'
import moment from 'moment'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function getWorkoutHeader (datetime) {
  const date = moment(datetime).format('DD.MM.Y')
  const time = moment(datetime).format('H:mm')
  const header = `${date}, kello ${time}`
  return header
}

function Workout ({data}) {
  const [exercises, setExercises] = useState([])

  useEffect(() => {
    const newExercises = []
    let temp = []
    let currentExerciseId = data.entries[0].exercise_id
    data.entries.forEach((entry, index) => {
      if (currentExerciseId !== entry.exercise_id) {
        currentExerciseId = entry.exercise_id
        newExercises.push(temp)
        temp = []
      }
      temp.push(entry)
      if (data.entries.length - 1 === index) {
        newExercises.push(temp)
      }
    })
    setExercises(newExercises)
  }, [data])

  return (
    <>
      <Paper>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{getWorkoutHeader(data.date)}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {exercises.map((exercise, index) => <Exercise key={`exercise${index}`} data={exercise}/>)}
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  )
}

export default Workout
