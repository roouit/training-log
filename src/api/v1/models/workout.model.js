/* eslint-disable camelcase */
const db = require('../utils/db')
const { getSetParams } = require('../utils/get-set-params')

/**
 * Creates a new workout instance.
 * @constructor
 * @param {Object} workout - A workout in the database
 * @param {string} workout.workout_id - The id of the workout
 * @param {string} workout.user_id - The id of the user who performed this workout
 * @param {string} workout.date - The datetime when the workout was performed
 * @param {Array} workout.entries - An array of workout entry objects
 * @param {string} workout.entries.id - The id of the row entry
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
 * Select all workouts for the current user with given parameters.
 * @param {string} user_id - The id of the user whose workouts are queried
 * @param {Number} limit - The number determining how many workouts are fetched
 * @param {Number} offset - The number determining how many workouts are skipped
 *                          from the beginning when fetching data
 * @param {string} [date="0000-00-00 00:00:00"] - The cutoff date for query
 * @param {boolean} [olderThan=false] - Binary operator which determines if the
 *                           workouts returned are older than the cutoff date
 * @param {boolean} [asc=false] - Binary operator which determines if the
 *                           workouts returned are ordered in ascending order by date
 * @returns {Promise} Promise object that represents all workouts or error
 */
Workout.getAll = (user_id, limit, offset, date = '0000-00-00 00:00:00', olderThan = false, asc = false) => {
  return new Promise((resolve, reject) => {
    async function query () {
      const connection = await db.connection()
      try {
        const workouts = await connection.query(
          `SELECT * FROM workout 
          WHERE user_id = ? 
          AND date ${olderThan ? '<' : '>'} ? 
          ORDER BY date ${asc ? 'ASC' : 'DESC'} 
          LIMIT ? OFFSET ?`,
          [user_id, date, limit, offset]
        )
        if (workouts.length > 0) {
          const workout_ids = workouts.map((workout) => {
            return workout.id
          })
          const result = await connection.query(
            `SELECT * FROM workout 
            INNER JOIN workout_exercises 
            ON workout_exercises.workout_id = workout.id 
            WHERE workout.id IN (?) 
            ORDER BY date ${asc ? 'ASC' : 'DESC'}, exercise_id, set_number`,
            [workout_ids]
          )
          resolve(result)
        }
        resolve(workouts)
      } catch (err) {
        reject(err)
      } finally {
        await connection.release()
      }
    }
    query()
  })
}

/**
 * Select a single workout of specified user by workout id
 * @param {string} workout_id - The id of a workout
 * @returns {Promise} Promise object that represents a workout or error
 */
Workout.getById = (workout_id) => {
  return new Promise((resolve, reject) => {
    db.pool.query(
      `SELECT * FROM workout_exercises 
      INNER JOIN workout 
      ON workout_exercises.workout_id = workout.id 
      WHERE workout.id = ?`,
      [workout_id],
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
 * Insert a new workout and all rows as a transaction for the user.
 * @param {Workout} workout - The workout object
 * @returns {Promise} Promise object that represents results of the insert query or error
 */
Workout.create = (workout) => {
  return new Promise((resolve, reject) => {
    async function transaction () {
      const connection = await db.connection()
      try {
        await connection.query('START TRANSACTION')

        const rp = await connection.query(
          'INSERT INTO workout (user_id, date) VALUES (?, ?)',
          [workout.user_id, workout.date])

        const rows = workout.entries.map(async entry => {
          return connection.query(
            'INSERT INTO workout_exercises (workout_id, exercise_id, set_number, repetitions, `load`) VALUES (?, ?, ?, ?, ?)',
            [
              rp.insertId,
              entry.exercise_id,
              entry.set_number,
              entry.repetitions,
              entry.load
            ]
          )
        })
        const rp2 = await Promise.all(rows)

        await connection.query('COMMIT')
        resolve([rp, rp2])
      } catch (err) {
        await connection.query('ROLLBACK')
        reject(err)
      } finally {
        await connection.release()
      }
    }
    transaction()
  })
}

/**
 * Delete a single workout and associated workout rows by workout id
 * @param {string} workout_id - The id of a workout
 * @returns {Promise} Promise object that represents results of the delete query or error
 */
Workout.deleteById = (workout_id) => {
  return new Promise((resolve, reject) => {
    async function transaction () {
      const connection = await db.connection()
      try {
        await connection.query('START TRANSACTION')
        await connection.query(
          'DELETE FROM workout_exercises WHERE workout_id = ?',
          [workout_id]
        )
        const rp = await connection.query('DELETE FROM workout WHERE id = ?', [workout_id])
        await connection.query('COMMIT')
        resolve(rp)
      } catch (err) {
        await connection.query('ROLLBACK')
        reject(err)
      } finally {
        await connection.release()
      }
    }
    transaction()
  })
}

/**
 * Update workout and workout rows by `workout_id`. All undefined keys in the Workout
 * object are ignored and all defined keys are used for updating the corresponding
 * fields in the database, **except** entry `id`. If one or multiple entries
 * are provided, they all must have `id` defined. The `id` is ignored when updating.
 * @param {string} workout_id - The id of a workout
 * @param {Workout} workout - The workout object with new data
 * @returns {Promise} Promise object that represents results of the update query or error
 * @example <caption>Example contents of a Workout object:</caption>
 * {
 * "workout_id": undefined,
 * "user_id": undefined,
 * "date": "2021-10-10 11:06:00",
 * "entries": [
 *     {
 *       "id": 35,
 *       "repetitions": 8
 *     },
 *     {
 *       "id": 36,
 *       "load": 10
 *     }
 *   ]
 * }
 */
Workout.updateById = (workout_id, workout) => {
  return new Promise((resolve, reject) => {
    async function transaction () {
      const { entries, ...workoutData } = workout
      const update_rps = {
        workout_rp: null,
        workout_exercises_rp: null
      }
      const connection = await db.connection()
      try {
        await connection.query('START TRANSACTION')

        if (Object.values(workoutData).some((val) => val)) {
          const [workoutSetParams, workoutPlaceholders] =
            getSetParams(workoutData)
          const rp = await connection.query(
            `UPDATE workout SET ${workoutSetParams} WHERE id = ?`,
            [...workoutPlaceholders, workout_id]
          )
          update_rps.workout_rp = rp
        }

        if (entries) {
          const rows = entries.map(async (entry) => {
            const id = entry.id
            delete entry.id
            const [entrySetParams, entryPlaceholders] =
              getSetParams(entry)
            return connection.query(
              `UPDATE workout_exercises SET ${entrySetParams} WHERE id = ?`,
              [...entryPlaceholders, id]
            )
          })
          const rp = await Promise.all(rows)
          update_rps.workout_exercises_rp = rp
        }
        await connection.query('COMMIT')
        resolve(update_rps)
      } catch (err) {
        console.log('rollback')
        await connection.query('ROLLBACK')
        reject(err)
      } finally {
        await connection.release()
      }
    }
    transaction()
  })
}

module.exports = Workout
