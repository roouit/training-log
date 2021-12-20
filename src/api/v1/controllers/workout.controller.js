/* eslint-disable camelcase */
const Workout = require('../models/workout.model')
const { formatWorkouts } = require('../utils/format-workouts')

/**
 * A route handler function that tries to get all of the users workouts from database.
 * @param {Object} req - The request.
 * @param {string} req.params.user_id - The id of the user
 * @param {string} req.query.limit - The number determining how many workouts are fetched
 * @param {string} req.query.offset - The number determining how many workouts are skipped
 *                                    from the beginning when fetching data
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.getAllUserWorkouts = async (req, res, next) => {
  const user_id = req.params.user_id
  const limit = parseInt(req.query.limit)
  const offset = parseInt(req.query.offset)
  try {
    const response = await Workout.getAll(user_id, limit, offset)
    if (response[0]) {
      const workouts = formatWorkouts(response)
      res.status(200).send(workouts)
    } else {
      res.status(204).send()
    }
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
    if (response[0]) {
      const workout = formatWorkouts(response)
      res.status(200).send(workout)
    } else {
      res.status(204).send()
    }
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
    const [workout_rp, workout_exercises_rp] = await Workout.create(workout)
    workout.workout_id = workout_rp.insertId
    workout_exercises_rp.forEach((packet, index) => {
      workout.entries[index].id = packet.insertId
    })
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
    const rp = await Workout.deleteById(workout_id)
    if (rp.affectedRows > 0) {
      res.status(200).send({
        message: 'delete successful'
      })
    } else {
      res.status(404).send({
        message: `no workout with id = ${workout_id}`
      })
    }
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
    const { workout_rp, workout_exercises_rp } = await Workout.updateById(workout_id, workout)
    let statusCode = 200
    const messages = {
      workout: 'no updates',
      entries: 'no updates'
    }
    if (workout_rp) {
      if (workout_rp.affectedRows === 0) {
        statusCode = 404
        messages.workout = `no workout with id = ${workout_id}`
      } else {
        messages.workout = 'update successful'
      }
    }
    if (workout_exercises_rp.length > 0) {
      workout_exercises_rp.forEach(rp => {
        if (rp.affectedRows === 0) {
          statusCode = 404
          messages.entries = 'one or more of entries were not found'
        }
      })
      if (messages.entries === 'no updates') {
        messages.entries = 'update successful'
      }
    }
    res.status(statusCode).send({
      message: messages
    })
  } catch (err) {
    next(err)
  }
}
