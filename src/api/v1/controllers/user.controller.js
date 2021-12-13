const User = require('../models/user.model')

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
