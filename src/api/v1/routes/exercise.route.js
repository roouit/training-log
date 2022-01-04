const express = require('express')
const router = express.Router()
const { validateExercise } = require('../utils/validation/exercise')
const {
  getAllExercises,
  getExerciseById,
  createNewExercise,
  deleteExerciseById,
  updateExerciseById
} = require('../controllers/exercise.controller')

// validation middleware
router.post('/', validateExercise)
router.put('/:id([0-9]+)', validateExercise)

// endpoints
router.get('/', getAllExercises)
router.get('/:id([0-9]+)', getExerciseById)
router.post('/', createNewExercise)
router.delete('/:id([0-9]+)', deleteExerciseById)
router.put('/:id([0-9]+)', updateExerciseById)

module.exports = router
