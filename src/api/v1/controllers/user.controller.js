const User = require('../models/user.model')

/**
 * A route handler function that tries to get all users from database.
 * @param {Object} req - The request.
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.getAllUsers = async (req, res, next) => {
  try {
    const response = await User.getAll()
    res.send(response)
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to get a user from database by id.
 * @param {Object} req - The request.
 * @param {string} req.params.id - The id of a user
 * @param {Object} res - The response.
 * @param {Function} next - The next middleware
 */
exports.getUserById = async (req, res, next) => {
  const id = req.params.id
  try {
    const response = await User.getById(id)
    res.send(response)
  } catch (err) {
    next(err)
  }
}

/**
 * A route handler function that tries to add a new user to database.
 * @param {Object} req - The request.
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
    const response = await User.create(user)
    res.location(`api/v1/users/${response.insertId}`)
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

exports.deleteUserById = async (req, res, next) => {
  try {
    // todo
  } catch (err) {
    next(err)
  }
}
