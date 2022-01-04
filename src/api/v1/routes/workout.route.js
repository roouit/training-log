const express = require('express')
const { validateWorkoutQueryParams, validateWorkoutData } = require('../utils/validation/workout')

const router = express.Router({ mergeParams: true })
const {
  getAllUserWorkouts,
  getUserWorkoutById,
  createNewWorkout,
  deleteWorkoutById,
  updateWorkoutById
} = require('../controllers/workout.controller')

// validation middleware
router.get('/', validateWorkoutQueryParams)
router.post('/', validateWorkoutData)
router.put('/:workout_id([0-9]+)', validateWorkoutData)

// endpoints
router.get('/', getAllUserWorkouts)
router.get('/:workout_id([0-9]+)', getUserWorkoutById)
router.post('/', createNewWorkout)
router.delete('/:workout_id([0-9]+)', deleteWorkoutById)
router.put('/:workout_id([0-9]+)', updateWorkoutById)

module.exports = router
