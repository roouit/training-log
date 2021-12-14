const Exercise = require('../models/exercise.model')

/**
 * A route handler function that tries to get all exercises from database.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.getAllExercises = async (req, res, next) => {
  try {
    const response = await Exercise.getAll()
    res.send(response)
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to get an exercise from database by id.
 * @param {Object} req - The request.
 * @param {string} req.params.id - The id of an exercise
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.getExerciseById = async (req, res, next) => {
  const id = req.params.id
  try {
    const response = await Exercise.getById(id)
    res.send(response)
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to add a new exercise to database.
 * @param {Object} req - The request.
 * @param {Object} req.body - The object representing new exercise data
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.createNewExercise = async (req, res, next) => {
  const exercise = new Exercise({
    exercise_name: req.body.exercise_name
  })
  try {
    const response = await Exercise.create(exercise)
    res.location(`api/v1/exercises/${response.insertId}`)
    res.status(201).send(exercise)
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to delete an exercise from database by id.
 * @param {Object} req - The request.
 * @param {string} req.params.id - The id of an exercise to delete
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.deleteExerciseById = async (req, res, next) => {
  const id = req.params.id
  try {
    await Exercise.deleteById(id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to update exercise data in database.
 * @param {Object} req - The request.
 * @param {string} req.params.id - The id of an exercise to update
 * @param {Object} req.body - The object representing new exercise data
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.updateExerciseById = async (req, res, next) => {
  const id = req.params.id
  const exercise = new Exercise({
    exercise_name: req.body.exercise_name
  })
  try {
    const response = await Exercise.updateById(id, exercise)
    res.send(response)
  } catch (err) {
    next(err)
  }
}
