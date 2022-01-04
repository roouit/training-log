const express = require('express')
const { validateWorkoutQueryParams } = require('../utils/validation/validate-workout-query-params')

const router = express.Router({ mergeParams: true })
const {
  getAllUserWorkouts,
  getUserWorkoutById,
  createNewWorkout,
  deleteWorkoutById,
  updateWorkoutById
} = require('../controllers/workout.controller')

router.get('/', validateWorkoutQueryParams)

router.get('/', getAllUserWorkouts)
router.get('/:workout_id([0-9]+)', getUserWorkoutById)
router.post('/', createNewWorkout)
router.delete('/:workout_id([0-9]+)', deleteWorkoutById)
router.put('/:workout_id([0-9]+)', updateWorkoutById)

module.exports = router
