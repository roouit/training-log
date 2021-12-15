const express = require('express')
const router = express.Router()
const workoutRoute = require('./workout.route.js')
const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUserById,
  updateUserById
} = require('../controllers/user.controller')

router.use('/:user_id([0-9]+)/workouts', workoutRoute)

router.get('/', getAllUsers)
router.get('/:user_id([0-9]+)', getUserById)
router.post('/', createNewUser)
router.delete('/:user_id([0-9]+)', deleteUserById)
router.put('/:user_id([0-9]+)', updateUserById)

module.exports = router
