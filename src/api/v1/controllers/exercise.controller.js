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
    if (response.length > 0) {
      const exercises = response.map((exercise) => {
        return new Exercise({
          id: exercise.id,
          exercise_name: exercise.exercise_name
        })
      })
      res.status(200).send(exercises)
    } else {
      res.status(204).send()
    }
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
    const [response] = await Exercise.getById(id)
    if (response) {
      const exercise = new Exercise({
        id: response.id,
        exercise_name: response.exercise_name
      })
      res.status(200).send(exercise)
    } else {
      res.status(204).send()
    }
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
    const rp = await Exercise.create(exercise)
    exercise.id = rp.insertId
    res.location(`api/v1/exercises/${exercise.id}`)
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
    const rp = await Exercise.deleteById(id)
    if (rp.affectedRows > 0) {
      res.status(200).send({
        message: 'delete successful'
      })
    } else {
      res.status(404).send({
        message: `no exercises with id = ${id}`
      })
    }
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
    const rp = await Exercise.updateById(id, exercise)
    if (rp.affectedRows > 0) {
      res.status(200).send({
        message: 'update successful'
      })
    } else {
      res.status(404).send({
        message: `no exercises with id = ${id}`
      })
    }
  } catch (err) {
    next(err)
  }
}
