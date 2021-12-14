/* eslint-disable no-unused-vars */
const pool = require('../utils/db')
const { getSetParams } = require('../utils/createUpdateQuery')

/**
 * Creates a new user instance.
 * @constructor
 * @param {Object} user - A user in the database
 * @param {string} user.username - The username of the user
 * @param {string} [user.first_name] - The first name of the user
 * @param {string} [user.last_name] - The last name of the user
 * @param {string} [user.email] - The email of the user
 */
function User (user) {
  this.username = user.username
  this.first_name = user.first_name
  this.last_name = user.last_name
  this.email = user.email
}

/**
 * Select all users
 * @returns {Promise} Promise object that represents all users or error
 */
User.getAll = () => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * from user', (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Select a single user by id
 * @param {string} id - The id of a user
 * @returns {Promise} Promise object that represents a user or error
 */
User.getById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('SELECT * from user WHERE id = ?', [id], (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Insert a new user
 * @param {User} user - The user object
 * @returns {Promise} Promise object that represents results of the insert query or error
 */
User.create = (user) => {
  return new Promise((resolve, reject) => {
    pool.query(
      'INSERT INTO user (username, first_name, last_name, email) VALUES (?, ?, ?, ?)',
      [user.username, user.first_name, user.last_name, user.email],
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
 * Delete a single user by id
 * @param {string} id - The id of a user
 * @returns {Promise} Promise object that represents results of the delete query or error
 */
User.deleteById = (id) => {
  return new Promise((resolve, reject) => {
    pool.query('DELETE FROM user WHERE id = ?', [id], (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

/**
 * Update user data by id
 * @param {string} id - The id of a user
 * @param {User} user - The user object with new data
 * @returns {Promise} Promise object that represents results of the update query or error
 */
User.updateById = (id, user) => {
  return new Promise((resolve, reject) => {
    const [setParams, placeholders] = getSetParams(user)
    pool.query(
      `UPDATE user SET ${setParams} WHERE id = ?`,
      [...placeholders, id],
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

module.exports = User
