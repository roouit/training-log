/* eslint-disable camelcase */
const Workout = require('../models/workout.model')

/**
 * Will format raw workout data returned from the database to a more usable form.
 * Returns data as an array of Workout object.
 * @param {Array} rowList - An array containing data entries returned by an SQL query
 * @returns {Array} Array of Workout objects
 */
exports.formatWorkouts = (rowList) => {
  const workouts = []
  const temp = []
  let currentWorkoutId = rowList[0].workout_id
  rowList.forEach((row) => {
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
