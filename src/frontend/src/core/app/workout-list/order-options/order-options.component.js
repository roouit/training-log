import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import fi from 'date-fns/locale/fi'
import Stack from '@mui/material/Stack'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import AdapterDateFns from '@mui/lab/AdapterDateFns'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import DateTimePicker from '@mui/lab/DateTimePicker'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'

function OrderOptions ({
  ascending,
  setAscending,
  olderThan,
  setOlderThan,
  cutoffDate,
  setCutoffDate
}) {
  OrderOptions.propTypes = {
    ascending: PropTypes.bool.isRequired,
    setAscending: PropTypes.func.isRequired,
    olderThan: PropTypes.bool.isRequired,
    setOlderThan: PropTypes.func.isRequired,
    cutoffDate: PropTypes.string.isRequired,
    setCutoffDate: PropTypes.func.isRequired
  }

  function handleChangeDate (newDate) {
    const date = moment(newDate).format('YYYY-MM-DD HH:mm')
    if (date !== 'Invalid date') {
      setCutoffDate(date)
    }
  }

  return (
    <>
      <Stack>
        <FormControlLabel
          label='Sort by date (oldest first)'
          control={
            <Checkbox
              checked={ascending}
              size='small'
              onChange={() => setAscending(!ascending)}
            />
          }
        />
        <Stack direction='row' spacing={1} sx={{ marginBottom: '30px' }}>
          <LocalizationProvider dateAdapter={AdapterDateFns} locale={fi}>
            <DateTimePicker
              inputFormat='dd.MM.yyyy HH:mm'
              renderInput={(props) => <TextField size='small' {...props} />}
              label='Filter by date'
              value={cutoffDate}
              onChange={handleChangeDate}
            />
          </LocalizationProvider>
          <Button variant='text' size='small' onClick={() => setCutoffDate('')}>
            Clear
          </Button>
          <FormControlLabel
            label='Show workouts older than this date'
            control={
              <Checkbox
                checked={olderThan}
                size='small'
                onChange={() => setOlderThan(!olderThan)}
              />
            }
          />
        </Stack>
      </Stack>
    </>
  )
}

export default OrderOptions
