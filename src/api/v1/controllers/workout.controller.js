/* eslint-disable camelcase */
const Workout = require('../models/workout.model')

/**
 * A route handler function that tries to get all of the users workouts from database.
 * @param {Object} req - The request.
 * @param {string} req.params.user_id - The id of the user
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.getAllUserWorkouts = async (req, res, next) => {
  const user_id = req.params.user_id
  try {
    const response = await Workout.getAll(user_id)
    res.send(response)
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to get a user workout from database by id.
 * @param {Object} req - The request.
 * @param {string} req.params.workout_id - The id of the workout
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.getUserWorkoutById = async (req, res, next) => {
  const workout_id = req.params.workout_id
  try {
    const response = await Workout.getById(workout_id)
    res.send(response)
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to add a new workout to database.
 * @param {Object} req - The request.
 * @param {Object} req.body - The Workout object representing new workout data
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.createNewWorkout = async (req, res, next) => {
  const workout = new Workout({
    user_id: req.body.user_id,
    date: req.body.date,
    entries: req.body.entries
  })
  try {
    await Workout.create(workout)
    res.location(
      `api/v1/users/${req.body.user_id}/workouts/${workout.workout_id}`
    )
    res.status(201).send(workout)
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to delete a user workout from database by id.
 * @param {Object} req - The request.
 * @param {string} req.params.workout_id - The id of the workout
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.deleteWorkoutById = async (req, res, next) => {
  const workout_id = req.params.workout_id
  try {
    await Workout.deleteById(workout_id)
    res.status(204).send()
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to update user workout data in database.
 * @param {Object} req - The request.
 * @param {string} req.params.workout_id - The id of the workout
 * @param {Object} req.body - The object representing new workout data
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.updateWorkoutById = async (req, res, next) => {
  const workout_id = req.params.workout_id
  const workout = new Workout({
    date: req.body.date,
    entries: req.body.entries
  })
  try {
    await Workout.updateById(workout_id, workout)
    res.status(200).send()
  } catch (err) {
    next(err)
  }
}
