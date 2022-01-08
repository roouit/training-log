/* eslint-disable camelcase */
const User = require('../models/user.model')

/**
 * A route handler function that tries to get a user from database by id.
 * @param {Object} req - The request.
 * @param {string} req.params.user_id - The id of a user
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.getUserById = async (req, res, next) => {
  const user_id = req.params.user_id
  try {
    const [response] = await User.getById(user_id)
    if (response) {
      const user = new User({
        id: response.id,
        username: response.username,
        first_name: response.first_name,
        last_name: response.last_name,
        email: response.email
      })
      res.status(200).send(user)
    } else {
      res.status(204).send()
    }
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to add a new user to database.
 * @param {Object} req - The request.
 * @param {Object} req.body - The object representing new user data
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.createNewUser = async (req, res, next) => {
  const user = new User({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })
  try {
    const rp = await User.create(user)
    user.id = rp.insertId
    res.location(`api/v1/users/${user.id}`)
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to delete a user from database by id.
 * @param {Object} req - The request.
 * @param {string} req.params.user_id - The id of a user to delete
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.deleteUserById = async (req, res, next) => {
  const user_id = req.params.user_id
  try {
    const rp = await User.deleteById(user_id)
    if (rp.affectedRows > 0) {
      res.status(200).send({
        message: 'delete successful'
      })
    } else {
      res.status(404).send({
        message: `no user with id = ${user_id}`
      })
    }
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to update user data in database.
 * @param {Object} req - The request.
 * @param {string} req.params.user_id - The id of a user to update
 * @param {Object} req.body - The object representing new user data
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.updateUserById = async (req, res, next) => {
  const user_id = req.params.user_id
  const user = new User({
    username: req.body.username,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email
  })
  try {
    const rp = await User.updateById(user_id, user)
    if (rp.affectedRows > 0) {
      res.status(200).send({
        message: 'update successful'
      })
    } else {
      res.status(404).send({
        message: `no user with id = ${user_id}`
      })
    }
  } catch (err) {
    next(err)
  }
}
