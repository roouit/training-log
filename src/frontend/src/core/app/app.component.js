import React from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Router from '../router/'
import { Toaster } from 'react-hot-toast'

function App () {
  return (
    <>
      <CssBaseline />
      <Container maxWidth='md'>
        <Toaster/>
        <Router />
      </Container>
    </>
  )
}

export default App
