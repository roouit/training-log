/* eslint-disable camelcase */
const pool = require('../utils/db')
const { getSetParams } = require('../utils/createUpdateQuery')

/**
 * Creates a new workout instance.
 * @constructor
 * @param {Object} workout - A workout in the database
 * @param {string} workout.user_id - The id of the user who performed this workout
 * @param {string} workout.date - The datetime when the workout was performed
 */
function Workout (workout) {
  this.user_id = workout.user_id
  this.date = workout.date
}

/**
 * Select all workouts for the current user
 * @param {string} user_id - The id of the user whose workouts are queried
 * @returns {Promise} Promise object that represents all workouts or error
 */
Workout.getAll = (user_id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * FROM workout WHERE user_id = ?', [user_id], (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Select a single workout of specified user by workout id
 * @param {string} workout_id - The id of a workout
 * @param {string} user_id - The id of the user whose workouts are queried
 * @returns {Promise} Promise object that represents a workout or error
 */
Workout.getById = (workout_id, user_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'SELECT * FROM workout WHERE id = ? AND user_id = ?',
      [workout_id, user_id],
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }
    )
  })
}

/**
 * Insert a new workout for the user
 * @param {Workout} workout - The workout object
 * @returns {Promise} Promise object that represents results of the insert query or error
 */
Workout.create = (workout) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO workout (user_id, date) VALUES (?, ?)',
      [workout.user_id, workout.date],
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }
    )
  })
}

/**
 * Delete a single workout from a specific user by workout id
 * @param {string} workout_id - The id of a workout
 * @param {string} user_id - The id of the user whose workout is deleted
 * @returns {Promise} Promise object that represents results of the delete query or error
 */
Workout.deleteById = (workout_id, user_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'DELETE FROM workout WHERE id = ? AND user_id = ?',
      [workout_id, user_id],
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }
    )
  })
}

/**
 * Update workout data by id
 * @param {string} workout_id - The id of a workout
 * @param {Workout} workout - The workout object with new data
 * @param {string} user_id - The id of the user whose workout is updated
 * @returns {Promise} Promise object that represents results of the update query or error
 */
Workout.updateById = (workout_id, workout, user_id) => {
  return new Promise((resolve, reject) => {
    const [setParams, placeholders] = getSetParams(workout)
    pool.query(
      `UPDATE workout SET ${setParams} WHERE id = ? AND user_id = ?`,
      [...placeholders, workout_id, user_id],
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }
    )
  })
}

module.exports = Workout
