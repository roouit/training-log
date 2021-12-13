const User = require('../models/user.model')

exports.getAllUsers = (req, res) => {
  User.getAll((err, data) => {
    if (err) {
      res.status(404).send(err)
    } else {
      res.send(data)
    }
  })
}
