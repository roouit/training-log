import React from 'react'
import Navigation from './navigation/navigation.component'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Router from '../router/'

function App() {
  return (
    <>
      <CssBaseline />
      <Navigation/>
      <Container maxWidth='md'>
        <Router />
      </Container>
    </>
  )
}

export default App;
