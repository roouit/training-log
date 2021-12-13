const User = require('../models/user.model')

/**
 * Try to get all users from database.
 * @function A route handler function
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

exports.getUserById = async (req, res, next) => {
  try {
    // todo
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
