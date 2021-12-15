/* eslint-disable camelcase */
const pool = require('../utils/db')
const { getSetParams } = require('../utils/createUpdateQuery')

/**
 * Will format raw workout data returned from the database to a more usable form.
 * Returns data as an array of Workout object.
 * @param {Array} rowList - An array containing data entries returned by an SQL query
 * @returns {Array} Array of Workout objects
 */
const formatWorkouts = (rowList) => {
  const workouts = []
  const temp = []
  let currentWorkoutId = rowList[0].workout_id
  rowList.forEach(row => {
    if (currentWorkoutId !== row.workout_id) {
      workouts.push(formatSingleWorkout(temp))
      currentWorkoutId = row.workout_id
      temp.splice(0, temp.length, row)
    } else {
      temp.push(row)
    }
  })
  workouts.push(formatSingleWorkout(temp))
  return workouts
}

/**
 * Will format raw data of a single workout returned from the database to a more usable form. It
 * returns data in a Workout object.
 * @param {Array} rowList - An array containing row data of a single workout
 * @returns {Workout} Workout object that contains workout information and rows
 */
const formatSingleWorkout = (rowList) => {
  const workoutRows = rowList.map((row) => {
    return {
      exercise_id: row.exercise_id,
      set_number: row.set_number,
      repetitions: row.repetitions,
      load: row.load
    }
  })
  return new Workout({
    workout_id: rowList[0].workout_id,
    user_id: rowList[0].user_id,
    date: rowList[0].date,
    entries: workoutRows
  })
}

/**
 * Creates a new workout instance.
 * @constructor
 * @param {Object} workout - A workout in the database
 * @param {string} workout.workout_id - The id of the workout
 * @param {string} workout.user_id - The id of the user who performed this workout
 * @param {string} workout.date - The datetime when the workout was performed
 * @param {Array} workout.entries - An array of workout entry objects
 * @param {string} workout.entries.exercise_id - The id of the exercise
 * @param {string} workout.entries.set_number - The ordinal set number of an exercise in this workout.
 *                                              E.g. set_number=2 means that this is the entry for a
 *                                              second set of the referenced exercise in this workout.
 * @param {string} workout.entries.repetitions - The number of repetitions
 * @param {string} workout.entries.load- The load (kg) which was used in the exercise
 */
function Workout (workout) {
  this.workout_id = workout.workout_id
  this.user_id = workout.user_id
  this.date = workout.date
  this.entries = workout.entries
}

/**
 * Select all workouts for the current user
 * @param {string} user_id - The id of the user whose workouts are queried
 * @returns {Promise} Promise object that represents all workouts or error
 */
Workout.getAll = (user_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM workout_exercises 
      INNER JOIN workout 
      ON workout_exercises.workout_id = workout.id 
      WHERE workout.user_id = ?`,
      [user_id],
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(formatWorkouts(data))
        }
      }
    )
  })
}

/**
 * Select a single workout of specified user by workout id
 * @param {string} workout_id - The id of a workout
 * @returns {Promise} Promise object that represents a workout or error
 */
Workout.getById = (workout_id) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT * FROM workout_exercises 
      INNER JOIN workout 
      ON workout_exercises.workout_id = workout.id 
      WHERE workout.id = ?`,
      [workout_id],
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve(formatWorkouts(data))
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