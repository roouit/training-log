import React from 'react'
import moment from 'moment'
import Paper from '@mui/material/Paper'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'

function getWorkoutHeader (datetime) {
  const date = moment(datetime).format('DD.MM.Y')
  const time = moment(datetime).format('H:mm')
  const header = `${date}, kello ${time}`
  return header
}

function Workout ({data}) {

  return (
    <>
      <Paper>
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>{getWorkoutHeader(data.date)}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense={true}>
              {data.entries.map((entry) => {
                return (
                  <ListItem key={`ex${entry.exercise_id}set${entry.set_number}`}>
                    <ListItemText primary={entry.exercise_id} />
                  </ListItem>
                )
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      </Paper>
    </>
  )
}

export default Workout
