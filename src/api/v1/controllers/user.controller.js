const User = require('../models/user.model')

exports.getAllUsers = async (req, res) => {
  try {
    const response = await User.getAll()
    res.send(response)
  } catch (err) {
    res.status(404).send(err)
  }
}
