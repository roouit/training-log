const express = require('express')
const router = express.Router()
const {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUserById,
  updateUserById
} = require('../controllers/user.controller')
const {
  getAllUserWorkouts,
  getUserWorkoutById,
  createNewWorkout,
  deleteWorkoutById,
  updateWorkoutById
} = require('../controllers/workout.controller')

router.get('/', getAllUsers)
router.get('/:id([0-9]+)', getUserById)
router.post('/', createNewUser)
router.delete('/:id([0-9]+)', deleteUserById)
router.put('/:id([0-9]+)', updateUserById)

router.get('/:user_id([0-9]+)/workouts', getAllUserWorkouts)
router.get('/:user_id([0-9]+)/workouts/:workout_id([0-9]+)', getUserWorkoutById)
router.post('/:user_id([0-9]+)/workouts', createNewWorkout)
router.delete(
  '/:user_id([0-9]+)/workouts/:workout_id([0-9]+)',
  deleteWorkoutById
)
router.put('/:user_id([0-9]+)/workouts/:workout_id([0-9]+)', updateWorkoutById)

module.exports = router
