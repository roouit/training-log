import React from 'react'
import { Routes, Route } from 'react-router-dom'
import UserPage from '../../pages/user/'
import SettingsPage from '../../pages/settings/'

function Router () {
  return (
    <>
      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        {/* <Route path='admin' element={<AdminPage />} /> */}
      </Routes>
    </>
  )
}

export default Router
