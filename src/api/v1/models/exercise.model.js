const db = require('../utils/db')
const { getSetParams } = require('../utils/createUpdateQuery')

/**
 * Creates a new exercise instance.
 * @constructor
 * @param {Object} exercise - An exercise in the database
 * @param {string} id - The id of the exercise
 * @param {string} exercise.exercise_name - The name of the exercise
 */
function Exercise (exercise) {
  this.id = exercise.id
  this.exercise_name = exercise.exercise_name
}

/**
 * Select all exercises
 * @returns {Promise} Promise object that represents all exercises or error
 */
Exercise.getAll = () => {
  return new Promise((resolve, reject) => {
    db.pool.query('SELECT * from exercise', (err, data) => {
      if (err) {
        reject(err)
      } else {
        const exercises = data.map((exercise) => {
          return new Exercise({
            id: exercise.id,
            exercise_name: exercise.exercise_name
          })
        })
        resolve(exercises)
      }
    })
  })
}

/**
 * Select a single exercise by id
 * @param {string} id - The id of an exercise
 * @returns {Promise} Promise object that represents an exercise or error
 */
Exercise.getById = (id) => {
  return new Promise((resolve, reject) => {
    db.pool.query('SELECT * from exercise WHERE id = ?', [id], (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Insert a new exercise
 * @param {Exercise} exercise - The exercise object
 * @returns {Promise} Promise object that represents results of the insert query or error
 */
Exercise.create = (exercise) => {
  return new Promise((resolve, reject) => {
    db.pool.query(
      'INSERT INTO exercise (exercise_name) VALUES (?)',
      [exercise.exercise_name],
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          exercise.id = data.insertId
          resolve()
        }
      }
    )
  })
}

/**
 * Delete a single exercise by id
 * @param {string} id - The id of an exercise
 * @returns {Promise} Promise object that represents results of the delete query or error
 */
Exercise.deleteById = (id) => {
  return new Promise((resolve, reject) => {
    db.pool.query('DELETE FROM exercise WHERE id = ?', [id], (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve()
      }
    })
  })
}

/**
 * Update exercise data by id
 * @param {string} id - The id of an exercise
 * @param {Exercise} user - The exercise object with new data
 * @returns {Promise} Promise object that represents results of the update query or error
 */
Exercise.updateById = (id, exercise) => {
  return new Promise((resolve, reject) => {
    const [setParams, placeholders] = getSetParams(exercise)
    db.pool.query(
      `UPDATE exercise SET ${setParams} WHERE id = ?`,
      [...placeholders, id],
      (err, data) => {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      }
    )
  })
}

module.exports = Exercise
