import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import UserPage from '../../pages/user/'
import SettingsPage from '../../pages/settings/'
import AdminPage from '../../pages/admin/'
import NotFoundPage from '../../pages/not-found/not-found.page'

function Router () {
  return (
    <>
      <Routes>
        <Route path='/' element={<UserPage />} />
        <Route path='/settings' element={<SettingsPage />} />
        <Route path='/admin' element={<AdminPage />} />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>
    </>
  )
}

export default Router
