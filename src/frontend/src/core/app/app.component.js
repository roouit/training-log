import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Router from '../router/'

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Router />
      </Container>
    </>
  )
}

export default App;
