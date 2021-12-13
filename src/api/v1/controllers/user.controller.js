const User = require('../models/user.model')

exports.getAllUsers = async (req, res, next) => {
  try {
    const response = await User.getAll()
    res.send(response)
  } catch (err) {
    next(err)
  }
}
