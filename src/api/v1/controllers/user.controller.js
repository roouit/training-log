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

exports.createNewUser = async (req, res, next) => {
  try {
    // todo
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
