import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Router from '../router/'

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Typography
          variant='h3'
          align='center'
          gutterBottom={true}
          sx={{
            paddingTop: '16px'
          }}
        >Training log
        </Typography>
        <Router/>
      </Container>
    </>
  )
}

export default App;
