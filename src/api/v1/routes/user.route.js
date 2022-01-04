const express = require('express')
const router = express.Router()
const { validateUser } = require('../utils/validation/user')
const workoutRoute = require('./workout.route.js')
const {
  getUserById,
  createNewUser,
  deleteUserById,
  updateUserById
} = require('../controllers/user.controller')

// forward to users workouts
router.use('/:user_id([0-9]+)/workouts', workoutRoute)

// validation middleware
router.post('/', validateUser)
router.put('/:user_id([0-9]+)', validateUser)

// endpoints
router.get('/:user_id([0-9]+)', getUserById)
router.post('/', createNewUser)
router.delete('/:user_id([0-9]+)', deleteUserById)
router.put('/:user_id([0-9]+)', updateUserById)

module.exports = router
